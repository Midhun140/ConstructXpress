import React from 'react';
import { MainTab } from '../types';
import { Truck, Package, Wrench, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface TabNavigationProps {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  counts: Record<MainTab, number>;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  counts,
}) => {
  const tabs: { id: MainTab; label: string; sub: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'vehicles',
      label: 'Vehicles & Heavy Fleet',
      sub: 'JCBs, Cranes, Excavators & Dumpers',
      icon: <Truck className="w-5 h-5" />,
      color: 'text-amber-400',
    },
    {
      id: 'materials',
      label: 'Construction Materials',
      sub: 'Cement, Sand, Rebar & Ready-Mix',
      icon: <Package className="w-5 h-5" />,
      color: 'text-orange-400',
    },
    {
      id: 'tools',
      label: 'Tools & Industrial Gear',
      sub: 'Demolition Hammers, Saws & Safety',
      icon: <Wrench className="w-5 h-5" />,
      color: 'text-yellow-400',
    },
  ];

  return (
    <div className="w-full bg-[#0d131f] border-y border-slate-800 py-3 px-4 shadow-xl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative group flex items-center gap-3.5 p-3.5 rounded-2xl text-left transition-all duration-300 border ${
                  isActive
                    ? 'bg-slate-900 border-amber-500/70 text-white shadow-lg glow-amber'
                    : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                {/* Animated Background Pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 rounded-2xl pointer-events-none"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Icon Container */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 font-bold shadow-md'
                      : 'bg-slate-900 text-slate-300 border border-slate-700/60'
                  }`}
                >
                  {tab.icon}
                </div>

                {/* Text Labels */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`font-display font-bold text-sm md:text-base tracking-tight truncate ${
                        isActive ? 'text-white' : 'text-slate-200'
                      }`}
                    >
                      {tab.label}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                        isActive
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {counts[tab.id]} Items
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{tab.sub}</p>
                </div>

                {/* Speed indicator dot */}
                <div className="shrink-0 flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950/50 border border-emerald-800/50 px-2 py-1 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>45m</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
