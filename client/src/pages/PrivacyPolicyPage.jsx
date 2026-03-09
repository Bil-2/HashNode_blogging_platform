import React from 'react';
import InfoPageLayout from './InfoPageLayout';

const PrivacyPolicyPage = () => (
    <InfoPageLayout title="Privacy Policy">
        <p className="lead mb-8">
            Your privacy is critically important to us. At HashNode, we have a few fundamental principles that guide our approach to respecting your privacy and protecting your personal data.
        </p>

        <h3 className="text-2xl mt-8 mb-4">1. Information We Collect</h3>
        <p>
            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your complete knowledge and active consent. We also let you know precisely why we&apos;re collecting it and how it will be used. 
        </p>
        <ul className="list-disc pl-6 mb-6">
            <li><strong>Account Data:</strong> Name, email address, and authentication credentials.</li>
            <li><strong>Content Data:</strong> Articles, comments, and media you voluntarily publish.</li>
            <li><strong>Technical Data:</strong> Standard server logs and minimal browsing telemetry to ensure platform stability.</li>
        </ul>

        <h3 className="text-2xl mt-8 mb-4">2. How We Use Your Information</h3>
        <p>
            We use the information we collect to operate, maintain, and provide the features and functionality of the Service, to correspond with you regarding administrative updates, and to address your support inquiries. We never sell your personal data to third-party data brokers.
        </p>

        <h3 className="text-2xl mt-8 mb-4">3. Security Standards</h3>
        <p>
            We are committed to protecting your data utilizing modern encryption and secure server architecture. We use commercially acceptable means to protect your personal information, though we must remind users that no method of transmission over the Internet or method of electronic storage is 100% secure.
        </p>
    </InfoPageLayout>
);

export default PrivacyPolicyPage;