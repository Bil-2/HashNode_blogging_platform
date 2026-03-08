import React from 'react';
import InfoPageLayout from './InfoPageLayout';
import { Link } from 'react-router-dom';

const CommunityPage = () => (
  <InfoPageLayout title="Join Our Ecosystem">
    <div className="mb-10">
      <p className="text-xl leading-relaxed text-text-secondary border-l-4 border-accent pl-6">
        HashNode is more than just a publishing tool; it is a vibrant digital ecosystem of engineers, 
        designers, researchers, and thinkers from across the globe. We build, share, and train together.
      </p>
    </div>

    <h2 className="text-3xl font-bold mt-12 mb-6 text-text-primary">Our Code of Conduct</h2>
    <div className="space-y-4">
      <div className="flex bg-glass/20 p-5 rounded-lg border border-glass">
        <div className="text-accent text-2xl font-black mr-4">01</div>
        <div>
          <h4 className="font-bold text-lg text-text-primary">Foster Constructive Dialogue</h4>
          <p className="text-text-secondary">We encourage respectful, critical, and rigorous discussions. Feedback should always focus on the ideas, not the individual.</p>
        </div>
      </div>
      <div className="flex bg-glass/20 p-5 rounded-lg border border-glass">
        <div className="text-accent text-2xl font-black mr-4">02</div>
        <div>
          <h4 className="font-bold text-lg text-text-primary">Share Open Knowledge</h4>
          <p className="text-text-secondary">Our core philosophy is mutual growth. Share your code, your research data, and your design files whenever you safely can.</p>
        </div>
      </div>
      <div className="flex bg-glass/20 p-5 rounded-lg border border-glass">
        <div className="text-accent text-2xl font-black mr-4">03</div>
        <div>
          <h4 className="font-bold text-lg text-text-primary">Zero Tolerance for Harassment</h4>
          <p className="text-text-secondary">We maintain a strictly professional environment. Any form of discrimination or trolling will result in immediate account termination.</p>
        </div>
      </div>
    </div>

    <div className="mt-16 text-center">
      <h2 className="text-2xl font-bold mb-6">Ready to join the discussion?</h2>
      <div className="flex justify-center space-x-4">
        <Link to="/explore-blogs" className="px-8 py-3 bg-accent text-white rounded-full font-semibold hover:bg-accent-hover transition-colors">Read Top Articles</Link>
        <Link to="/auth" className="px-8 py-3 bg-glass border border-glass text-text-primary rounded-full font-semibold hover:bg-white/10 transition-colors">Create Account</Link>
      </div>
    </div>
  </InfoPageLayout>
);

export default CommunityPage;