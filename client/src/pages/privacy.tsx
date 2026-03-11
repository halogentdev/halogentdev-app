import React, { useState } from 'react';

export const Privacy: React.FC = () => {
  const [score, setScore] = useState(75);
  const [promptLog, setPromptLog] = useState(false);
  const [memoryMode, setMemoryMode] = useState<'local'|'hosted'>('local');
  const [secretOwner, setSecretOwner] = useState<'user'|'server'>('user');
  const [telemetry, setTelemetry] = useState(false);

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Privacy</h1>
      <div>Score: {score}</div>
      <div>
        <label><input type="checkbox" checked={promptLog} onChange={()=>setPromptLog(!promptLog)} /> Prompt Logging</label>
      </div>
      <div>
        Memory Mode: <select value={memoryMode} onChange={e=>setMemoryMode(e.target.value as any)}>
          <option value="local">Local</option>
          <option value="hosted">Hosted</option>
        </select>
      </div>
      <div>
        Secret Ownership: <select value={secretOwner} onChange={e=>setSecretOwner(e.target.value as any)}>
          <option value="user">User</option>
          <option value="server">Server</option>
        </select>
      </div>
      <div>
        <label><input type="checkbox" checked={telemetry} onChange={()=>setTelemetry(!telemetry)} /> Telemetry</label>
      </div>
      <div>
        Model Allowlist: <textarea className="w-full h-24 bg-gray-800"></textarea>
      </div>
    </div>
  );
};

export default Privacy;
