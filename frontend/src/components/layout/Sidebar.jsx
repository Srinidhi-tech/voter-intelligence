import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  Vote, 
  UserSearch, 
  MapPin, 
  Scale, 
  BarChart4, 
  ShieldAlert, 
  Gavel 
} from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { path: '/registration', icon: FileText, labelKey: 'nav.registration' },
  { path: '/evm-vvpat', icon: Vote, labelKey: 'nav.evm' },
  { path: '/candidate-intel', icon: UserSearch, labelKey: 'nav.candidate' },
  { path: '/polling-day', icon: MapPin, labelKey: 'nav.polling' },
  { path: '/voter-rights', icon: Scale, labelKey: 'nav.rights' },
  { path: '/results', icon: BarChart4, labelKey: 'nav.results' },
  { path: '/fact-check', icon: ShieldAlert, labelKey: 'nav.fact_check' },
  { path: '/complaints', icon: Gavel, labelKey: 'nav.complaints' },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
  const { t } = useTranslation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-democracy-dark border-r border-democracy-slate flex flex-col transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center h-20 border-b border-democracy-slate px-6">
          <h1 className="text-xl font-bold text-democracy-gold tracking-wider">
            VOTER INTELLIGENCE
          </h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-democracy-accent/10 text-democracy-accent font-medium' 
                      : 'text-democracy-light/70 hover:bg-democracy-slate/50 hover:text-democracy-light'
                  }`
                }
                onClick={() => {
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-democracy-accent' : 'text-democracy-light/50 group-hover:text-democracy-light'}`} />
                    <span className="truncate">{t(item.labelKey)}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-democracy-slate">
          <div className="flex items-center gap-3 px-4 py-3 bg-democracy-slate/30 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-democracy-accent/20 flex items-center justify-center text-democracy-accent font-bold">
              VI
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-democracy-light truncate">{t('nav.citizen_portal')}</p>
              <p className="text-xs text-democracy-light/50 truncate">{t('nav.democracy_edition')}</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
