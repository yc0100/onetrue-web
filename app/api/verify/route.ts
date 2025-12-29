import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

type ReqBody = {
  tagId?: string;
  pin?: string;
};

type VerifyStatus = "AUTHENTIC" | "NOT_VERIFIED";

type VerifyResponse = {
  ok: boolean;
  status: VerifyStatus;
  message?: string;
  requestId: string;
  tagId: string;
  ts: string; // ISO
  hints?: string[];
};

function json(resp: VerifyResponse, httpStatus = 200) {
  return NextResponse.json(resp, { status: httpStatus });
}

function sanitizeTagId(s: string) {
  // 允许 6~32；你说不同 tag UID 长度不确定
  const v = s.trim();
  if (v.length < 6 || v.length > 32) throw new Error("Invalid tagId length");
  return v;
}

function sanitizePin(s: string) {
  const v = s.trim();
  // 你可以按业务改规则：这里只做基本约束
  if (v.length < 4 || v.length > 12) throw new Error("Invalid pin length");
  return v;
}

function safeEqual(a: string, b: string) {
  // constant-time compare（长度不同直接 false）
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

async function writeAudit(params: {
  requestId: string;
  ts: string;
  tagId: string;
  status: VerifyStatus;
  ok: boolean;
  message?: string;
  ip?: string | null;
  ua?: string | null;
}) {
  // Firestore: audits collection
  await db.collection("audits").doc(params.requestId).set({
    requestId: params.requestId,
    ts: params.ts,
    tagId: params.tagId,
    status: params.status,
    ok: params.ok,
    message: params.message || null,
    ip: params.ip || null,
    ua: params.ua || null,
    // 以后可加：deviceIdHash / geo / appVersion / policyId 等
  });
}

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();
  const ts = new Date().toISOString();

  // 从 headers 取一些可用于审计的上下文（可选）
  const ua = req.headers.get("user-agent");
  // 本地 dev / vercel 一般可以拿到 x-forwarded-for
  const ip = req.headers.get("x-forwarded-for");

  let tagId = "";
  let pin = "";

  try {
    const body = (await req.json()) as ReqBody;

    tagId = sanitizeTagId(body.tagId || "");
    pin = sanitizePin(body.pin || "");

    // 读取 Firestore：tagPins/{docId == tagId}
    const docRef = db.collection("tagPins").doc(tagId);
    const snap = await docRef.get();

    if (!snap.exists) {
      const resp: VerifyResponse = {
        ok: true,
        status: "NOT_VERIFIED",
        message: "Tag not recognized",
        requestId,
        tagId,
        ts,
        hints: ["Check Tag ID", "Ensure the tag is genuine"],
      };
      await writeAudit({ requestId, ts, tagId, status: resp.status, ok: resp.ok, message: resp.message, ip, ua });
      return json(resp);
    }

    const data = snap.data() as { active?: boolean; pin?: string };

    if (!data.active) {
      const resp: VerifyResponse = {
        ok: true,
        status: "NOT_VERIFIED",
        message: "Tag is inactive",
        requestId,
        tagId,
        ts,
        hints: ["This tag is not active", "Contact the brand if you believe this is incorrect"],
      };
      await writeAudit({ requestId, ts, tagId, status: resp.status, ok: resp.ok, message: resp.message, ip, ua });
      return json(resp);
    }

    const storedPin = String(data.pin ?? "");
    const pinOk = storedPin.length > 0 && safeEqual(pin, storedPin);

    if (!pinOk) {
      const resp: VerifyResponse = {
        ok: true,
        status: "NOT_VERIFIED",
        message: "Tag or PIN not recognized",
        requestId,
        tagId,
        ts,
        hints: ["Check the PIN", "Ensure the tag is genuine"],
      };
      await writeAudit({ requestId, ts, tagId, status: resp.status, ok: resp.ok, message: resp.message, ip, ua });
      return json(resp);
    }

    const resp: VerifyResponse = {
      ok: true,
      status: "AUTHENTIC",
      message: "Verification successful",
      requestId,
      tagId,
      ts,
    };
    await writeAudit({ requestId, ts, tagId, status: resp.status, ok: resp.ok, message: resp.message, ip, ua });
    return json(resp);
  } catch (e: any) {
    // 注意：这里仍然返回 JSON，避免你 client 端看到 HTML
    const resp: VerifyResponse = {
      ok: false,
      status: "NOT_VERIFIED",
      message: e?.message ? `Server error: ${e.message}` : "Server error",
      requestId,
      tagId: tagId || "",
      ts,
    };

    // 审计也记录错误（tagId 可能为空）
    try {
      await writeAudit({ requestId, ts, tagId: tagId || "", status: resp.status, ok: resp.ok, message: resp.message, ip, ua });
    } catch {
      // 避免审计失败导致 handler 再次抛错
    }

    return json(resp, 500);
  }
}