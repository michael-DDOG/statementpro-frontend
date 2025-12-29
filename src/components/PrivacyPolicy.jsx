import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-4">Last updated: December 28, 2025</p>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
          <p className="text-gray-700 mb-3">
            StatementPro ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our bank statement conversion service at statementpro.net.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
          <p className="text-gray-700 mb-3"><strong>Account Information:</strong></p>
          <ul className="list-disc list-inside text-gray-700 mb-3 ml-4">
            <li>Email address</li>
            <li>Name (optional)</li>
            <li>Password (encrypted)</li>
          </ul>
          <p className="text-gray-700 mb-3"><strong>Uploaded Documents:</strong></p>
          <ul className="list-disc list-inside text-gray-700 mb-3 ml-4">
            <li>Bank statements and credit card statements you upload for conversion</li>
            <li>These files are automatically deleted within 24 hours</li>
          </ul>
          <p className="text-gray-700 mb-3"><strong>Usage Data:</strong></p>
          <ul className="list-disc list-inside text-gray-700 ml-4">
            <li>Number of conversions performed</li>
            <li>Browser type and device information</li>
            <li>IP address (for security purposes)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-700 ml-4">
            <li>To provide the bank statement conversion service</li>
            <li>To manage your account and track usage limits</li>
            <li>To process payments (via Stripe)</li>
            <li>To improve our service</li>
            <li>To communicate with you about your account</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Security</h2>
          <p className="text-gray-700 mb-3">
            We take data security seriously:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4">
            <li><strong>256-bit SSL encryption</strong> for all data transfers</li>
            <li><strong>Automatic deletion</strong> of uploaded files within 24 hours</li>
            <li><strong>We never store</strong> your complete bank statement data permanently</li>
            <li><strong>Passwords are hashed</strong> using industry-standard encryption</li>
            <li><strong>Payment processing</strong> is handled securely by Stripe</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Sharing</h2>
          <p className="text-gray-700 mb-3">
            We do not sell, trade, or rent your personal information to third parties. We may share data only with:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-4">
            <li><strong>Stripe</strong> - for payment processing</li>
            <li><strong>AWS</strong> - for secure cloud infrastructure</li>
            <li><strong>Law enforcement</strong> - if required by law</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights</h2>
          <p className="text-gray-700 mb-3">You have the right to:</p>
          <ul className="list-disc list-inside text-gray-700 ml-4">
            <li>Access your personal data</li>
            <li>Request deletion of your account</li>
            <li>Export your data</li>
            <li>Opt out of marketing communications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Cookies</h2>
          <p className="text-gray-700">
            We use essential cookies to maintain your login session and remember your preferences. We also use Google Analytics to understand how users interact with our service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to This Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;
