'use client';

import { useEffect, useState } from 'react';

// GA4, loaded ONLY after cookie consent is accepted (banner in
// CookieConsent.tsx stores 'cookie-consent' in localStorage). Visitors who
// decline or never answer are not tracked at all; reporting states this
// undercount rather than correcting it.

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function Analytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('cookie-consent') === 'accepted') {
      setConsented(true);
      return;
    }
    const onAccept = () => setConsented(true);
    window.addEventListener('gs-consent-accepted', onAccept);
    return () => window.removeEventListener('gs-consent-accepted', onAccept);
  }, []);

  useEffect(() => {
    if (!consented || !GA4_ID || document.getElementById('ga4-script')) return;
    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID, { anonymize_ip: true });
  }, [consented]);

  return null;
}
