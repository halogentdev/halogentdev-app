// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';

interface PublicAgent {
  id: string;
  name: string;
  description: string;
  owner: string;
  model: string;
  skills: string[];
  runs: number;
  status: 'online' | 'offline' | 'deploying';
}

export const Landing: React.FC = () => {
  const [agents, setAgents] = useState<PublicAgent[]>([]);

  useEffect(() => {
    fetch('/api/public/live-agents')
      .then(r => r.json())
      .then(setAgents)
      .catch(console.error);
  }, []);

  return (
    <div>
      <nav className="glass-nav flex justify-between items-center">
        <div className="text-xl font-bold gradient-text-brand">Halogent</div>
        <div className="space-x-4">
          <Link href="/docs">Docs</Link>
          <Link href="/install">Install</Link>
          <a href="https://github.com/halogentdev" target="_blank">GitHub</a>
          <a href="https://x.com/halogent_tech" target="_blank">X</a>
          <a href="https://www.npmjs.com/package/halogent" target="_blank">npm</a>
          <Link href="/login" className="btn btn-primary">Get Started</Link>
        </div>
      </nav>
      <header className="text-center py-20">
        <h1 className="text-5xl font-bold gradient-text">Build & Operate Private AI Agents</h1>
        <p className="mt-4">Privacy-first control plane on Solana</p>
      </header>
      <div className="overflow-hidden whitespace-nowrap bg-gray-800 py-2">
        <div className="inline-block animate-marquee">
          {['DeFi Yield Scanner','Whale Tracker','MEV Detector','Token Sniper','Portfolio Rebalancer','Airdrop Hunter','Liquidation Guard','Contract Auditor'].map((t,i)=>(
            <span key={i} className="mx-8">{t} <span className="dot-online"></span></span>
          ))}
        </div>
      </div>
      <section className="px-8">
        <h2 className="text-xl font-semibold mb-2">Live Agents</h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th>Status</th>
              <th>Name</th>
              <th>Description</th>
              <th>Owner</th>
              <th>Model</th>
              <th>Skills</th>
              <th>Runs</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(a => (
              <tr key={a.id}>
                <td><span className={`dot-${a.status}`}></span></td>
                <td>{a.name}</td>
                <td>{a.description}</td>
                <td>{a.owner}</td>
                <td>{a.model}</td>
                <td>{a.skills.join(', ')}</td>
                <td>{a.runs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="px-8 py-10">
        <h2 className="text-2xl font-bold">Features</h2>
        <div className="grid grid-cols-2 gap-6 mt-4">
          {['Agent Builder','Privacy Engine','Modular Skills','Self-Hosted Deploy','Playground','Alpha Protection'].map(f => (
            <div key={f} className="glass-card">{f}</div>
          ))}
        </div>
      </section>
      <section className="px-8 py-10">
        <h2 className="text-2xl font-bold">Privacy</h2>
        <pre className="bg-gray-900 p-4 rounded">halogent.config = {{ privacy: 'strict', logging: false }}</pre>
      </section>
      <footer className="text-center py-4 glass-nav">
        v1.3.1
      </footer>
    </div>
  );
};

export default Landing;
