// @ts-nocheck
import React from 'react';
import { useAuth } from '@privy-io/react-auth';

export const Login: React.FC = () => {
  const { login } = useAuth();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="glass-card">
        <h2 className="text-2xl font-bold mb-4">Sign in with email</h2>
        <button onClick={() => login()} className="btn btn-primary">Log in</button>
      </div>
    </div>
  );
};

export default Login;
