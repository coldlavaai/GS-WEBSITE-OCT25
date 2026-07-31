import BookingCalendar from "./calendar";

export const dynamic = "force-dynamic";

/**
 * Jack's live diary (Greenstar booking page). Reached only from an in-session
 * link sent to an engaged lead; the token in the URL is a per-lead HMAC, so
 * there is nothing to guess and nothing personal in the address itself.
 */
export default async function BookPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return (
    <main className="min-h-screen bg-[#161a16] text-white">
      <div className="mx-auto max-w-xl px-4 py-8 sm:py-12">
        <div className="mb-8 text-center">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Greenstar Solar</div>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Book your call with Jack</h1>
          <p className="mx-auto mt-2 max-w-sm text-sm text-white/60">
            Pick a day, then a time that suits you. 15 minutes, no obligation, straight into Jack&apos;s diary.
          </p>
        </div>
        <BookingCalendar token={token} />
      </div>
    </main>
  );
}
