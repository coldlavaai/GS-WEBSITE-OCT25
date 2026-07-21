import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy - Greenstar Solar',
  description: 'Cookie Policy for Greenstar Solar. Learn about the cookies we use and how to manage them.',
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-[#8cc63f]">Cookie Policy</h1>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">2. How We Use Cookies</h2>
            <p>
              Greenstar Solar uses cookies to:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Remember your cookie consent preferences</li>
              <li>Enable our chat widget to function properly</li>
              <li>Improve website performance and user experience</li>
              <li>Understand how visitors use our website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">3. Types of Cookies We Use</h2>

            <div className="mt-4 space-y-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">Strictly Necessary Cookies</h3>
                <p className="mb-2">These cookies are essential for the website to function and cannot be disabled.</p>
                <div className="text-sm mt-2">
                  <p><strong>Cookie:</strong> cookie-consent</p>
                  <p><strong>Purpose:</strong> Stores your cookie preferences</p>
                  <p><strong>Duration:</strong> 365 days</p>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">Functional Cookies</h3>
                <p className="mb-2">These cookies enable enhanced functionality like our chat widget.</p>
                <div className="text-sm mt-2">
                  <p><strong>Service:</strong> Sophie Chat Assistant</p>
                  <p><strong>Purpose:</strong> Remembers your chat sessions and preferences</p>
                  <p><strong>Duration:</strong> Session (deleted when you close your browser)</p>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-2">Performance Cookies</h3>
                <p className="mb-2">These cookies help us understand how visitors interact with our website.</p>
                <div className="text-sm mt-2">
                  <p><strong>Service:</strong> Vercel Analytics (if enabled)</p>
                  <p><strong>Purpose:</strong> Anonymous usage statistics</p>
                  <p><strong>Duration:</strong> Varies</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">4. Third-Party Cookies</h2>
            <p>
              Some cookies are placed by third-party services that appear on our pages:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Anthropic (Claude):</strong> Powers our Sophie chat assistant by processing chat messages to generate replies</li>
              <li><strong>Vercel:</strong> Our hosting provider may set cookies for analytics and performance monitoring</li>
            </ul>
            <p className="mt-4">
              These third parties have their own privacy policies. We recommend reviewing:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-[#8cc63f] hover:underline">Anthropic Privacy Policy</a></li>
              <li><a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#8cc63f] hover:underline">Vercel Privacy Policy</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">5. Managing Cookies</h2>
            <p>
              You can control and manage cookies in several ways:
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">5.1 Cookie Consent Banner</h3>
            <p>
              When you first visit our website, you'll see a cookie consent banner. You can:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Accept all cookies</li>
              <li>Reject non-essential cookies</li>
              <li>Customize your preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">5.2 Browser Settings</h3>
            <p>
              Most browsers allow you to control cookies through their settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#8cc63f] hover:underline">www.aboutcookies.org</a></li>
              <li><a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#8cc63f] hover:underline">www.allaboutcookies.org</a></li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">5.3 Browser-Specific Instructions</h3>
            <div className="space-y-2 text-sm mt-2">
              <p><strong>Google Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</p>
              <p><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</p>
              <p><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</p>
              <p><strong>Edge:</strong> Settings → Cookies and site permissions</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">6. Impact of Blocking Cookies</h2>
            <p>
              Blocking cookies may impact your experience on our website:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>The chat widget may not function properly</li>
              <li>You may need to re-enter preferences on each visit</li>
              <li>Some features may not work as intended</li>
            </ul>
            <p className="mt-4">
              <strong>Note:</strong> Blocking cookies will not prevent you from viewing our website content or submitting contact forms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">7. Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. When we make changes, we will update the "Last updated" date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">8. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div className="mt-4 bg-white/5 p-4 rounded-lg">
              <p><strong>Email:</strong> <a href="mailto:info@greenstarsolar.co.uk" className="text-[#8cc63f] hover:underline">info@greenstarsolar.co.uk</a></p>
              <p><strong>Phone:</strong> 023 8212 3763</p>
            </div>
          </section>

          <section className="mt-8 p-4 bg-[#8cc63f]/10 border border-[#8cc63f]/30 rounded-lg">
            <p className="text-sm">
              For more information about how we handle your personal data, please see our <a href="/privacy-policy" className="text-[#8cc63f] hover:underline font-semibold">Privacy Policy</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
