"use client";

import { useEffect, useState } from "react";
import { Fuel } from "lucide-react";
import { markSponsorLessonSeen } from "@/lib/localStorage";
import type { SponsorQuote } from "@/lib/types";
import { StatusPill } from "@/components/StatusPill";

export function SponsorGasPanel() {
  const [quote, setQuote] = useState<SponsorQuote | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadQuote() {
    setLoading(true);
    try {
      const response = await fetch("/api/sponsor/quote");
      const data = (await response.json()) as SponsorQuote;
      setQuote(data);
      markSponsorLessonSeen();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadQuote();
  }, []);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-tellus-mint text-tellus-teal">
          <Fuel aria-hidden="true" className="h-6 w-6" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold text-slate-950">Sponsored transaction UX</h2>
            <StatusPill tone="amber">Mock sponsor quote</StatusPill>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Sponsored transactions mean a project may cover network fees so new users can complete a claim. v003 only shows the user experience and quote shape.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        {quote ? (
          <dl className="grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="font-semibold text-slate-500">Estimated fee</dt>
              <dd className="mt-1 text-lg font-black text-slate-950">{quote.estimatedFeeAda} ADA</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Minimum UTXO</dt>
              <dd className="mt-1 text-lg font-black text-slate-950">{quote.minUtxoAda} ADA</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-500">Mode</dt>
              <dd className="mt-1 text-lg font-black text-slate-950">{quote.mode}</dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-slate-600">{loading ? "Loading quote..." : "Quote not loaded."}</p>
        )}
        <p className="mt-4 text-sm font-medium text-slate-600">{quote?.note ?? "v003 quote only. No transaction submitted."}</p>
      </div>
    </section>
  );
}
