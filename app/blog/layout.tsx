import * as React from 'react';
import { ThemeToggle } from '../components/dashboard/ThemeToggel';
import BlackButton from '../components/BackButton';

export interface IBolgLayoutProps {
    children: React.ReactNode;
}

export default function BolgLayout({ children }: IBolgLayoutProps) {
  return (
    <>
    <nav className=" w-full flex items-center justify-end border-b bg-muted/40 px-4 py-3 lg:px-6">
      <ThemeToggle/>
    </nav>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">

      {children}
    </main>
    </>
  );
}
