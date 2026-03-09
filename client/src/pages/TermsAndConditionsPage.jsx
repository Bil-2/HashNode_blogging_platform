import React from 'react';
import InfoPageLayout from './InfoPageLayout';

const TermsAndConditionsPage = () => (
    <InfoPageLayout title="Terms & Conditions">
        <p className="lead mb-8">
            These terms and conditions outline the rules and regulations for the use of HashNode&apos;s Website and Platform. 
            By accessing this website we assume you accept these terms and conditions in full.
        </p>

        <h3 className="text-2xl mt-8 mb-4">1. Acceptance of Terms</h3>
        <p>
            By accessing and using HashNode, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. We reserve the right to modify these terms at any time.
        </p>

        <h3 className="text-2xl mt-8 mb-4">2. User Conduct & Content Standards</h3>
        <p>
            You are solely responsible for the content you post. You agree not to post content that is unlawful, harmful, threatening, abusive, defamatory, or otherwise objectionable. We operate a zero-tolerance policy towards harassment. We reserve the right to suspend accounts and remove any content that violates these terms without prior notice.
        </p>

        <h3 className="text-2xl mt-8 mb-4">3. Intellectual Property Rights</h3>
        <p>
            You retain absolute ownership of the content you create and post on HashNode. By posting, you grant us a worldwide, non-exclusive, royalty-free license strictly to use, reproduce, and distribute your content on and through our platform for the sole purpose of displaying it to our readers.
        </p>
    </InfoPageLayout>
);

export default TermsAndConditionsPage;