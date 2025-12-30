// app/api/owner/change-pin/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

type ReqBody = {
  tagId: string;
  oldPin: string;
  newPin: string;
};

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();
  const ts = new Date().toISOString();

  try {
    const body = (await req.json()) as Partial<ReqBody>;
    const tagId = (body.tagId || "").trim();
    const oldPin = (body.oldPin || "").trim();
    const newPin = (body.newPin || "").trim();

    if (!tagId || !oldPin || !newPin) {
      return NextResponse.json(
        { ok: false, message: "Missing parameters", requestId, ts },
        { status: 400 }
      );
    }

    const ref = db.collection("tagPins").doc(tagId);
    const snap = await ref.get();

    if (!snap.exists) {
      return NextResponse.json(
        { ok: false, message: "Tag not found", requestId, ts },
        { status: 404 }
      );
    }

    const data = snap.data() as { pin?: string; active?: boolean };

    if (!data?.active) {
      return NextResponse.json(
        { ok: false, message: "Tag not active", requestId, ts },
        { status: 403 }
      );
    }

    if ((data.pin || "") !== oldPin) {
      await db.collection("audits").add({
        requestId,
        ts,
        kind: "OWNER_CHANGE_PIN",
        tagId,
        ok: false,
        reason: "OLD_PIN_MISMATCH",
      });

      return NextResponse.json(
        { ok: false, message: "Old PIN incorrect", requestId, ts },
        { status: 403 }
      );
    }

    // 🔐 更新 PIN（原子）
    await ref.update({
      pin: newPin,
      pinUpdatedAt: ts,
    });

    // 🧾 审计日志（不存 PIN）
    await db.collection("audits").add({
      requestId,
      ts,
      kind: "OWNER_CHANGE_PIN",
      tagId,
      ok: true,
    });

    return NextResponse.json({
      ok: true,
      message: "PIN updated successfully",
      requestId,
      tagId,
      ts,
    });
  } catch (e: any) {
    try {
      await db.collection("audits").add({
        requestId,
        ts,
        kind: "OWNER_CHANGE_PIN",
        ok: false,
        error: String(e?.message || e),
      });
    } catch {}

    return NextResponse.json(
      { ok: false, message: "Server error", requestId, ts },
      { status: 500 }
    );
  }
}