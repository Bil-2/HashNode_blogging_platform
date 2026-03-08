import React from 'react';
import InfoPageLayout from './InfoPageLayout';
import { Link } from 'react-router-dom';

const PricingPage = () => (
  <InfoPageLayout title="Simple, Transparent Pricing">
    <div className="text-center max-w-2xl mx-auto mb-16">
      <p className="text-xl">
        We believe in the power of free expression. Based on our extensive market research, locking knowledge behind paywalls limits potential. That's why HashNode is built differently.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* Free Tier Card */}
      <div className="bg-glass/20 border border-glass rounded-2xl p-8 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
        <h3 className="text-2xl font-bold mb-2 text-text-primary">Community Plan</h3>
        <div className="text-4xl font-extrabold mb-6">$0<span className="text-lg text-text-secondary font-normal">/forever</span></div>
        <p className="text-text-secondary mb-8 h-12">Everything you need to start sharing your voice with the world.</p>
        
        <ul className="space-y-4 mb-10 flex-grow">
          <li className="flex items-center text-text-secondary"><svg className="w-5 h-5 text-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Unlimited Blog Posts</li>
          <li className="flex items-center text-text-secondary"><svg className="w-5 h-5 text-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Rich Text Editor</li>
          <li className="flex items-center text-text-secondary"><svg className="w-5 h-5 text-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Community Comments & Likes</li>
          <li className="flex items-center text-text-secondary"><svg className="w-5 h-5 text-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Read all public articles</li>
        </ul>
        
        <Link to="/auth" className="block w-full py-4 text-center rounded-lg bg-glass border border-glass hover:bg-white/10 transition-colors font-semibold">Join for Free</Link>
      </div>

      {/* Premium Tier Placeholder (Free as well, to align with user original copy) */}
      <div className="bg-gradient-to-b from-accent/20 to-transparent border border-accent/30 rounded-2xl p-8 flex flex-col shadow-[0_0_30px_rgba(79,70,229,0.15)] transform md:-translate-y-4">
        <h3 className="text-2xl font-bold mb-2 text-text-primary">Creator Pro</h3>
        <div className="text-4xl font-extrabold mb-6">$0<span className="text-lg text-text-secondary font-normal">/forever</span></div>
        <p className="text-text-secondary mb-8 h-12">The exact same features. We really just want you to write.</p>
        
        <ul className="space-y-4 mb-10 flex-grow">
          <li className="flex items-center text-text-secondary"><svg className="w-5 h-5 text-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Everything in Community</li>
          <li className="flex items-center text-text-secondary"><svg className="w-5 h-5 text-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Zero Advertisements</li>
          <li className="flex items-center text-text-secondary"><svg className="w-5 h-5 text-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>No Hidden Fees</li>
          <li className="flex items-center text-text-secondary"><svg className="w-5 h-5 text-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Priority Support Access</li>
        </ul>
        
        <Link to="/auth" className="block w-full py-4 text-center rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors font-semibold shadow-lg shadow-accent/20">Start Writing Now</Link>
      </div>
    </div>
  </InfoPageLayout>
);

export default PricingPage;