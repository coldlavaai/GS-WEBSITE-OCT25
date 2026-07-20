import type { Metadata } from 'next';
import UnsubscribeForm from './UnsubscribeForm';

export const metadata: Metadata = {
  title: 'Unsubscribe - Greenstar Solar',
  description: 'Unsubscribe from Greenstar Solar emails.',
  robots: { index: false, follow: false },
};

export default function UnsubscribePage({
  searchParams,
}: {
  searchParams: { lead?: string };
}) {
  const lead = typeof searchParams.lead === 'string' ? searchParams.lead : '';

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-xl">
        <h1 className="text-4xl font-bold mb-6 text-[#8cc63f]">Email preferences</h1>
        <UnsubscribeForm lead={lead} />
      </div>
    </div>
  );
}
