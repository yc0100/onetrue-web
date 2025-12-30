"use client";

import React from "react";
import Link from "next/link";
import {
  QrCode,
  Radar,
  FileText,
  KeyRound,
  Building2,
  User,
  ArrowRight,
  Cloud,
  Lock,
  Workflow,
} from "lucide-react";
import { motion } from "framer-motion";

// OneTrue Authentication System — Minimal Tech Landing Page
// Next.js (App Router) single-file page component.
// Tailwind CSS assumed.

const BRAND = {
  name: "OneTrue",
  domain: "onetrue.tech",
  tagline: "Authenticity you can verify. Trust you can audit.",
  // Colors sampled from your logo (teal + deep navy).
  colors: {
    dark: "#01263E",
    primary: "#1D4553",
    light: "#6B848C",
    white: "#FFFFFF",
  },
};

export default function Page() {
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
      <Header />

      <main>
        <Hero />
        <LogosStrip />
        <ValueProps />
        <HowItWorks />
        <SplitEntrances />
        <SecurityAudit />
        <Integrations />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="sticky top-0 z-50 border-b border-white/5 backdrop-blur bg-zinc-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="group flex items-center gap-2">
          <div className="h-[72px] w-[144px] flex items-center justify-center">
            {/* Place your logo file at: /public/onetrue-logo.png */}
            <img
              src="/onetrue-logo.png"
              alt="OneTrue logo"
              className="h-[48px] w-[120px] object-contain"
            />
          </div>
          <div className="leading-tight">
            <div className="font-semibold tracking-tight">{BRAND.name}</div>
            <div className="text-xs text-zinc-400">Authentication System</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
          {/* 页内锚点：用 <a> */}
          <a className="hover:text-white" href="#solution">
            Solution
          </a>
          <a className="hover:text-white" href="#how">
            How it works
          </a>
          <a className="hover:text-white" href="#security">
            Security
          </a>

          {/* 页面跳转：用 <Link> */}
          <Link className="hover:text-white" href="/enterprise">
            Enterprise
          </Link>
          <Link className="hover:text-white" href="/verify">
            Consumer
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/enterprise"
            className="hidden sm:inline-flex rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
          >
            Enterprise
          </Link>

          {/* ✅ NEW: Goods Owner */}
          <Link
            href="/owner"
            className="hidden sm:inline-flex rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
          >
            Goods Owner
          </Link>

          <Link
            href="/verify"
            className="inline-flex rounded-xl px-3 py-2 text-sm font-medium text-white bg-[linear-gradient(90deg,var(--ot-dark),var(--ot-primary),var(--ot-light))] hover:opacity-90"
          >
            Verify Now
          </Link>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const [demoOpen, setDemoOpen] = React.useState(false);
  // TODO: 换成你自己的 YouTube VIDEO_ID
  const YT_ID = "-p5x_p7vTm8";
  
  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid gap-10 md:grid-cols-[1.15fr_0.85fr]"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-zinc-300 bg-white/5 border-[color:rgba(107,132,140,0.35)]">
              <Radar className="h-4 w-4 text-[color:var(--ot-light)]" />
              NFC / UHF RFID • Cloud verification • Audit-ready
            </div>

            <h1 className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight whitespace-nowrap bg-clip-text text-transparent bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,255,255,0.75))]">
              OneTrue Authentication System
            </h1>
            <p className="mt-4 text-lg text-zinc-300 max-w-xl">
              {BRAND.tagline} A production-grade platform for brands to protect products, and for consumers to verify authenticity in seconds.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/enterprise"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm hover:bg-white/10"
              >
                <Building2 className="h-4 w-4" />
                Enterprise Portal
                <ArrowRight className="h-4 w-4 opacity-70" />
              </Link>
              <Link
                href="/verify"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium text-white bg-[linear-gradient(90deg,var(--ot-dark),var(--ot-primary),var(--ot-light))] hover:opacity-90"
              >
                <User className="h-4 w-4" />
                Consumer Verify
                <ArrowRight className="h-4 w-4 opacity-70" />
              </Link>


              <button
                type="button"
                onClick={() => setDemoOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-zinc-950/60 px-5 py-3 text-sm hover:bg-white/10"
              >
                Watch Demo
                <ArrowRight className="h-4 w-4 opacity-70" />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <MiniStat label="Scan" value="NFC / RFID" />
              <MiniStat label="Response" value="< 1s" />
              <MiniStat label="Audit" value="Immutable logs" />
              <MiniStat label="Deploy" value="Cloud / Hybrid" />
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 ring-1 ring-[color:rgba(107,132,140,0.25)]">
              <div className="flex items-center justify-between">
                <div className="text-sm text-zinc-300">Live verification flow</div>
                <div className="text-xs px-2 py-1 rounded-full border bg-zinc-950/60 border-[color:rgba(107,132,140,0.35)]">
                  Demo UI
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <FlowRow icon={<QrCode className="h-4 w-4 text-[color:var(--ot-light)]" />} title="Tap tag" desc="NFC / UHF RFID read" />
                <FlowRow icon={<KeyRound className="h-4 w-4 text-[color:var(--ot-light)]" />} title="Challenge" desc="Crypto / PIN / policy" />
                <FlowRow icon={<Cloud className="h-4 w-4 text-[color:var(--ot-light)]" />} title="Verify" desc="Cloud function validation" />
                <FlowRow icon={<FileText className="h-4 w-4 text-[color:var(--ot-light)]" />} title="Audit" desc="Signed event log" />
              </div>

              <div className="mt-6 rounded-2xl bg-zinc-950/60 border border-white/10 p-4">
                <div className="text-xs text-zinc-400">Result</div>
                <div className="mt-1 flex items-center justify-between">
                  <div className="text-sm font-medium">Authentic • Verified</div>
                  <div className="text-xs font-medium text-[color:var(--ot-light)]">OK</div>
                </div>
                <div className="mt-2 text-xs text-zinc-400">Evidence: tag UID / EPC, policy, timestamp, signature, device hash</div>
              </div>
            </div>

            <div className="pointer-events-none absolute -inset-8 -z-10 opacity-60">
              <div className="h-full w-full blur-3xl bg-[linear-gradient(90deg,var(--ot-dark),var(--ot-primary),var(--ot-light))]" />
            </div>
          </div>
        </motion.div>
      </div>
      {demoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setDemoOpen(false)}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="text-sm text-zinc-200">Android App Demo</div>
              <button
                className="text-sm text-zinc-400 hover:text-white"
                onClick={() => setDemoOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="relative w-full aspect-video bg-black">
              <iframe
                id="ot-yt-player"
                className="absolute inset-0 h-full w-full"
                //src="https://www.youtube-nocookie.com/embed/-p5x_p7vTm8?autoplay=1&controls=1&modestbranding=1&rel=0&enablejsapi=1"
                //src={`https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&controls=1&modestbranding=1&rel=0&enablejsapi=1`}
                src={`https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&controls=1&modestbranding=1&rel=0`}


                //allow="autoplay; encrypted-media"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}  
    </section>
  );
}

