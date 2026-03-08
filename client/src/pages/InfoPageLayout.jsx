import React from 'react';

const InfoPageLayout = ({ title, children }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 reveal-on-scroll">
        <div className="bg-glass backdrop-blur-md rounded-xl shadow-lg border border-glass p-8 sm:p-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-10 tracking-tight border-b border-glass pb-6">
                {title}
            </h1>
            <div className="prose prose-lg max-w-none text-text-secondary prose-headings:text-text-primary prose-a:text-indigo-400 prose-strong:text-text-primary">
                {children}
            </div>
        </div>
    </div>
  );
};

export default InfoPageLayout;