import React from 'react';

const PrivacyPolicy = () => {
    const today = new Date();
    // Format the date as "Month Day, Year"
    const formattedDate = today.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
                    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Introduction</h2>
                        <p>
                            At GPTS Prompt, we respect your privacy. This policy outlines the types of personal information we collect, how it&apos;s used, and your choices regarding your data.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Information Collected</h2>
                        <ul>
                            <li>
                                <strong>Information you provide:</strong> Contact details (name, email), comments, or other data you give us.
                            </li>
                            <li>
                                <strong>Usage data:</strong> IP address, device/browser information, pages visited, actions taken on our site.
                            </li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
                        <ul>
                            <li>Improve our website and services.</li>
                            <li>Communicate with you (if you provide consent).</li>
                            <li>Analyze usage trends (in an anonymized manner).</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Third-Party Sharing</h2>
                        <p>We may share data with analytics providers (e.g., Google Analytics) to help us understand website usage.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Your Data Rights</h2>
                        <p>You may have rights to access, correct, or request the erasure of your information. Contact us at [your email] for such requests.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Children&apos;s Privacy</h2>
                        <p>Our website is not intended for children under 13. We do not knowingly collect data from children under this age.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Policy Updates</h2>
                        <p>We may update this policy. Changes will be posted here with the effective date.</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Contact</h2>
                        <p>Questions? Contact us at basavaraja@heyidb.com.</p>
                    </section>

                    <p className="text-sm text-gray-600">Effective Date: 17 February 2024</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
