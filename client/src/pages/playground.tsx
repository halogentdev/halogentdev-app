import React, { useState } from 'react';

export const Playground: React.FC = () => {
  const [agent, setAgent] = useState<string>('');
  const [messages, setMessages] = useState<{from:'user'|'agent',text:string}[]>([]);
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Playground</h1>
      <div className="mt-4">
        <label>Agent: <input value={agent} onChange={e=>setAgent(e.target.value)} className="bg-gray-800" /></label>
      </div>
      <div className="mt-4 bg-gray-900 p-4 h-64 overflow-auto">
        {messages.map((m,i)=><div key={i}><strong>{m.from}:</strong> {m.text}</div>)}
      </div>
      <div className="mt-2">
        <input type="text" className="bg-gray-800 w-full" onKeyDown={e=>{if(e.key==='Enter'){setMessages([...messages,{from:'user',text:e.currentTarget.value}]);e.currentTarget.value='';}}} />
      </div>
    </div>
  );
};

export default Playground;
