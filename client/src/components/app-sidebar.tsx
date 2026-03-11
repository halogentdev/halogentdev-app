import React from 'react';
import { Link } from 'wouter';

export const AppSidebar: React.FC = () => {
  return (
    <aside className="w-64 h-full glass-strong flex flex-col justify-between">
      <nav className="p-4">
        <ul className="space-y-2">
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/agents">Agents</Link></li>
          <li><Link href="/skills">Skills</Link></li>
          <li><Link href="/privacy">Privacy</Link></li>
          <li><Link href="/deployments">Deployments</Link></li>
          <li><Link href="/playground">Playground</Link></li>
        </ul>
      </nav>
      <footer className="p-4 text-sm text-center space-x-2">
        <a href="https://github.com/halogentdev" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://x.com/halogent_tech" target="_blank" rel="noreferrer">X</a>
        <a href="https://www.npmjs.com/package/halogent" target="_blank" rel="noreferrer">npm</a>
      </footer>
    </aside>
  );
};
