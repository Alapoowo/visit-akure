export const metadata = {
  title: 'Terms of Service | Visit Akure',
  description: 'Visit Akure Terms of Service — the rules and guidelines for using our platform.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-extrabold text-gray-900 mb-3">{title}</h2>
      <div className="text-gray-600 leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

export default function TermsPage() {
  return (
    <div>
      <div className="bg-[#005F56] py-12">
        <div className="max-w-[900px] mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-white mb-2">Terms of Service</h1>
          <p className="text-white/60">Last updated: May 12, 2026</p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-12">
        <p className="text-gray-600 leading-relaxed mb-10 text-lg">
          Welcome to Visit Akure. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully.
        </p>

        <Section title="1. About Visit Akure">
          <p>
            Visit Akure (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is a local business discovery platform that connects visitors and residents of Akure, Ondo State, Nigeria, with local vendors across categories including hotels, food, shortlets, services, health facilities, shops, local markets, and events.
          </p>
          <p>
            We operate as a directory and connection platform only. We do not directly provide the goods or services listed on our platform, nor do we process payments between users and vendors.
          </p>
        </Section>

        <Section title="2. Use of the Platform">
          <p>By using Visit Akure, you agree to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use the platform only for lawful purposes</li>
            <li>Provide accurate and truthful information</li>
            <li>Not attempt to manipulate, damage, or misuse the platform</li>
            <li>Respect the intellectual property rights of Visit Akure and its vendors</li>
            <li>Not use automated tools to scrape or extract data from the platform</li>
          </ul>
        </Section>

        <Section title="3. Listings and Vendors">
          <p>
            All listings on Visit Akure are submitted by independent vendors. Visit Akure makes reasonable efforts to verify listings but does not guarantee the accuracy, completeness, or quality of any listing.
          </p>
          <p>
            Vendors are solely responsible for the accuracy of their listing information, including pricing, availability, contact details, and services offered. Visit Akure is not liable for any disputes between users and vendors.
          </p>
          <p>
            Visit Akure reserves the right to remove any listing that violates our community guidelines, contains false information, or is reported for misconduct.
          </p>
        </Section>

        <Section title="4. WhatsApp Connections">
          <p>
            Visit Akure facilitates direct WhatsApp communication between users and vendors. Once a user initiates contact via WhatsApp, the transaction and communication are solely between the user and the vendor. Visit Akure is not a party to any such transaction.
          </p>
          <p>
            We are not responsible for any agreements, disputes, or outcomes arising from WhatsApp communications or transactions made outside of the Visit Akure platform.
          </p>
        </Section>

        <Section title="5. User Accounts and Data">
          <p>
            Visit Akure does not currently require user accounts for browsing listings. Any information you voluntarily provide (e.g., through the contact form or listing enquiries) will be handled in accordance with our Privacy Policy.
          </p>
        </Section>

        <Section title="6. Vendor Listings and Plans">
          <p>
            Vendors may list their businesses on Visit Akure under different plans (Basic, Verified, Featured). Each plan offers different levels of visibility and verification. Visit Akure reserves the right to modify plan features and pricing with reasonable notice.
          </p>
          <p>
            All listings must comply with Nigerian law and our community standards. We reserve the right to reject or remove any listing at our sole discretion.
          </p>
        </Section>

        <Section title="7. Intellectual Property">
          <p>
            All content on Visit Akure — including the platform design, brand name, logo, and original content — is the intellectual property of Visit Akure and may not be reproduced, distributed, or used without our express written permission.
          </p>
          <p>
            Vendors retain ownership of their submitted content (business names, descriptions, images) but grant Visit Akure a non-exclusive licence to display such content on the platform.
          </p>
        </Section>

        <Section title="8. Disclaimer of Warranties">
          <p>
            Visit Akure is provided &quot;as is&quot; without any warranties, express or implied. We do not guarantee uninterrupted access to the platform, the accuracy of listings, or the quality of any vendor&apos;s goods or services.
          </p>
          <p>
            Your use of the platform and any reliance on information contained therein is at your own risk.
          </p>
        </Section>

        <Section title="9. Limitation of Liability">
          <p>
            To the fullest extent permitted by law, Visit Akure shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform or any transaction with a vendor found through our platform.
          </p>
        </Section>

        <Section title="10. Governing Law">
          <p>
            These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from the use of Visit Akure shall be subject to the jurisdiction of the courts of Ondo State, Nigeria.
          </p>
        </Section>

        <Section title="11. Changes to These Terms">
          <p>
            We may update these Terms from time to time. Continued use of Visit Akure after any changes constitutes acceptance of the revised Terms. We will display the &quot;Last updated&quot; date at the top of this page.
          </p>
        </Section>

        <Section title="12. Contact Us">
          <p>If you have questions about these Terms, contact us at:</p>
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