function LogosStrip() {
  return (
    <section className="border-y border-white/5 bg-zinc-950/40">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500">
          <span>Built for: licensed merchandise • collectibles • luxury goods • logistics</span>
          <span>Designed for: mobile apps • retail POS • factory / warehouse handhelds</span>
          <span>Ready for: multi-tenant brands • multi-manufacturer supply chains</span>
        </div>
      </div>
    </section>
  );
}

function ValueProps() {
  const items = [
    {
      icon: <Lock className="h-5 w-5 text-[color:var(--ot-light)]" />,
      title: "Cryptographic verification",
      desc: "Prevent simple UID copying with challenge/response and policy controls.",
    },
    {
      icon: <Workflow className="h-5 w-5 text-[color:var(--ot-light)]" />,
      title: "Production-grade workflows",
      desc: "Tag issuance, activation, transfer, and redemption—end-to-end lifecycle.",
    },
    {
      icon: <FileText className="h-5 w-5 text-[color:var(--ot-light)]" />,
      title: "Audit-ready evidence",
      desc: "Tamper-evident logs for compliance, disputes, and investigations.",
    },
  ];

  return (
    <section id="solution" className="mx-auto max-w-6xl px-4 py-14">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight">A simple scan becomes a trusted proof.</h2>
        <p className="mt-3 text-zinc-300">
          OneTrue links each physical item to a verifiable digital record, enabling real-time authenticity checks across the supply chain
          and at the consumer touchpoint.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {items.map((it) => (
          <Card key={it.title}>
            <div className="flex items-start gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-2 ring-1 ring-[color:rgba(107,132,140,0.25)]">{it.icon}</div>
              <div>
                <div className="font-medium">{it.title}</div>
                <div className="mt-1 text-sm text-zinc-400">{it.desc}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Issue & bind", desc: "Create a unique identity per item and bind it to tag data (UID/EPC) + policy." },
    { n: "02", title: "Activate & track", desc: "Activate at factory/warehouse. Track ownership/transfer events as needed." },
    { n: "03", title: "Verify anywhere", desc: "Mobile app or POS scans the tag and verifies via secure cloud endpoint." },
    { n: "04", title: "Audit & respond", desc: "Store signed evidence. Detect anomalies and trigger workflows/alerts." },
  ];

  return (
    <section id="how" className="border-y border-white/5 bg-zinc-950/40">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
            <p className="mt-3 text-zinc-300">Designed to be simple for users, strict for attackers, and clear for auditors.</p>
          </div>
          <div className="text-sm text-zinc-400">NFC / UHF RFID • Cloud Functions • Firestore / DB</div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="inline-flex rounded-full border px-2 py-0.5 text-xs bg-zinc-950/60 border-[color:rgba(107,132,140,0.35)]">{s.n}</div>
              <div className="mt-3 font-medium">{s.title}</div>
              <div className="mt-2 text-sm text-zinc-400">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SplitEntrances() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid gap-6 md:grid-cols-2">
        <div id="enterprise" className="rounded-3xl border border-white/10 bg-white/5 p-7">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[color:var(--ot-light)]" />
            <h3 className="text-xl font-semibold tracking-tight">Enterprise</h3>
          </div>
          <p className="mt-3 text-zinc-300">
            For brands, licensors, manufacturers, and retailers who need supply-chain controls, analytics, and audit trails.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-zinc-400">
            <li>• Multi-tenant brand workspace & role-based access control</li>
            <li>• Tag issuance, activation, transfer, redemption workflows</li>
            <li>• Anomaly detection: duplicate scans, geo/time outliers</li>
            <li>• Exportable evidence for disputes & compliance</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/enterprise"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-2 text-sm hover:bg-white/10"
            >
              Open Enterprise Portal
              <ArrowRight className="h-4 w-4 opacity-70" />
            </Link>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium text-white bg-[linear-gradient(90deg,var(--ot-dark),var(--ot-primary),var(--ot-light))] hover:opacity-90"
            >
              Request Demo
              <ArrowRight className="h-4 w-4 opacity-70" />
            </a>
          </div>
        </div>

        <div id="consumer" className="rounded-3xl border border-white/10 bg-white/5 p-7">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-[color:var(--ot-light)]" />
            <h3 className="text-xl font-semibold tracking-tight">Consumer</h3>
          </div>
          <p className="mt-3 text-zinc-300">For end users who want a fast, clear authenticity check—no expertise required.</p>
          <ul className="mt-5 space-y-2 text-sm text-zinc-400">
            <li>• Tap-to-verify with simple “Authentic / Not verified” result</li>
            <li>• Product story: origin, edition, warranty / ownership status</li>
            <li>• Privacy-first: minimal data collection, transparent evidence</li>
            <li>• Optional: registration / anti-resale / loyalty experiences</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/verify"
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium text-white bg-[linear-gradient(90deg,var(--ot-dark),var(--ot-primary),var(--ot-light))] hover:opacity-90"
            >
              Verify an Item
              <ArrowRight className="h-4 w-4 opacity-70" />
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-2 text-sm hover:bg-white/10"
            >
              See how it works
              <ArrowRight className="h-4 w-4 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SecurityAudit() {
  const bullets = [
    { title: "Strong auth & tenancy", desc: "RBAC, tenant isolation, and environment separation (dev/stage/prod)." },
    { title: "Signed verification events", desc: "Every verification emits an event with timestamp, device context, and signature." },
    { title: "Policy-driven verification", desc: "Different brands/products can enforce different rules without changing apps." },
    { title: "Portable architecture", desc: "Start on Firebase, migrate to AWS (API Gateway/Lambda/DynamoDB) when needed." },
  ];

  return (
    <section id="security" className="border-y border-white/5 bg-zinc-950/40">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Security & auditability by design</h2>
            <p className="mt-3 text-zinc-300">
              OneTrue is built to support enterprise requirements: clear module boundaries, traceable evidence, and controlled secrets.
            </p>

            <div className="mt-6 space-y-3">
              {bullets.map((b) => (
                <div key={b.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="font-medium">{b.title}</div>
                  <div className="mt-1 text-sm text-zinc-400">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <div className="text-sm text-zinc-300">Minimal reference architecture</div>
            <div className="mt-4 space-y-3 text-sm">
              <DiagramLine left="Mobile / POS" right="Verification API" />
              <DiagramLine left="Verification API" right="Policy Engine" />
              <DiagramLine left="Verification API" right="Tag Registry" />
              <DiagramLine left="Verification API" right="Audit Log" />
              <DiagramLine left="Admin Console" right="Analytics" />
            </div>
            <div className="mt-6 text-xs text-zinc-400">
              Tip: routes <span className="text-zinc-300">/enterprise</span> and <span className="text-zinc-300">/verify</span> can be separate apps
              later—this page is the shared entry.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Integrations() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold tracking-tight">Integrations</h2>
        <p className="mt-3 text-zinc-300">Plug into your existing operations—factory tools, logistics, retail, and customer support.</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card>
          <div className="font-medium">Mobile apps</div>
          <div className="mt-2 text-sm text-zinc-400">Android / iOS scanning, offline cache, device attestation options.</div>
        </Card>
        <Card>
          <div className="font-medium">Enterprise systems</div>
          <div className="mt-2 text-sm text-zinc-400">ERP/WMS/CRM via webhooks, exports, or API gateway.</div>
        </Card>
        <Card>
          <div className="font-medium">Cloud portability</div>
          <div className="mt-2 text-sm text-zinc-400">Firebase-first today, AWS-ready tomorrow with clean boundaries.</div>
        </Card>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="mx-auto max-w-6xl px-4 pb-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 ring-1 ring-[color:rgba(107,132,140,0.25)]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">Deploy OneTrue for your brand</h3>
            <p className="mt-2 text-zinc-300 max-w-xl">Start with a pilot: one product line, one region, measurable anti-counterfeit impact.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:hello@onetrue.tech?subject=OneTrue%20Demo%20Request"
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium text-white bg-[linear-gradient(90deg,var(--ot-dark),var(--ot-primary),var(--ot-light))] hover:opacity-90"
            >
              Request a demo
              <ArrowRight className="h-4 w-4 opacity-70" />
            </a>
            <Link
              href="/verify"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-zinc-950/60 px-5 py-3 text-sm hover:bg-white/10"
            >
              Consumer verify
              <ArrowRight className="h-4 w-4 opacity-70" />
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3 text-xs text-zinc-400">
          <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-3">No heavy client updates—policy-driven server verification.</div>
          <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-3">Audit evidence ready for partners and regulators.</div>
          <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-3">Designed for multi-brand, multi-manufacturer ecosystems.</div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="font-semibold">{BRAND.name}</div>
          <div className="text-sm text-zinc-400">{BRAND.domain} • OneTrue Authentication System</div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
          <Link className="hover:text-white" href="/enterprise">
            Enterprise
          </Link>
          <Link className="hover:text-white" href="/verify">
            Consumer
          </Link>
          <a className="hover:text-white" href="#security">
            Security
          </a>
          <a className="hover:text-white" href="mailto:hello@onetrue.tech">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

// ---------- UI bits ----------

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-3xl border border-white/10 bg-white/5 p-6">{children}</div>;
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}

function FlowRow({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-zinc-950/40 p-3">
      <div className="flex items-center gap-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-2">{icon}</div>
        <div>
          <div className="text-sm font-medium">{title}</div>
          <div className="text-xs text-zinc-400">{desc}</div>
        </div>
      </div>
      <div className="h-2 w-2 rounded-full bg-[color:rgba(107,132,140,0.85)]" />
    </div>
  );
}

function DiagramLine({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-zinc-950/60 p-3">
      <span className="text-zinc-200">{left}</span>
      <span className="text-zinc-500">→</span>
      <span className="text-zinc-200">{right}</span>
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
