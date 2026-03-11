import React, { useState } from 'react';
import { useParams } from 'wouter';

export const AgentDetail: React.FC = () => {
  const [tab, setTab] = useState('overview');
  const { id } = useParams<{id:string}>();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Agent {id}</h1>
      <div className="space-x-4">
        {['overview','config','runs','deployments'].map(t=>(
          <button key={t} onClick={()=>setTab(t)} className="btn btn-sm">{t}</button>
        ))}
      </div>
      <div className="mt-4">
        {tab === 'overview' && <div>Overview content</div>}
        {tab === 'config' && <div>Config content <button className="btn btn-xs">Deploy</button></div>}
        {tab === 'runs' && <div>Runs list</div>}
        {tab === 'deployments' && <div>Deployments list</div>}
      </div>
    </div>
  );
};

export default AgentDetail;
