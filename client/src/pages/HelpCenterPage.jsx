import React from 'react';
import InfoPageLayout from './InfoPageLayout';
import { Link } from 'react-router-dom';

const HelpCenterPage = () => (
  <InfoPageLayout title="Help & Training Center">
    <p className="text-xl mb-12">
      Everything you need to know about HashNode. From getting started to advanced platform training, we've got you covered.
    </p>

    <div className="space-y-8">
      <div className="bg-glass/20 p-6 rounded-xl border border-glass">
        <h3 className="text-xl font-bold text-text-primary mb-2 flex items-center">
          <svg className="w-6 h-6 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          Getting Started
        </h3>
        <p className="text-text-secondary">
          To start your journey with HashNode, simply sign up for a free Community account. Once registered, your personal dashboard serves as your central hub. Clicking "Write" at the top will instantly open our distraction-free editor.
        </p>
      </div>

      <div className="bg-glass/20 p-6 rounded-xl border border-glass">
        <h3 className="text-xl font-bold text-text-primary mb-2 flex items-center">
          <svg className="w-6 h-6 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          Writing and Editing Training
        </h3>
        <p className="text-text-secondary">
          Our editor supports rich media embedding and markdown shortcuts. Images are automatically optimized and uploaded to secure cloud storage. All drafts are safely stored as you type to ensure you never lose your work.
        </p>
      </div>

      <div className="bg-glass/20 p-6 rounded-xl border border-glass">
        <h3 className="text-xl font-bold text-text-primary mb-2 flex items-center">
          <svg className="w-6 h-6 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
          Community Guidelines
        </h3>
        <p className="text-text-secondary">
          We curate a respectful and technically focused environment. Spam, harassment, or purely promotional content is heavily moderated. Review our <Link to="/community" className="text-accent underline">Community Guidelines</Link> before participating in active discussions.
        </p>
      </div>
    </div>

    <div className="mt-12 p-8 bg-gradient-to-r from-accent/20 to-transparent rounded-xl border border-accent/30 text-center">
      <h3 className="text-2xl font-bold mb-4">Still Need Assistance?</h3>
      <p className="mb-6">Our dedicated support staff is available 24/7 for technical training and personalized account inquiries.</p>
      <Link to="/contact" className="inline-block bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-full font-semibold transition-colors">Contact Support</Link>
    </div>
  </InfoPageLayout>
);

export default HelpCenterPage;