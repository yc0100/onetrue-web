import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

type ReqBody = { tagId: string; pin: string };

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();
  const ts = new Date().toISOString();

  try {
    const body = (await req.json()) as Partial<ReqBody>;
    const tagId = (body.tagId || "").trim();
    const pin = (body.pin || "").trim();

    if (!tagId || !pin) {
      return NextResponse.json(
        { ok: false, status: "OWNER_NOT_VERIFIED", message: "Missing tagId or pin", requestId, tagId, ts },
        { status: 400 }
      );
    }

    const docRef = db.collection("tagPins").doc(tagId);
    const snap = await docRef.get();

    let ok = false;
    let status: "OWNER_AUTHENTIC" | "OWNER_NOT_VERIFIED" = "OWNER_NOT_VERIFIED";
    let message = "UID or PIN not recognized";

    if (snap.exists) {
      const data = snap.data() as { active?: boolean; pin?: string } | undefined;
      const active = !!data?.active;
      const correct = (data?.pin || "") === pin;

      if (active && correct) {
        ok = true;
        status = "OWNER_AUTHENTIC";
        message = "Owner authenticated";
      } else if (!active) {
        message = "Tag is not active";
      }
    }

    // audit log
    await db.collection("audits").add({
      requestId,
      ts,
      kind: "OWNER_LOGIN",
      tagId,
      outcome: status,
      ok,
    });

    return NextResponse.json({ ok: true, status, message, requestId, tagId, ts });
  } catch (e: any) {
    // best-effort audit on server error
    try {
      await db.collection("audits").add({
        requestId,
        ts,
        kind: "OWNER_LOGIN",
        outcome: "OWNER_NOT_VERIFIED",
        ok: false,
        error: String(e?.message || e),
      });
    } catch {}

    return NextResponse.json(
      { ok: false, status: "OWNER_NOT_VERIFIED", message: "Server error", requestId, tagId: "", ts },
      { status: 500 }
    );
  }
}