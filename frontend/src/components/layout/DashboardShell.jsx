import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import LanguageBar from './LanguageBar';
import { Menu, X } from 'lucide-react';

export default function DashboardShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Auto-close sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-democracy-dark">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Language Bar injected globally */}
        <LanguageBar />

        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-democracy-slate bg-democracy-dark/80 backdrop-blur-md z-30">
          <h1 className="text-lg font-bold text-democracy-gold">VOTER INTELLIGENCE</h1>
          <button 
            onClick={toggleSidebar}
            className="p-2 -mr-2 text-democracy-light hover:bg-democracy-slate rounded-lg"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
