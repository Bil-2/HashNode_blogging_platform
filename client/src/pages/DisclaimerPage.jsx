import React from 'react';
import InfoPageLayout from './InfoPageLayout';

const DisclaimerPage = () => (
    <InfoPageLayout title="Platform Disclaimer">
        <p className="lead mb-8 border-l-4 border-accent pl-6 text-xl">
            The information contained on HashNode is for general information and educational purposes only.
        </p>

        <h3 className="text-2xl mt-8 mb-4">Content Liability</h3>
        <p>
            The views and opinions expressed on the blogs hosted on HashNode are strictly those of the authors and do not necessarily reflect the official policy or position of HashNode. Any content provided by our bloggers or authors is of their own opinion and is not intended to malign any religion, ethnic group, club, organization, company, or individual.
        </p>

        <h3 className="text-2xl mt-8 mb-4">Accuracy of Information</h3>
        <p>
            While we strive to keep the information up to date and correct, HashNode makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website.
        </p>
        
        <h3 className="text-2xl mt-8 mb-4">External Links</h3>
        <p>
            Through this website, you are able to link to other websites which are not under the control of HashNode. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
        </p>
    </InfoPageLayout>
);

export default DisclaimerPage;