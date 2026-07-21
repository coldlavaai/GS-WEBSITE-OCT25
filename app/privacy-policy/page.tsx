import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Greenstar Solar',
  description: 'Privacy Policy for Greenstar Solar. Learn how we collect, use, and protect your personal data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-[#8cc63f]">Privacy Policy</h1>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">1. Introduction</h2>
            <p>
              Greenstar Solar ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website greenstarsolar.co.uk or use our services.
            </p>
            <p className="mt-4">
              <strong>Company Details:</strong><br />
              Greenstar Solar<br />
              Company No. 16038912<br />
              Email: info@greenstarsolar.co.uk<br />
              Phone: 023 8212 3763
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.1 Personal Data You Provide</h3>
            <p>We collect the following personal information when you contact us through our website:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Postcode</li>
              <li>Any messages or enquiries you send us</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.2 Chat Widget Data</h3>
            <p>When you use our AI chat assistant (Sophie), we collect:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Your chat messages and conversation history</li>
              <li>Any personal information you choose to share in the chat</li>
              <li>Technical data such as your IP address and browser type</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">2.3 Automatically Collected Data</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited and time spent on site</li>
              <li>Referring website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">3. How We Use Your Information</h2>
            <p>We use your personal data for the following purposes:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>To respond to your enquiries:</strong> We use your contact information to answer questions and provide quotes</li>
              <li><strong>To provide our services:</strong> Including solar panel consultation, installation quotes, and customer support</li>
              <li><strong>To improve our website:</strong> Analysing how visitors use our site to enhance user experience</li>
              <li><strong>To send marketing communications:</strong> Only if you have given explicit consent (you can opt out anytime)</li>
              <li><strong>To comply with legal obligations:</strong> Such as tax and regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">4. Legal Basis for Processing (UK GDPR)</h2>
            <p>We process your personal data under the following legal bases:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Consent:</strong> When you submit a contact form or use our chat widget</li>
              <li><strong>Legitimate interests:</strong> To respond to enquiries and improve our services</li>
              <li><strong>Contract:</strong> When necessary to provide services you have requested</li>
              <li><strong>Legal obligation:</strong> To comply with UK laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">5. Third-Party Services</h2>
            <p>We share your data with the following third-party processors:</p>

            <div className="mt-4 space-y-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-semibold text-white">Anthropic (Claude AI Chat Assistant)</h4>
                <p className="text-sm mt-1">Processes chat messages to power our Sophie assistant and provide AI customer support. Data processed in the USA. Anthropic does not use business API data to train its models.</p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-semibold text-white">Sanity CMS</h4>
                <p className="text-sm mt-1">Stores website content and contact form submissions. Data stored in EU/USA (check your Sanity project region).</p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-semibold text-white">Google Workspace</h4>
                <p className="text-sm mt-1">Contact form submissions are stored in Google Sheets for our internal CRM. Covered by Google's Data Processing Agreement.</p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-semibold text-white">Vercel (Hosting)</h4>
                <p className="text-sm mt-1">Provides website hosting and may collect analytics data. Privacy policy: vercel.com/legal/privacy-policy</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">6. International Data Transfers</h2>
            <p>
              Some of our third-party service providers are based outside the UK/EU (particularly in the USA). We ensure appropriate safeguards are in place through:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Standard Contractual Clauses (SCCs)</li>
              <li>UK International Data Transfer Agreement (IDTA)</li>
              <li>Adequacy decisions where applicable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">7. Data Retention</h2>
            <p>We retain your personal data for:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Contact form enquiries:</strong> 2 years from last contact (unless you become a customer)</li>
              <li><strong>Customer records:</strong> 7 years for accounting and warranty purposes</li>
              <li><strong>Chat conversations:</strong> 1 year from conversation date</li>
              <li><strong>Marketing data:</strong> Until you withdraw consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">8. Your Rights Under UK GDPR</h2>
            <p>You have the following rights regarding your personal data:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Right of access:</strong> Request a copy of your personal data</li>
              <li><strong>Right to rectification:</strong> Correct inaccurate personal data</li>
              <li><strong>Right to erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
              <li><strong>Right to restrict processing:</strong> Limit how we use your data</li>
              <li><strong>Right to data portability:</strong> Receive your data in a portable format</li>
              <li><strong>Right to object:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Right to withdraw consent:</strong> Withdraw consent for marketing at any time</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, contact us at: <a href="mailto:info@greenstarsolar.co.uk" className="text-[#8cc63f] hover:underline">info@greenstarsolar.co.uk</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">9. Cookies</h2>
            <p>
              Our website uses cookies to improve your experience. Please see our <a href="/cookie-policy" className="text-[#8cc63f] hover:underline">Cookie Policy</a> for full details on the cookies we use and how to manage them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">10. Data Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal data, including:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>HTTPS encryption for all data transmission</li>
              <li>Secure cloud storage with access controls</li>
              <li>Regular security updates and monitoring</li>
              <li>Limited employee access on a need-to-know basis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">11. Children's Privacy</h2>
            <p>
              Our website and services are not directed at children under 16. We do not knowingly collect personal data from children. If you believe we have inadvertently collected data from a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">12. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The "Last updated" date at the top will reflect the most recent changes. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 mt-8">13. Contact Us & Complaints</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <div className="mt-4 bg-white/5 p-4 rounded-lg">
              <p><strong>Email:</strong> <a href="mailto:info@greenstarsolar.co.uk" className="text-[#8cc63f] hover:underline">info@greenstarsolar.co.uk</a></p>
              <p><strong>Phone:</strong> 023 8212 3763</p>
            </div>
            <p className="mt-4">
              If you are not satisfied with our response, you have the right to lodge a complaint with the UK Information Commissioner's Office (ICO):
            </p>
            <div className="mt-4 bg-white/5 p-4 rounded-lg">
              <p><strong>ICO Website:</strong> <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#8cc63f] hover:underline">ico.org.uk</a></p>
              <p><strong>ICO Helpline:</strong> 0303 123 1113</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
