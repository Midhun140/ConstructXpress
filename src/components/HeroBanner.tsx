import React, { useState, useEffect } from 'react';
import { MainTab } from '../types';
import { Zap, Clock, ShieldCheck, Truck, Calculator, Flame, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroBannerProps {
  activeTab: MainTab;
  categoryFilter: string;
  setCategoryFilter: (cat: string) => void;
  onOpenCalculator: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  activeTab,
  categoryFilter,
  setCategoryFilter,
  onOpenCalculator,
}) => {
  // Live 45-min countdown ticker display
  const [secondsLeft, setSecondsLeft] = useState(45 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 45 * 60));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const categoryOptions: Record<MainTab, { id: string; label: string }[]> = {
    vehicles: [
      { id: 'all', label: 'All Heavy Fleet' },
      { id: 'jcb', label: 'JCB Backhoes' },
      { id: 'crane', label: 'Mobile Cranes' },
      { id: 'excavator', label: 'Excavators' },
      { id: 'dumper', label: 'Dump Trucks' },
      { id: 'roller', label: 'Soil Rollers' },
    ],
    materials: [
      { id: 'all', label: 'All Raw Materials' },
      { id: 'cement', label: 'Cement & Ready-Mix' },
      { id: 'sand', label: 'M-Sand & River Sand' },
      { id: 'steel', label: 'TMT Steel Rebar' },
      { id: 'aggregates', label: 'Granite Aggregates' },
      { id: 'bricks', label: 'Red & AAC Bricks' },
    ],
    tools: [
      { id: 'all', label: 'All Tools' },
      { id: 'power_tools', label: 'Demolition Breakers' },
      { id: 'cutting', label: 'Concrete Cutters & Saws' },
      { id: 'measuring', label: '360° Laser Levels' },
      { id: 'welding', label: 'Inverter Welders' },
      { id: 'safety', label: 'Safety Gear Kits' },
    ],
  };

  const currentCategories = categoryOptions[activeTab] || [];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0e1626] via-[#0b0f17] to-[#0b0f17] pt-6 pb-4 border-b border-slate-800">
      {/* Background Animated Industrial Grid */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Decorative Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Main Hero Copy */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1 rounded-full text-xs font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>SUPER FAST SITE DISPATCH</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-none text-white">
              Industrial Fleet, Raw Materials & Tools{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
                Delivered in 45 Mins
              </span>
            </h1>

            <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed">
              Order JCBs, Mobile Cranes, Cement, Sand, TMT Steel & Demolition Breakers directly to your site location. Guaranteed 45-minute mobilization with certified operators.
            </p>

            {/* Guarantees Row */}
            <div className="mt-5 grid grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="font-bold text-slate-100">45 Min Guarantee</div>
                  <div className="text-[10px] text-slate-400">Or Freight is Free</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-slate-100">Certified Operators</div>
                  <div className="text-[10px] text-slate-400">Verified & Insured</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl">
                <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <div className="font-bold text-slate-100">Live GPS Tracking</div>
                  <div className="text-[10px] text-slate-400">Hub to Construction Site</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Live Dispatch Radar Timer */}
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-5 shadow-2xl relative flex flex-col items-center justify-center max-w-sm w-full mx-auto lg:mx-0 glow-amber">
            <div className="absolute -top-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow">
              Live Express Timer
            </div>

            <div className="mt-2 text-center">
              <div className="text-xs text-slate-400 font-medium">Next Express Trailer Departure</div>
              <div className="font-mono font-black text-4xl md:text-5xl text-amber-400 tracking-wider my-1">
                {timeFormatted}
              </div>
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Hub Alpha Loading Berth Active</span>
              </div>
            </div>

            {/* Quick Action Button for Estimator */}
            <button
              onClick={onOpenCalculator}
              className="mt-4 w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-500 text-amber-400 hover:text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition"
            >
              <Calculator className="w-4 h-4" />
              <span>Not Sure How Much Material You Need?</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Filter:
          </span>
          {currentCategories.map((cat) => {
            const isSelected = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
                  isSelected
                    ? 'bg-amber-500 border-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
