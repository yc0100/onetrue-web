"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Loader2,
  QrCode,
  ShieldCheck,
  AlertTriangle,
  Eye,
  EyeOff,
} from "lucide-react";

type VerifyStatus = "idle" | "loading" | "success" | "fail" | "error";

type VerifyResponse = {
  ok: boolean;
  status: "AUTHENTIC" | "NOT_VERIFIED";
  message?: string;
  requestId: string;
  tagId: string;
  ts: string; // ISO
  hints?: string[];
};

export default function VerifyPage() {
  const [tagId, setTagId] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);

  const [status, setStatus] = useState<VerifyStatus>("idle");
  const [result, setResult] = useState<VerifyResponse | null>(null);
  const [errMsg, setErrMsg] = useState<string>("");

  const canSubmit = useMemo(() => {
    const t = tagId.trim().length >= 6;
    const p = pin.trim().length >= 4;
    return t && p && status !== "loading";
  }, [tagId, pin, status]);

  async function onVerify() {
    setStatus("loading");
    setErrMsg("");
    setResult(null);

    try {
      const resp = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          tagId: tagId.trim(),
          pin: pin.trim(),
        }),
      });

      // 无论 200/400/500，都尝试读 JSON
      const text = await resp.text();
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        // 如果不是 JSON（理论上 route.ts 已经保证是 JSON），把原文当错误
        throw new Error(text || `HTTP ${resp.status}`);
      }

      if (!resp.ok) {
        throw new Error(data?.message || `HTTP ${resp.status}`);
      }

      const parsed = data as VerifyResponse;
      setResult(parsed);

      if (parsed.ok && parsed.status === "AUTHENTIC") setStatus("success");
      else if (parsed.ok && parsed.status === "NOT_VERIFIED") setStatus("fail");
      else setStatus("error");
    } catch (e: any) {
      setStatus("error");
      setErrMsg(e?.message || "Unknown error");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* top bar */}
      <div className="border-b border-white/5 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-zinc-300 hover:text-white">
            ← Back to Home
          </Link>
          <div className="text-sm text-zinc-400">Consumer Verify</div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
          {/* Left: instructions + form */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[color:var(--ot-light)]" />
              <h1 className="text-2xl font-semibold tracking-tight">Verify an Item</h1>
            </div>

            <p className="mt-3 text-zinc-300">
              Tap (NFC) or scan (RFID) to verify authenticity. If you don’t have scanning available, enter the tag ID manually.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3 text-sm">
              <HowCard
                icon={<QrCode className="h-4 w-4 text-[color:var(--ot-light)]" />}
                title="1) Get Tag ID"
                desc="From NFC/reader or printed code"
              />
              <HowCard
                icon={<ShieldCheck className="h-4 w-4 text-[color:var(--ot-light)]" />}
                title="2) Verify"
                desc="Cloud verification + policy checks"
              />
              <HowCard
                icon={<AlertTriangle className="h-4 w-4 text-[color:var(--ot-light)]" />}
                title="3) Understand"
                desc="See result & safety hints"
              />
            </div>

            <div className="mt-7 grid gap-5">
              <div>
                <label className="text-sm text-zinc-300">Tag ID (UID / EPC / Code)</label>
                <input
                  value={tagId}
                  onChange={(e) => setTagId(e.target.value)}
                  placeholder="e.g. 04A1B2C3D4E5..."
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3 text-sm outline-none focus:border-white/20"
                  autoCapitalize="characters"
                  autoCorrect="off"
                  spellCheck={false}
                />
                <div className="mt-2 text-xs text-zinc-500">
                  Tip: later we’ll replace this input with “Tap NFC” on mobile, and keep manual entry as fallback.
                </div>
              </div>

              <div>
                <label className="text-sm text-zinc-300">PIN</label>
                <div className="mt-2 relative">
                  <input
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter PIN"
                    type={showPin ? "text" : "password"}
                    className="w-full rounded-2xl border border-white/10 bg-zinc-950/60 pl-4 pr-12 py-3 text-sm outline-none focus:border-white/20"
                    inputMode="numeric"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-300 hover:bg-white/10"
                    aria-label={showPin ? "Hide PIN" : "Show PIN"}
                  >
                    {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <div className="mt-2 text-xs text-zinc-500">PIN is required for verification.</div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={onVerify}
                  disabled={!canSubmit}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium text-white disabled:opacity-40 bg-[linear-gradient(90deg,var(--ot-dark),var(--ot-primary),var(--ot-light))] hover:opacity-90"
                >
                  {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                  Verify
                </button>

                <Link
                  href="/enterprise"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-zinc-950/60 px-5 py-3 text-sm hover:bg-white/10"
                >
                  Enterprise Portal
                  <ArrowRight className="h-4 w-4 opacity-70" />
                </Link>
              </div>
            </div>
          </section>

          {/* Right: result */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <div className="text-sm text-zinc-300">Result</div>

            <div className="mt-4">
              {status === "idle" && <EmptyState />}

              {status === "loading" && (
                <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying…
                  </div>
                  <div className="mt-2 text-xs text-zinc-500">Requesting server proof & policy checks.</div>
                </div>
              )}

              {status === "success" && result && (
                <ResultCard tone="success" title="Authentic • Verified" subtitle={result.message || "This item passed verification."} meta={result} />
              )}

              {status === "fail" && result && (
                <ResultCard tone="fail" title="Not verified" subtitle={result.message || "We could not confirm authenticity for this tag."} meta={result} />
              )}

              {status === "error" && (
                <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5">
                  <div className="flex items-center gap-2 text-red-200">
                    <XCircle className="h-4 w-4" />
                    Error
                  </div>
                  <div className="mt-2 text-sm text-zinc-300">{errMsg || "Something went wrong."}</div>
                  <div className="mt-2 text-xs text-zinc-500">Try again. If it persists, contact support.</div>
                </div>
              )}
            </div>

            <div className="mt-7 text-xs text-zinc-500 leading-relaxed">
              Privacy note: verification may log minimal evidence (timestamp, tag id hash, device context) for fraud prevention and auditability.
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function HowCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-4">
      <div className="flex items-center gap-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-2">{icon}</div>
        <div className="text-sm font-medium">{title}</div>
      </div>
      <div className="mt-2 text-xs text-zinc-400">{desc}</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5">
      <div className="flex items-center gap-2 text-zinc-300">
        <CheckCircle2 className="h-4 w-4 text-[color:rgba(107,132,140,0.85)]" />
        Ready to verify
      </div>
      <div className="mt-2 text-sm text-zinc-400">Enter a Tag ID + PIN and press Verify.</div>
    </div>
  );
}

function ResultCard({
  tone,
  title,
  subtitle,
  meta,
}: {
  tone: "success" | "fail";
  title: string;
  subtitle: string;
  meta: { requestId: string; tagId: string; ts: string; hints?: string[] };
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5">
      <div className="flex items-center gap-2">
        {tone === "success" ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : <XCircle className="h-4 w-4 text-amber-300" />}
        <div className="text-sm font-medium">{title}</div>
      </div>

      <div className="mt-2 text-sm text-zinc-300">{subtitle}</div>

      <div className="mt-4 grid gap-2 text-xs text-zinc-400">
        <div className="flex items-center justify-between gap-3">
          <span className="text-zinc-500">Tag</span>
          <span className="font-mono text-zinc-200 truncate">{meta.tagId}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-zinc-500">Request ID</span>
          <span className="font-mono text-zinc-200 truncate">{meta.requestId}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-zinc-500">Time</span>
          <span className="font-mono text-zinc-200 truncate">{meta.ts}</span>
        </div>
      </div>

      {meta.hints?.length ? (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="text-xs text-zinc-300 font-medium">Hints</div>
          <ul className="mt-2 space-y-1 text-xs text-zinc-400 list-disc pl-4">
            {meta.hints.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}