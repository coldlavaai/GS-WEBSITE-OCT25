'use client';

import { useState } from 'react';

type State = 'idle' | 'working' | 'done' | 'error';

export default function UnsubscribeForm({ lead }: { lead: string }) {
  const [state, setState] = useState<State>('idle');

  const valid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(lead);

  if (!valid) {
    return (
      <div className="space-y-4 text-gray-300 leading-relaxed">
        <p>
          This unsubscribe link looks incomplete. Please use the link exactly as it appears in the
          email we sent you.
        </p>
        <p>
          You can also email{' '}
          <a href="mailto:info@greenstarsolar.co.uk" className="text-[#8cc63f] underline">
            info@greenstarsolar.co.uk
          </a>{' '}
          and we will remove you straight away.
        </p>
      </div>
    );
  }

  if (state === 'done') {
    return (
      <div className="space-y-4 text-gray-300 leading-relaxed">
        <p className="text-white text-xl font-semibold">You&apos;re unsubscribed.</p>
        <p>
          You won&apos;t receive any more emails from us about your solar enquiry. If this was a
          mistake, just get in touch at{' '}
          <a href="mailto:info@greenstarsolar.co.uk" className="text-[#8cc63f] underline">
            info@greenstarsolar.co.uk
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-gray-300 leading-relaxed">
      <p>
        Click the button below and we&apos;ll stop emailing you about your solar enquiry. No
        hard feelings.
      </p>
      <button
        onClick={async () => {
          setState('working');
          try {
            const res = await fetch('/api/unsubscribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ lead }),
            });
            setState(res.ok ? 'done' : 'error');
          } catch {
            setState('error');
          }
        }}
        disabled={state === 'working'}
        className="bg-[#8cc63f] text-black font-semibold px-8 py-3 rounded-lg hover:bg-[#7ab332] transition-colors disabled:opacity-60"
      >
        {state === 'working' ? 'One moment…' : 'Unsubscribe me'}
      </button>
      {state === 'error' && (
        <p className="text-red-400">
          Something went wrong our end. Please try again, or email{' '}
          <a href="mailto:info@greenstarsolar.co.uk" className="text-[#8cc63f] underline">
            info@greenstarsolar.co.uk
          </a>{' '}
          and we&apos;ll remove you by hand.
        </p>
      )}
    </div>
  );
}
