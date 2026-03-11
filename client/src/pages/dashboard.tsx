// @ts-nocheck
import React from 'react';

export const Dashboard: React.FC = () => {
  // dummy stats
  const stats = { agents: 120, active: 37, skills: 24, deployments: 12, runs: 893, privacy: 92 };
  const active = Array.from({ length: 4 }).map((_,i)=>({id:i,name:`Agent ${i}`}));
  const recent = Array.from({ length: 5 }).map((_,i)=>({id:i,agent:`Agent ${i}`,status:'success'}));

  return (
    <div className="p-8 flex-1 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {Object.entries(stats).map(([k,v]) => (
          <div key={k} className="glass-card text-center">
            <div className="text-lg font-semibold">{k}</div>
            <div className="text-2xl">{v}</div>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-semibold">Active Agents</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {active.map(a => (
          <div key={a.id} className="glass-card">{a.name}</div>
        ))}
      </div>
      <h2 className="text-xl font-semibold">Recent Runs</h2>
      <ul className="list-disc list-inside">
        {recent.map(r => (
          <li key={r.id}>{r.agent}: {r.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
