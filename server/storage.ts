import { Skill, Agent } from '../shared/schema';

export class Storage {
  skills: Skill[] = [];
  agents: Agent[] = [];

  constructor() {
    // seed skills
    const skillData = [
      { id: 'chain-reader', name: 'Chain Reader', category: 'On-Chain' },
      { id: 'wallet-monitor', name: 'Wallet Monitor', category: 'On-Chain' },
      { id: 'dex-scanner', name: 'DEX Scanner', category: 'On-Chain' },
      { id: 'market-data', name: 'Market Data', category: 'Intelligence' },
      { id: 'web-search', name: 'Web Search', category: 'Intelligence' },
      { id: 'api-connector', name: 'API Connector', category: 'Integration' },
      { id: 'code-interpreter', name: 'Code Interpreter', category: 'Analysis' },
      { id: 'scheduler', name: 'Scheduler', category: 'Automation' }
    ];
    this.skills = skillData;

    // seed public live agents
    const agentNames = [
      'DeFi Yield Scanner', 'NFT Sniper Bot', 'Governance Tracker',
      'Whale Alert Agent', 'Smart Contract Auditor', 'Alpha Signal Bot',
      'Token Launch Monitor', 'Portfolio Rebalancer', 'Liquidation Guardian',
      'MEV Detector', 'Airdrop Hunter', 'Bridge Monitor'
    ];
    this.agents = agentNames.map((name, idx) => ({
      id: `agent-${idx}`,
      name,
      description: `${name} description`,
      owner: `owner${idx}`,
      model: 'gpt-4o',
      skills: [],
      runs: Math.floor(Math.random() * 1000),
      status: idx % 3 === 0 ? 'online' : idx % 3 === 1 ? 'offline' : 'deploying'
    }));
  }

  getLiveAgents() {
    return this.agents;
  }
}

export const storage = new Storage();
