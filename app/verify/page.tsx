"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

const BRAND = {
  name: "OneTrue",
  domain: "onetrue.tech",
  colors: {
    dark: "#01263E",
    primary: "#1D4553",
    light: "#6B848C",
    white: "#FFFFFF",
  },
};

export default function VerifyPage() {
  const [code, setCode] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "ok" | "fail">("idle");

  const hint = useMemo(() => {
    if (state === "checking") return "Verifying…";
    if (state === "ok") return "Authentic • Verified";
    if (state === "fail") return "Not verified";
    return "Enter a tag code (demo) or use NFC in the mobile app.";
  }, [state]);

  async function onVerify() {
    setState("checking");
    // Demo-only: replace with real verification API later
    await new Promise((r) => setTimeout(r, 600));
    const ok = code.trim().length >= 8;
    setState(ok ? "ok" : "fail");
  }

  return (
    <div
      className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-white/20"
      style={
        {
          "--ot-dark": BRAND.colors.dark,
          "--ot-primary": BRAND.colors.primary,
          "--ot-light": BRAND.colors.light,
        } as React.CSSProperties
      }
    >
      <BackgroundGrid />

      <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur bg-zinc-950/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="group flex items-center gap-2">
            <div className={"h-18 w-36 flex items-center justify-center"}>
              <img src="/onetrue-logo.png" alt="OneTrue logo" className="h-12 w-30" />
            </div>
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">{BRAND.name}</div>
              <div className="text-xs text-zinc-400">Consumer Verify</div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/enterprise"
              className="inline-flex rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm hover:bg-white/10"
            >
              Enterprise
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Verify an Item</h1>
        <p className="mt-3 text-zinc-300 max-w-2xl">
          This is a demo web flow. In production, consumer verification is typically done via NFC on mobile, with a signed audit event.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-zinc-300">Verification</div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter tag code (demo) e.g. UID/EPC"
                className="w-full rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3 text-sm outline-none focus:border-white/20"
              />
              <button
                onClick={onVerify}
                className="rounded-2xl px-5 py-3 text-sm font-medium text-white bg-[linear-gradient(90deg,var(--ot-dark),var(--ot-primary),var(--ot-light))] hover:opacity-90"
              >
                Verify
              </button>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-zinc-950/60 p-4">
              <div className="text-xs text-zinc-400">Result</div>
              <div className="mt-1 flex items-center justify-between">
                <div className="text-sm font-medium">{hint}</div>
                <div className="text-xs font-medium text-[color:var(--ot-light)]">
                  {state === "ok" ? "OK" : state === "fail" ? "FAIL" : ""}
                </div>
              </div>
              <div className="mt-2 text-xs text-zinc-400">
                Evidence (demo): input + timestamp. (Production: device context + policy + signature)
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="font-medium">What users see</div>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>• Clear status: Authentic / Not verified</li>
              <li>• Optional product story (origin, edition, warranty)</li>
              <li>• Privacy-first evidence display</li>
              <li>• Optional registration / loyalty experiences</li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-zinc-950/60 px-5 py-3 text-sm hover:bg-white/10"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-zinc-400">
          {BRAND.domain} • Verify
        </div>
      </footer>
    </div>
  );
}

function BackgroundGrid() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(29,69,83,0.18),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(107,132,140,0.12),transparent_40%),radial-gradient(circle_at_40%_80%,rgba(255,255,255,0.06),transparent_35%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="absolute inset-0 bg-zinc-950/30" />
    </div>
  );
}