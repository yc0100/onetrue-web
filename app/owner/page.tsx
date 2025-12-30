"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Loader2,
  ShieldCheck,
  KeyRound,
  XCircle,
  CheckCircle2,
} from "lucide-react";

type LoginStatus = "idle" | "loading" | "success" | "fail" | "error";
type PinStatus = "idle" | "loading" | "success" | "error";

type OwnerLoginResponse = {
  ok: boolean;
  status: "OWNER_AUTHENTIC" | "OWNER_NOT_VERIFIED";
  message?: string;
  requestId: string;
  tagId: string;
  ts: string;
};

export default function OwnerPage() {
  const [tagId, setTagId] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);

  const [loginStatus, setLoginStatus] = useState<LoginStatus>("idle");
  const [loginResult, setLoginResult] = useState<OwnerLoginResponse | null>(null);
  const [loginError, setLoginError] = useState("");

  const [newPin1, setNewPin1] = useState("");
  const [newPin2, setNewPin2] = useState("");
  const [pinStatus, setPinStatus] = useState<PinStatus>("idle");
  const [pinError, setPinError] = useState("");

  const canLogin = useMemo(
    () => tagId.trim().length >= 6 && pin.trim().length >= 4 && loginStatus !== "loading",
    [tagId, pin, loginStatus]
  );

  const canChangePin = useMemo(
    () =>
      newPin1.length >= 4 &&
      newPin2.length >= 4 &&
      newPin1 === newPin2 &&
      pinStatus !== "loading",
    [newPin1, newPin2, pinStatus]
  );

  async function onLogin() {
    setLoginStatus("loading");
    setLoginError("");
    setLoginResult(null);

    try {
      const resp = await fetch("/api/owner/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tagId: tagId.trim(), pin: pin.trim() }),
      });

      const data = (await resp.json()) as OwnerLoginResponse;
      setLoginResult(data);

      if (data.ok && data.status === "OWNER_AUTHENTIC") {
        setLoginStatus("success");
      } else {
        setLoginStatus("fail");
      }
    } catch (e: any) {
      setLoginStatus("error");
      setLoginError(e?.message || "Unknown error");
    }
  }

  async function onChangePin() {
    setPinStatus("loading");
    setPinError("");

    try {
      const resp = await fetch("/api/owner/change-pin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          tagId: tagId.trim(),
          oldPin: pin.trim(),
          newPin: newPin1.trim(),
        }),
      });

      const data = await resp.json();
      if (!resp.ok || !data.ok) {
        throw new Error(data.message || "Change PIN failed");
      }

      setPinStatus("success");
    } catch (e: any) {
      setPinStatus("error");
      setPinError(e?.message || "Server error");
    }
  }

  return (
    <div
      className="min-h-screen bg-zinc-950 text-zinc-100"
      style={
        {
          "--ot-dark": "#01263E",
          "--ot-primary": "#1D4553",
          "--ot-light": "#6B848C",
        } as React.CSSProperties
      }
    >
      {/* top bar */}
      <div className="border-b border-white/5 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="text-sm text-zinc-300">Goods Owner</div>
          <Link href="/" className="text-sm text-zinc-300 hover:text-white">
            Close
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
          {/* LEFT */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[color:var(--ot-light)]" />
              <h1 className="text-2xl font-semibold tracking-tight">
                Goods Owner
              </h1>
            </div>

            {/* LOGIN FORM */}
            {loginStatus !== "success" && (
              <>
                <p className="mt-3 text-zinc-300">
                  Login with <span className="font-medium">UID + PIN</span>.
                </p>

                <div className="mt-6 space-y-5">
                  <input
                    value={tagId}
                    onChange={(e) => setTagId(e.target.value)}
                    placeholder="Tag ID"
                    className="w-full rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3 text-sm"
                  />

                  <div className="relative">
                    <input
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="PIN"
                      type={showPin ? "text" : "password"}
                      className="w-full rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3 pr-20 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400"
                    >
                      {showPin ? "Hide" : "Show"}
                    </button>
                  </div>

                  <button
                    onClick={onLogin}
                    disabled={!canLogin}
                    className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium text-white bg-[linear-gradient(90deg,var(--ot-dark),var(--ot-primary),var(--ot-light))] disabled:opacity-40"
                  >
                    {loginStatus === "loading" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                    Login
                  </button>
                </div>
              </>
            )}

            {/* CHANGE PIN */}
            {loginStatus === "success" && (
              <>
                <p className="mt-3 text-zinc-300">
                  Login successful. You may now set a{" "}
                  <span className="font-medium">new confidential PIN</span>.
                </p>

                <div className="mt-6 space-y-4">
                  <input
                    value={newPin1}
                    onChange={(e) => setNewPin1(e.target.value)}
                    placeholder="New PIN"
                    type="password"
                    className="w-full rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3 text-sm"
                  />
                  <input
                    value={newPin2}
                    onChange={(e) => setNewPin2(e.target.value)}
                    placeholder="Confirm new PIN"
                    type="password"
                    className="w-full rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3 text-sm"
                  />

                  <button
                    onClick={onChangePin}
                    disabled={!canChangePin}
                    className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium text-white bg-[linear-gradient(90deg,var(--ot-dark),var(--ot-primary),var(--ot-light))] disabled:opacity-40"
                  >
                    {pinStatus === "loading" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <KeyRound className="h-4 w-4" />
                    )}
                    Update PIN
                  </button>

                  {pinStatus === "success" && (
                    <div className="flex items-center gap-2 text-emerald-300 text-sm">
                      <CheckCircle2 className="h-4 w-4" />
                      PIN updated successfully.
                    </div>
                  )}

                  {pinStatus === "error" && (
                    <div className="flex items-center gap-2 text-red-300 text-sm">
                      <XCircle className="h-4 w-4" />
                      {pinError}
                    </div>
                  )}
                </div>
              </>
            )}
          </section>

          {/* RIGHT */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-7 text-sm text-zinc-400">
            <p>
              Changing your PIN ensures that only you can authenticate this
              physical item, even if the original PIN was exposed.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}