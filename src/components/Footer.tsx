import React from 'react';
import { Truck, ShieldCheck, Zap, Phone, Mail, MapPin, Award, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#080c14] border-t border-slate-800 text-slate-400 pt-12 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-black shadow glow-amber">
                <Truck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight text-white">
                CONSTRUCT<span className="text-amber-500">XPRESS</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              India & Global leader in quick-commerce delivery for heavy machinery, raw construction materials, and industrial tools. Site delivery guaranteed in 45 minutes or less.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/60 p-2 rounded-xl text-[11px] w-fit">
              <Zap className="w-3.5 h-3.5 fill-emerald-400" />
              <span>45-MIN GUARANTEED DISPATCH HUB ACTIVE</span>
            </div>
          </div>

          {/* Quick Hub Navigation */}
          <div>
            <h4 className="font-display font-bold text-slate-100 text-sm mb-3 uppercase tracking-wider">
              Fleet & Catalog
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="hover:text-amber-400 cursor-pointer">🚜 JCB 3DX & Heavy Backhoe Loaders</li>
              <li className="hover:text-amber-400 cursor-pointer">🏗️ Mobile Hydraulic Cranes (50-100 Ton)</li>
              <li className="hover:text-amber-400 cursor-pointer">🧱 UltraTech Cement 53 Grade Bags</li>
              <li className="hover:text-amber-400 cursor-pointer">🏖️ M-Sand & Granite Aggregate 20mm</li>
              <li className="hover:text-amber-400 cursor-pointer">🛠️ DeWalt Demolition Hammers & Concrete Saws</li>
            </ul>
          </div>

          {/* Coverage Hubs */}
          <div>
            <h4 className="font-display font-bold text-slate-100 text-sm mb-3 uppercase tracking-wider">
              Active Dispatch Hubs
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Hub Alpha - Sector 62 Metro Zone</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Hub Beta - Tech Park Outer Ring</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Hub Gamma - North Express Highway</span>
              </li>
            </ul>
          </div>

          {/* Site Support & Hotline */}
          <div>
            <h4 className="font-display font-bold text-slate-100 text-sm mb-3 uppercase tracking-wider">
              24x7 Site Hotline
            </h4>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-slate-200">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-sm">+91 98765 43210</span>
              </div>
              <div className="text-[11px] text-slate-400">
                Direct hotline to Site Operations Captain for emergency equipment swap or urgent cement dispatch.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} ConstructXpress Logistics Ltd. All rights reserved. Delivered in 45 Mins.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Safety Protocols</span>
            <span className="hover:text-slate-400 cursor-pointer">Corporate Terms</span>
            <span className="hover:text-slate-400 cursor-pointer">Operator Insurance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
