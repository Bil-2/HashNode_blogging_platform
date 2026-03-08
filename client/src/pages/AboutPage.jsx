import React from 'react';
import InfoPageLayout from './InfoPageLayout';

const AboutPage = () => (
  <InfoPageLayout title="About HashNode">
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold mb-4">Pioneering the Future of Digital Publishing</h2>
        <p className="text-xl leading-relaxed">
          Welcome to HashNode, a modern blogging platform where crystal-clear ideas shine and powerful voices are heard. 
          Through extensive market research and rigorous training analysis, our mission is to provide a meticulously 
          crafted, intuitive, and visually stunning space for writers, tech professionals, and readers alike.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8 my-12">
        <div className="bg-glass/30 border border-glass p-8 rounded-xl hover:bg-glass/50 transition-colors">
          <div className="text-accent mb-4">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
          <p className="text-text-secondary">
            Built on the foundational principles of minimalism and high-performance engineering, HashNode leverages 
            a striking glassmorphism design system to create an experience that is both beautiful and highly functional.
          </p>
        </div>
        
        <div className="bg-glass/30 border border-glass p-8 rounded-xl hover:bg-glass/50 transition-colors">
          <div className="text-accent mb-4">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-3">Global Training & Reach</h3>
          <p className="text-text-secondary">
            We envision a borderless digital world where market insights, technical training, and personal narratives 
            flow freely. From seasoned industry authors to first-time developers, HashNode is engineered to scale.
          </p>
        </div>
      </div>

      <section className="bg-gradient-to-r from-accent/20 to-transparent p-8 rounded-xl border-l-4 border-accent">
        <h3 className="text-2xl font-bold mb-4">The Crystal Clear Promise</h3>
        <p>
          We believe that a great story deserves a phenomenal stage. We are committed to maintaining an ad-free, 
          clutter-free environment. Your data is respected, your content is highlighted, and your readership is 
          guaranteed a premium, distraction-free environment.
        </p>
      </section>
    </div>
  </InfoPageLayout>
);

export default AboutPage;