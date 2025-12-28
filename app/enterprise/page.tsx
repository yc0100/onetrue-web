"use client";

import React from "react";
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

export default function EnterprisePage() {
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
              <div className="text-xs text-zinc-400">Enterprise</div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/verify"
              className="inline-flex rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-2 text-sm hover:bg-white/10"
            >
              Consumer Verify
            </Link>
            <a
              href="mailto:hello@onetrue.tech?subject=OneTrue%20Enterprise%20Demo%20Request"
              className="inline-flex rounded-xl px-3 py-2 text-sm font-medium text-white bg-[linear-gradient(90deg,var(--ot-dark),var(--ot-primary),var(--ot-light))] hover:opacity-90"
            >
              Request Demo
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Enterprise Portal
        </h1>
        <p className="mt-3 text-zinc-300 max-w-2xl">
          Built for brands, licensors, manufacturers, and retailers. Manage item identity lifecycle, verification policies,
          anomaly detection, and audit evidence.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Card title="What you can do (MVP)">
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>• Brand workspace (tenant)</li>
              <li>• Tag registry (UID/EPC ↔ product/item)</li>
              <li>• Verification policy config (per product line)</li>
              <li>• Audit log viewer + export</li>
            </ul>
          </Card>

          <Card title="Next steps (Production)">
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>• Role-based access control (Admin / Ops / Support)</li>
              <li>• Issuance / activation / transfer workflow</li>
              <li>• Alerts for duplicate scans / geo-time anomalies</li>
              <li>• Webhook/API integration to ERP/WMS/CRM</li>
            </ul>
          </Card>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-zinc-950/60 px-5 py-3 text-sm hover:bg-white/10"
          >
            ← Back to Home
          </Link>
          <a
            href="mailto:hello@onetrue.tech?subject=OneTrue%20Enterprise%20Pilot"
            className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium text-white bg-[linear-gradient(90deg,var(--ot-dark),var(--ot-primary),var(--ot-light))] hover:opacity-90"
          >
            Start a Pilot
          </a>
        </div>
      </main>

      <footer className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-zinc-400">
          {BRAND.domain} • Enterprise
        </div>
      </footer>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="font-medium">{title}</div>
      {children}
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