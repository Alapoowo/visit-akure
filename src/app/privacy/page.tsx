export const metadata = {
  title: 'Privacy Policy | Visit Akure',
  description: 'Visit Akure Privacy Policy — how we collect, use, and protect your information.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-extrabold text-gray-900 mb-3">{title}</h2>
      <div className="text-gray-600 leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

export default function PrivacyPage() {
  return (
    <div>
      <div className="bg-[#005F56] py-12">
        <div className="max-w-[900px] mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-white mb-2">Privacy Policy</h1>
          <p className="text-white/60">Last updated: May 12, 2026</p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-12">
        <p className="text-gray-600 leading-relaxed mb-10 text-lg">
          Your privacy matters to us. This Privacy Policy explains how Visit Akure collects, uses, and protects information when you use our platform.
        </p>

        <Section title="1. Information We Collect">
          <p>We may collect the following information:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Contact form submissions:</strong> Name, email address, and any message you send us via our contact form</li>
            <li><strong>Listing enquiries:</strong> If you initiate a WhatsApp connection, we may log the listing title and timestamp for analytics</li>
            <li><strong>Vendor applications:</strong> Business name, category, location, WhatsApp number, and any images submitted via our onboarding form</li>
            <li><strong>Usage data:</strong> Anonymous analytics data such as pages visited, time on site, and device type (no personally identifiable information)</li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use collected information to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Respond to enquiries sent through our contact form</li>
            <li>Process vendor listing applications and manage listings</li>
            <li>Improve the platform experience based on anonymous usage analytics</li>
            <li>Send platform updates to vendors who have listed with us (you can opt out at any time)</li>
          </ul>
          <p>We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
        </Section>

        <Section title="3. WhatsApp Communications">
          <p>
            When you tap &quot;Chat on WhatsApp,&quot; you are leaving Visit Akure and communicating directly with a vendor via WhatsApp (a third-party service operated by Meta Platforms, Inc.). Visit Akure is not responsible for data processed by WhatsApp. Please review WhatsApp&apos;s own Privacy Policy for details.
          </p>
        </Section>

        <Section title="4. Cookies and Analytics">
          <p>
            Visit Akure may use cookies or similar tracking technologies to understand how visitors use our platform. This helps us improve the user experience. No personally identifiable information is collected through cookies.
          </p>
          <p>
            You can disable cookies in your browser settings, though this may affect some platform features.
          </p>
        </Section>

        <Section title="5. Data Storage and Security">
          <p>
            Any personal data you submit is stored securely and accessible only to authorised Visit Akure team members. We take reasonable technical measures to protect your data from unauthorised access, loss, or misuse.
          </p>
          <p>
            However, no internet transmission is completely secure. By using our platform, you accept this inherent risk.
          </p>
        </Section>

        <Section title="6. Data Retention">
          <p>
            We retain vendor listing data for as long as the listing is active on the platform. Contact form submissions are retained for up to 12 months. You may request deletion of your data at any time by contacting us.
          </p>
        </Section>

        <Section title="7. Your Rights">
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Request access to any personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt out of any marketing communications</li>
          </ul>
          <p>To exercise these rights, contact us at hello@visitakure.com.</p>
        </Section>

        <Section title="8. Third-Party Links">
          <p>
            Our platform may contain links to third-party websites or services (e.g., vendor websites, WhatsApp). Visit Akure is not responsible for the privacy practices of these third parties.
          </p>
        </Section>

        <Section title="9. Children's Privacy">
          <p>
            Visit Akure is not directed at children under 13. We do not knowingly collect personal information from children. If you believe a child has submitted information to us, please contact us immediately.
          </p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. We will display the &quot;Last updated&quot; date at the top of this page. Continued use of the platform after changes constitutes acceptance of the updated policy.
          </p>
        </Section>

        <Section title="11. Contact Us">
          <p>For any privacy-related questions or requests, contact:</p>
          <div className="mt-3 bg-gray-50 rounded-xl p-4 space-y-1">
            <p><strong>Visit Akure</strong></p>
            <p>Old Farmer&apos;s Club House, Igbatoro Road, Alagbaka, Akure, Ondo State</p>
            <p>📞 +234 706 115 0587</p>
            <p>✉️ hello@visitakure.com</p>
          </div>
        </Section>
      </div>
    </div>
  )
}
