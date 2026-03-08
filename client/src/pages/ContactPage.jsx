import React from 'react';
import InfoPageLayout from './InfoPageLayout';
import Button from '../components/common/Button';

const ContactPage = () => (
  <InfoPageLayout title="Contact & Support">
    <div className="grid lg:grid-cols-2 gap-12">
      <div>
        <h2 className="text-3xl font-bold mb-6">Let's start a conversation.</h2>
        <p className="text-lg text-text-secondary mb-8">
          Whether you're looking for market research insights, specific platform training, or have a technical question, our dedicated team is here to provide crystal-clear solutions.
        </p>

        <div className="space-y-6">
          <div className="flex items-start space-x-4 bg-glass/30 p-6 rounded-lg border border-glass">
            <div className="text-accent mt-1">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary">General Inquiries</h4>
              <p className="text-text-secondary mt-1">hello@hashnode-blog.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 bg-glass/30 p-6 rounded-lg border border-glass">
            <div className="text-accent mt-1">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary">Press & Partnerships</h4>
              <p className="text-text-secondary mt-1">partners@hashnode-blog.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-glass/20 p-8 rounded-xl border border-glass">
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">Full Name</label>
              <input type="text" name="name" id="name" placeholder="John Doe" required className="w-full px-4 py-3 border border-glass bg-background/50 text-text-primary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all placeholder:text-text-secondary/50" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">Email Address</label>
              <input type="email" name="email" id="email" placeholder="john@example.com" required className="w-full px-4 py-3 border border-glass bg-background/50 text-text-primary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all placeholder:text-text-secondary/50" />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">How can we help?</label>
            <input type="text" name="subject" id="subject" placeholder="Training request, general question..." required className="w-full px-4 py-3 border border-glass bg-background/50 text-text-primary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all placeholder:text-text-secondary/50" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">Message</label>
            <textarea name="message" id="message" rows="5" placeholder="Tell us more about your inquiry..." required className="w-full px-4 py-3 border border-glass bg-background/50 text-text-primary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-none placeholder:text-text-secondary/50"></textarea>
          </div>
          <div className="pt-2">
            <Button type="submit" className="w-full py-4 text-lg">Send Message</Button>
          </div>
        </form>
      </div>
    </div>
  </InfoPageLayout>
);

export default ContactPage;