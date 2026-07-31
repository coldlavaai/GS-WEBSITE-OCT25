"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * The booking calendar (JJ's Option B): day / week / month views, tap a day,
 * see 3 to 5 real 15-minute slots from Jack's Outlook inside his calling
 * hours, tap a slot, confirm, booked. Mobile-first: everyone arrives from
 * WhatsApp on a phone.
 */

type Day = { date: string; label: string; slots: Array<{ iso: string; label: string }> };

const API = "https://dbr.coldlava.ai";

function todayStr(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date());
}

export default function BookingCalendar({ token }: { token: string }) {
  const [view, setView] = useState<"day" | "week" | "month">("week");
  const [anchor, setAnchor] = useState(todayStr());
  const [days, setDays] = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [pending, setPending] = useState<{ iso: string; label: string; dayLabel: string } | null>(null);
  const [booking, setBooking] = useState(false);
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);

  const span = view === "day" ? 1 : view === "week" ? 7 : 31;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/public/booking/${token}/slots?from=${anchor}&days=${span}`, { cache: "no-store" });
      if (res.status === 404) {
        setInvalid(true);
        return;
      }
      const json = (await res.json()) as { ok: boolean; lead_first_name?: string; days?: Day[] };
      if (json.ok) {
        setDays(json.days ?? []);
        setFirstName(json.lead_first_name ?? null);
      }
    } catch {
      setError("Couldn't load the diary just now. Pull to refresh or try again in a moment.");
    } finally {
      setLoading(false);
    }
  }, [token, anchor, span]);

  useEffect(() => {
    void load();
  }, [load]);

  const shift = (dir: 1 | -1) => {
    const d = new Date(`${anchor}T12:00:00Z`);
    d.setUTCDate(d.getUTCDate() + dir * span);
    const next = d.toISOString().slice(0, 10);
    if (next < todayStr()) {
      setAnchor(todayStr());
    } else {
      setAnchor(next);
    }
    setSelectedDay(null);
    setPending(null);
  };

  const book = async () => {
    if (!pending) return;
    setBooking(true);
    setError(null);
    try {
      const res = await fetch(`${API}/public/booking/${token}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot: pending.iso }),
      });
      const json = (await res.json()) as { ok: boolean; confirmed?: { label: string }; detail?: string };
      if (json.ok && json.confirmed) {
        setConfirmed(json.confirmed.label);
      } else if (json.detail === "slot_taken") {
        setError("That time has just been taken. Pick another and you're in.");
        setPending(null);
        void load();
      } else {
        setError("Something went wrong booking that slot. Try another, or reply to Jack's message instead.");
      }
    } finally {
      setBooking(false);
    }
  };

  const visibleDays = useMemo(() => days.filter((d) => d.slots.length > 0 || view === "month"), [days, view]);

  if (invalid) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center text-sm text-white/70">
        This booking link isn&apos;t valid any more. Reply to Jack&apos;s message and he&apos;ll sort a time with you directly.
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="rounded-2xl border border-primary/40 bg-primary/10 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl text-[#161a16]">✓</div>
        <h2 className="mt-4 text-xl font-bold">You&apos;re booked in{firstName ? `, ${firstName}` : ""}</h2>
        <p className="mt-2 text-sm text-white/75">
          Jack will call you on <span className="font-semibold text-white">{confirmed}</span>. It&apos;s in his diary now.
        </p>
        <p className="mt-3 text-xs text-white/50">Need to change it? Just reply to Jack&apos;s WhatsApp or email.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
      {/* View toggle + nav */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex rounded-full border border-white/15 p-0.5">
          {(["day", "week", "month"] as const).map((v) => (
            <button
              key={v}
              onClick={() => {
                setView(v);
                setSelectedDay(null);
                setPending(null);
              }}
              className={`rounded-full px-3 py-1 text-[12px] font-medium capitalize transition-colors ${
                view === v ? "bg-primary text-[#161a16]" : "text-white/60 hover:text-white"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => shift(-1)} className="rounded-full border border-white/15 px-3 py-1 text-white/70 hover:text-white" aria-label="Earlier">
            ‹
          </button>
          <button onClick={() => shift(1)} className="rounded-full border border-white/15 px-3 py-1 text-white/70 hover:text-white" aria-label="Later">
            ›
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-14 text-sm text-white/50">Checking Jack&apos;s diary…</div>
      ) : (
        <div className="mt-4 space-y-2">
          {visibleDays.length === 0 && (
            <p className="py-8 text-center text-sm text-white/50">No free times in this range. Try the arrows for later dates.</p>
          )}
          {visibleDays.map((d) => {
            const openDay = selectedDay === d.date || view === "day";
            return (
              <div key={d.date} className="overflow-hidden rounded-xl border border-white/10">
                <button
                  onClick={() => {
                    setSelectedDay(openDay && view !== "day" ? null : d.date);
                    setPending(null);
                  }}
                  className="flex w-full items-center justify-between bg-white/[0.03] px-4 py-3 text-left"
                >
                  <span className="text-[14px] font-medium">{d.label}</span>
                  <span className={`text-[12px] ${d.slots.length ? "text-primary" : "text-white/35"}`}>
                    {d.slots.length ? `${d.slots.length} times` : "No availability"}
                  </span>
                </button>
                {openDay && d.slots.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 px-4 pb-4 pt-1 sm:grid-cols-5">
                    {d.slots.map((s) => (
                      <button
                        key={s.iso}
                        onClick={() => setPending({ iso: s.iso, label: s.label, dayLabel: d.label })}
                        className={`rounded-lg border px-2 py-2.5 text-[13px] font-semibold transition-colors ${
                          pending?.iso === s.iso
                            ? "border-primary bg-primary text-[#161a16]"
                            : "border-white/15 text-white hover:border-primary/60"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {error && <p className="mt-3 text-center text-[13px] text-amber-400">{error}</p>}

      {pending && (
        <div className="mt-4 rounded-xl border border-primary/40 bg-primary/10 p-4 text-center">
          <p className="text-sm">
            Call with Jack: <span className="font-semibold">{pending.dayLabel} at {pending.label}</span> (15 min)
          </p>
          <button
            onClick={() => void book()}
            disabled={booking}
            className="mt-3 w-full rounded-xl bg-primary py-3 text-[15px] font-bold text-[#161a16] transition-opacity disabled:opacity-60"
          >
            {booking ? "Booking…" : "Confirm booking"}
          </button>
        </div>
      )}

      <p className="mt-4 text-center text-[11px] text-white/40">
        Times shown are UK time, live from Jack&apos;s calendar.
      </p>
    </div>
  );
}
