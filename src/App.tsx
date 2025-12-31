import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { TopBar } from './components/Layout/TopBar';
import { Dashboard } from './pages/Dashboard';

// Simple page router for demo purposes
const App: React.FC = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'campaigns':
        return (
          <div className="p-8 flex items-center justify-center h-full text-slate-500">
            Campaign Management Module Loading...
          </div>
        );
      case 'assets':
        return (
          <div className="p-8 flex items-center justify-center h-full text-slate-500">
             Asset Library Module Loading...
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-main text-text-primary">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      
      <div className="ml-64 min-h-screen flex flex-col">
        <TopBar />
        
        <main className="flex-1 bg-gradient-to-b from-bg-main to-[#0B1121]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;