import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <p className="text-gray-600 mb-4">Last updated: December 28, 2025</p>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing or using StatementPro ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
          <p className="text-gray-700">
            StatementPro is a web-based tool that converts bank statements and credit card statements from PDF format into spreadsheet formats (Excel, CSV) and accounting software formats (QuickBooks, Quicken). The Service uses optical character recognition (OCR) technology to extract transaction data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Accounts</h2>
          <ul className="list-disc list-inside text-gray-700 ml-4">
            <li>You must provide accurate and complete information when creating an account</li>
            <li>You are responsible for maintaining the security of your account credentials</li>
            <li>You must notify us immediately of any unauthorized use of your account</li>
            <li>You must be at least 18 years old to use this Service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Free and Paid Plans</h2>
          <p className="text-gray-700 mb-3"><strong>Free Plan:</strong></p>
          <ul className="list-disc list-inside text-gray-700 mb-3 ml-4">
            <li>Limited to 3 conversions</li>
            <li>Bank statements only</li>
          </ul>
          <p className="text-gray-700 mb-3"><strong>Pro Plan ($9/month):</strong></p>
          <ul className="list-disc list-inside text-gray-700 ml-4">
            <li>Unlimited conversions</li>
            <li>Bank statements and credit card statements</li>
            <li>Priority support</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Payment Terms</h2>
          <ul className="list-disc list-inside text-gray-700 ml-4">
            <li>Paid subscriptions are billed monthly</li>
            <li>Payments are processed securely through Stripe</li>
            <li>You may cancel your subscription at any time</li>
            <li>Refunds are provided on a case-by-case basis within 30 days of purchase</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Acceptable Use</h2>
          <p className="text-gray-700 mb-3">You agree NOT to:</p>
          <ul className="list-disc list-inside text-gray-700 ml-4">
            <li>Upload documents you do not have the right to access</li>
            <li>Use the Service for any illegal purpose</li>
            <li>Attempt to reverse engineer or hack the Service</li>
            <li>Share your account with others</li>
            <li>Use automated tools to access the Service</li>
            <li>Upload malicious files or content</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Data Accuracy Disclaimer</h2>
          <p className="text-gray-700">
            While we strive for high accuracy in our conversions, OCR technology is not perfect. <strong>You are responsible for verifying the accuracy of converted data before using it for financial, tax, or legal purposes.</strong> StatementPro is not liable for any errors in the extracted data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Intellectual Property</h2>
          <p className="text-gray-700">
            The Service, including its design, features, and content, is owned by StatementPro and protected by copyright and other intellectual property laws. You retain ownership of the documents you upload and the converted outputs.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Limitation of Liability</h2>
          <p className="text-gray-700">
            To the maximum extent permitted by law, StatementPro shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising from your use of the Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Service Availability</h2>
          <p className="text-gray-700">
            We strive to maintain high availability but do not guarantee uninterrupted access to the Service. We may perform maintenance or updates that temporarily affect availability.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Termination</h2>
          <p className="text-gray-700">
            We reserve the right to suspend or terminate your account if you violate these Terms. You may also delete your account at any time by contacting support.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Changes to Terms</h2>
          <p className="text-gray-700">
            We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the new Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Governing Law</h2>
          <p className="text-gray-700">
            These Terms are governed by the laws of the United States. Any disputes shall be resolved in the courts of New York, NY.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">14. Contact</h2>
          <p className="text-gray-700">
            For questions about these Terms, contact us at:
            <br />
            <a href="mailto:support@statementpro.net" className="text-emerald-600 hover:text-emerald-700">
              support@statementpro.net
            </a>
          </p>
        </section>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <a href="/" className="text-emerald-600 hover:text-emerald-700 font-medium">
            ← Back to StatementPro
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
