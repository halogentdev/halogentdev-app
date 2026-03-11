// @ts-nocheck
import React, { useState } from 'react';

export const Agents: React.FC = () => {
  const [spawnOpen, setSpawnOpen] = useState(false);
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Agents</h1>
      <button onClick={() => setSpawnOpen(true)} className="btn btn-primary mt-4">Spawn New Agent</button>
      {spawnOpen && (
        <div className="glass-card mt-4 p-4">
          <p>Step 1: name/model/privacy</p>
          <p>Step 2: toggle skills</p>
          <p>Step 3: confirm</p>
          <button onClick={() => setSpawnOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Agents;
