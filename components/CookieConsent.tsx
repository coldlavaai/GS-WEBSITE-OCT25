'use client';

import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if hideConsent parameter is present (for iframe embeds)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('hideConsent') === 'true') {
      return; // Don't show banner in iframe previews
    }

    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    window.dispatchEvent(new Event('gs-consent-accepted'));
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      className="cookie-consent-banner"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        right: '200px',
        maxWidth: '1000px',
        zIndex: 9999,
        padding: '20px',
        background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.98), rgba(25, 25, 25, 0.98))',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(140, 198, 63, 0.2)',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
        animation: 'slideUpFade 0.5s ease-out',
      }}
    >
      <style jsx global>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .cookie-consent-banner {
            bottom: 10px !important;
            left: 10px !important;
            right: 10px !important;
            max-width: none !important;
          }
        }
      `}</style>

      <div className="max-w-full">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Content */}
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="w-6 h-6 text-[#8cc63f] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-semibold text-base md:text-lg mb-1">
                We Use Cookies
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                We use cookies to improve your experience on our website and enable features like our chat widget.
                By clicking "Accept All", you consent to our use of cookies.{' '}
                <a
                  href="/cookie-policy"
                  className="text-[#8cc63f] hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Learn more
                </a>
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href="/cookie-policy"
              className="text-gray-300 hover:text-white text-sm underline transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Cookie Policy
            </a>

            <button
              onClick={handleReject}
              className="px-5 py-2.5 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all text-sm font-medium"
              style={{ minWidth: '120px' }}
            >
              Reject All
            </button>

            <button
              onClick={handleAccept}
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#8cc63f] to-[#7ab52f] text-black font-semibold hover:shadow-lg hover:scale-105 transition-all text-sm"
              style={{ minWidth: '120px' }}
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
