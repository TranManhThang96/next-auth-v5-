import React from 'react';
import { NavBar } from './_components/navbar';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-10 bg-sky-500">
      <NavBar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
