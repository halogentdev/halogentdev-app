import React from 'react';

export const Deployments: React.FC = () => {
  const history = Array.from({length:5}).map((_,i)=>({id:i,agent:`Agent ${i}`,status:'success'}));
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Deployments</h1>
      <table className="w-full table-auto mt-4">
        <thead>
          <tr><th>Agent</th><th>Status</th></tr>
        </thead>
        <tbody>
          {history.map(h=>(<tr key={h.id}><td>{h.agent}</td><td>{h.status}</td></tr>))}
        </tbody>
      </table>
    </div>
  );
};

export default Deployments;
