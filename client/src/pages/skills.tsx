import React from 'react';

const categories = {
  'On-Chain': ['Chain Reader','Wallet Monitor','DEX Scanner'],
  'Intelligence': ['Market Data','Web Search'],
  'Integration': ['API Connector'],
  'Analysis': ['Code Interpreter'],
  'Automation': ['Scheduler']
};

export const Skills: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Skills</h1>
      {Object.entries(categories).map(([cat, skills]) => (
        <div key={cat} className="mt-4">
          <h2 className="font-semibold">{cat}</h2>
          <ul className="space-y-2">
            {skills.map(s => (
              <li key={s} className="flex justify-between items-center">
                {s} <input type="checkbox" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Skills;
