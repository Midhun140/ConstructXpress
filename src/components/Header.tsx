import React from 'react';
import { MainTab, SiteLocation } from '../types';
import { ShoppingCart, Truck, Wrench, Package, Search, Calculator, Clock, MapPin, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  cartCount: number;
  cartTotal: number;
  setIsCartOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLocation: SiteLocation;
  setSelectedLocation: (loc: SiteLocation) => void;
  allLocations: SiteLocation[];
  onOpenCalculator: () => void;
  onOpenTracker: () => void;
  activeOrderCount: number;
  onSwitchToVendorView: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  cartTotal,
  setIsCartOpen,
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  allLocations,
  onOpenCalculator,
  onOpenTracker,
  activeOrderCount,
  onSwitchToVendorView,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0b0f17]/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 px-4 py-1.5 text-xs font-semibold text-slate-950 flex items-center justify-between shadow-inner">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
            </span>
            <span className="tracking-wide">GUARANTEED 45-MINUTE SITE DISPATCH</span>
            <span className="hidden md:inline text-slate-900/80">• Heavy Fleet, Raw Materials & Tools Live Hubs Active</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={onOpenCalculator}
              className="flex items-center gap-1 bg-slate-950/20 hover:bg-slate-950/40 px-2 py-0.5 rounded transition"
            >
              <Calculator className="w-3 h-3 text-slate-950" />
              <span>Site Quantity Estimator</span>
            </button>

            {activeOrderCount > 0 && (
              <button
                onClick={onOpenTracker}
                className="flex items-center gap-1.5 bg-black text-amber-400 px-2.5 py-0.5 rounded-full font-bold animate-pulse hover:scale-105 transition shadow-sm"
              >
                <Activity className="w-3 h-3" />
                <span>Live Order ({activeOrderCount}) Tracking</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Location */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('vehicles')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-black shadow-lg glow-amber">
              <Truck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl tracking-tight text-white">
                  CONSTRUCT<span className="text-amber-500">XPRESS</span>
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-1.5 py-0.2 rounded flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" /> 45 MIN
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Industrial Fleet & Materials Quick-Commerce
              </p>
            </div>
          </div>

          {/* Location Picker */}
          <div className="relative group hidden sm:block">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/70 hover:border-amber-500/50 rounded-lg px-3 py-1.5 text-xs transition cursor-pointer">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <div className="text-left max-w-[170px] truncate">
                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Delivery Site</div>
                <div className="font-semibold text-slate-200 truncate">{selectedLocation.siteName}</div>
              </div>
              <select
                value={selectedLocation.siteName}
                onChange={(e) => {
                  const found = allLocations.find(l => l.siteName === e.target.value);
                  if (found) setSelectedLocation(found);
                }}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              >
                {allLocations.map((loc) => (
                  <option key={loc.siteName} value={loc.siteName} className="bg-slate-900 text-white">
                    {loc.siteName} ({loc.zone})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search JCB, 50-Ton Crane, Cement 53 Grade, Demolition Hammer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs md:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Actions: Tracker & Cart */}
        <div className="flex items-center gap-3">
          <button
            onClick={onSwitchToVendorView}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 hover:border-amber-400 px-3 py-2 rounded-xl text-xs font-bold transition shadow-sm"
            title="Switch to Fleet Partner & Material Vendor Hub"
          >
            <Truck className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Vendor</span> Hub
          </button>

          <button
            onClick={onOpenTracker}
            className="hidden sm:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 transition"
          >
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Track Order</span>
          </button>

          {/* Cart Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs md:text-sm shadow-md transition glow-amber"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-black text-amber-400 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-amber-400">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[10px] uppercase tracking-wider text-slate-950/80">Site Cart</span>
              <span className="text-xs font-black">${cartTotal.toFixed(2)}</span>
            </div>
          </motion.button>
        </div>
      </div>
    </header>
  );
};
