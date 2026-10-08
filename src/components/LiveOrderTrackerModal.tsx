import React, { useState, useEffect } from 'react';
import { Order } from '../types';
import { X, Clock, CheckCircle2, Truck, Navigation, Phone, Shield, ShieldCheck, MapPin, Zap, AlertTriangle, FastForward } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface LiveOrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeOrder: Order | null;
}

export const LiveOrderTrackerModal: React.FC<LiveOrderTrackerModalProps> = ({
  isOpen,
  onClose,
  activeOrder,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(45 * 60); // 45 mins default
  const [simulatedStage, setSimulatedStage] = useState<number>(2); // Stage 1, 2, 3, 4

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setSimulatedStage(4);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const timerFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const handleFastForward = () => {
    if (simulatedStage < 4) {
      const nextStage = simulatedStage + 1;
      setSimulatedStage(nextStage);
      if (nextStage === 4) {
        setSecondsRemaining(0);
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      } else if (nextStage === 3) {
        setSecondsRemaining(12 * 60);
      }
    }
  };

  if (!isOpen) return null;

  const stages = [
    { id: 1, title: 'Order Confirmed', time: '00:00', desc: 'Dispatch Hub Alpha assigned & items reserved' },
    { id: 2, title: 'Trailer Loaded & Cleared', time: '05:00', desc: 'Loaded on Low-Bed Express Trailer with tie-downs' },
    { id: 3, title: 'Heavy Freight En-Route', time: '15:00', desc: 'Navigating express transit route to construction site' },
    { id: 4, title: 'Arrived at Site Location', time: '45:00', desc: 'Safety offloaded & handed to Site Engineer' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Tracker Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-[#0d1422] border border-amber-500/50 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl z-10 glass-panel"
        >
          {/* Header Bar */}
          <div className="p-5 bg-[#121b2d] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-bold shadow glow-amber">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-extrabold text-lg text-white">
                    45-Min Express Live Dispatch Tracker
                  </h3>
                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> GPS ACTIVE
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Order #{activeOrder ? activeOrder.id : 'CX-94021'} • {activeOrder ? activeOrder.location.siteName : 'Site #4 Metro Line A'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content */}
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Live Timer & Radar Banner */}
            <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-orange-950/40 border border-amber-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <div className="text-xs text-amber-400 font-bold uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Guaranteed Arrival Timer</span>
                </div>
                <div className="font-mono font-black text-4xl sm:text-5xl text-white tracking-widest my-1">
                  {timerFormatted}
                </div>
                <p className="text-xs text-slate-300">
                  {secondsRemaining === 0
                    ? '🎉 Cargo Arrived & Offloaded at Construction Site!'
                    : 'Dispatch trailer is on schedule to meet the 45-minute deadline.'}
                </p>
              </div>

              {/* Fast Forward Demo Button */}
              {simulatedStage < 4 && (
                <button
                  onClick={handleFastForward}
                  className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/40 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shrink-0 shadow"
                >
                  <FastForward className="w-4 h-4" />
                  <span>Simulate Next Stage</span>
                </button>
              )}
            </div>

            {/* Simulated Live Animated GPS Route Map */}
            <div className="relative bg-[#070b12] border border-slate-800 rounded-2xl p-4 overflow-hidden min-h-[160px] flex items-center justify-center">
              {/* Map grid background pattern */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1f293d_1px,transparent_1px),linear-gradient(to_bottom,#1f293d_1px,transparent_1px)] bg-[size:20px_20px]" />

              <div className="relative z-10 w-full flex items-center justify-between px-6">
                {/* Hub Node */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-amber-500 flex items-center justify-center text-amber-400 font-bold text-xs shadow-lg">
                    HUB
                  </div>
                  <span className="text-[11px] font-bold text-slate-300">Dispatch Hub Alpha</span>
                </div>

                {/* Route Line & Moving Truck */}
                <div className="relative flex-1 mx-4 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(simulatedStage / 4) * 100}%` }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* Moving Animated Vehicle */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 p-1.5 rounded-full shadow-lg glow-amber"
                    initial={{ left: '0%' }}
                    animate={{ left: `${(simulatedStage / 4) * 100}%` }}
                    transition={{ duration: 0.8 }}
                  >
                    <Truck className="w-4 h-4 stroke-[2.5]" />
                  </motion.div>
                </div>

                {/* Site Node */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xs shadow-lg ${
                    simulatedStage === 4
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950 glow-green'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-300">Site #4 Zone</span>
                </div>
              </div>
            </div>

            {/* Stages Timeline */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-xs text-amber-400 uppercase tracking-wider">
                Real-Time Delivery Milestones
              </h4>

              <div className="space-y-2.5">
                {stages.map((stg) => {
                  const isDone = simulatedStage >= stg.id;
                  const isCurrent = simulatedStage === stg.id;
                  return (
                    <div
                      key={stg.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition ${
                        isCurrent
                          ? 'bg-amber-950/30 border-amber-500/60 text-white shadow-md'
                          : isDone
                          ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                          : 'bg-slate-950/40 border-slate-900 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs shrink-0 ${
                          isDone
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-800 text-slate-500'
                        }`}>
                          {isDone ? <CheckCircle2 className="w-4 h-4 stroke-[3]" /> : stg.id}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-slate-100 flex items-center gap-2">
                            <span>{stg.title}</span>
                            {isCurrent && (
                              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.2 rounded font-bold animate-pulse">
                                IN PROGRESS
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{stg.desc}</div>
                        </div>
                      </div>

                      <div className="font-mono text-xs font-bold text-slate-400 shrink-0">
                        {stg.time}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Emergency Site Hotline */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-slate-200">Site Dispatch Captain Line</div>
                  <div className="text-[11px] text-slate-400">+91 98765 43210 (Direct Dispatch Desk)</div>
                </div>
              </div>
              <a
                href="tel:+919876543210"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg transition text-xs shadow"
              >
                Call Desk
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
