import React from 'react';
import { LayoutDashboard, Megaphone, FolderKanban, Plug2, Settings, BrainCircuit } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center w-full px-4 py-3 text-sm font-medium transition-colors rounded-lg group",
      active 
        ? "bg-brand-primary/10 text-brand-primary" 
        : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
    )}
  >
    <Icon className={cn("w-5 h-5 mr-3 transition-colors", active ? "text-brand-primary" : "text-slate-500 group-hover:text-slate-300")} />
    {label}
  </button>
);

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-bg-surface border-r border-slate-700/50 flex flex-col">
      <div className="p-6 flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
          <BrainCircuit className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-white">ADMA</span>
      </div>

      <div className="flex-1 px-3 py-4 space-y-1">
        <NavItem 
          icon={LayoutDashboard} 
          label="Dashboard" 
          active={activePage === 'dashboard'} 
          onClick={() => onNavigate('dashboard')} 
        />
        <NavItem 
          icon={Megaphone} 
          label="Campaigns" 
          active={activePage === 'campaigns'} 
          onClick={() => onNavigate('campaigns')} 
        />
        <NavItem 
          icon={FolderKanban} 
          label="Assets Library" 
          active={activePage === 'assets'} 
          onClick={() => onNavigate('assets')} 
        />
        <NavItem 
          icon={Plug2} 
          label="Integrations" 
          active={activePage === 'integrations'} 
          onClick={() => onNavigate('integrations')} 
        />
      </div>

      <div className="p-4 border-t border-slate-700/50">
        <NavItem 
          icon={Settings} 
          label="Settings" 
          active={activePage === 'settings'} 
          onClick={() => onNavigate('settings')} 
        />
      </div>
    </aside>
  );
};