// @ts-nocheck
import React from 'react';

export const Docs: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Documentation</h1>
      <section>
        <h2>01 Agent Builder</h2>
        <p>Details on building agents.</p>
      </section>
      <section>
        <h2>02 Skill System</h2>
        <p>On-Chain Skills (Solana/Raydium/Jupiter), Intelligence Skills, Automation Skills, Analysis Skills, Knowledge Skills.</p>
      </section>
      <section>
        <h2>03 Privacy Control</h2>
      </section>
      <section>
        <h2>04 Agent Playground</h2>
      </section>
      <section>
        <h2>05 Deployment System</h2>
        <p>Docker Container, Bare Metal/VPS, Local Runtime.</p>
      </section>
      <section>
        <h2>06 Agent Monitoring</h2>
      </section>
      <section>
        <h2>07 Secret Manager</h2>
      </section>
      <section>
        <h2>08 Model Routing</h2>
        <p>30+ models supported.</p>
      </section>
      <section>
        <h2>09-12 Developer Sections</h2>
        <p>CLI reference, API docs.</p>
      </section>
      <section>
        <h2>13 Agent Templates</h2>
        <ul>
          <li>DeFi Yield Scanner</li>
          <li>Whale Wallet Tracker</li>
          <li>MEV Detector</li>
          <li>Token Launch Sniper</li>
          <li>Portfolio Rebalancer</li>
          <li>Airdrop Scanner</li>
          <li>Smart Contract Auditor</li>
          <li>Governance Tracker</li>
        </ul>
      </section>
      <section>
        <h2>14 Privacy Report</h2>
      </section>
    </div>
  );
};

export default Docs;
