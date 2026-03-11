// @ts-nocheck
import React from 'react';

const steps = [
  "Install CLI (npm install -g halogent)",
  "Create agent via dashboard Agent Builder",
  "Get API key (hlg_live_ prefix)",
  "Authenticate CLI",
  "Pull and start agent",
  "View terminal dashboard"
];

export const Install: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Install Guide</h1>
      <ol className="list-decimal list-inside mt-4 space-y-2">
        {steps.map((s,i) => <li key={i}>{s}</li>)}
      </ol>
    </div>
  );
};

export default Install;
