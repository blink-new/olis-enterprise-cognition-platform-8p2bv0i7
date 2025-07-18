import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Brain, 
  Database, 
  Cpu, 
  Shield, 
  CheckCircle, 
  Network, 
  Zap,
  FileText,
  Upload
} from 'lucide-react';

const navigationItems = [
  { path: '/', label: 'Technical Blueprint', icon: FileText },
  { path: '/architecture', label: 'System Architecture', icon: Network },
  { path: '/document-ingestion', label: 'Document Ingestion', icon: Upload },
  { path: '/memory-schema', label: 'Memory Schema', icon: Database },
  { path: '/cognition-engine', label: 'Cognition Engine', icon: Brain },
  { path: '/security', label: 'Security Model', icon: Shield },
  { path: '/validation', label: 'Validation Flow', icon: CheckCircle },
  { path: '/federated-learning', label: 'Federated Learning', icon: Cpu },
  { path: '/surfacing-logic', label: 'Surfacing Logic', icon: Zap },
];

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-semibold text-white">Olis</span>
            <span className="text-sm text-slate-400">Enterprise Cognition Infrastructure</span>
          </div>
          
          <div className="flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}