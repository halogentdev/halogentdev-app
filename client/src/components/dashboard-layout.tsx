import React from 'react';

interface Props {
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
  userEmail?: string;
}

export const DashboardLayout: React.FC<Props> = ({ children, breadcrumb, userEmail }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass-nav flex justify-between items-center p-4">
        <div>{breadcrumb}</div>
        <div className="text-sm">{userEmail || ''}</div>
      </header>
      <div className="flex flex-1">
        {children}
      </div>
      <footer className="text-center p-4 text-xs glass">
        v1.3.1
      </footer>
    </div>
  );
};
