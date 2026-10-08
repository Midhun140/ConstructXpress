import React, { useState } from 'react';
import { Calculator, X, Plus, Package, Truck, Box, Check, ArrowRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MaterialCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCalculatedItems: (cementBags: number, sandTons: number, aggregateTons: number, jcbHours: number) => void;
}

export const MaterialCalculatorModal: React.FC<MaterialCalculatorModalProps> = ({
  isOpen,
  onClose,
  onAddCalculatedItems,
}) => {
  const [lengthFt, setLengthFt] = useState<number>(40);
  const [widthFt, setWidthFt] = useState<number>(30);
  const [thicknessInches, setThicknessInches] = useState<number>(6); // 6 inches slab

  // Calculations
  const areaSqFt = lengthFt * widthFt;
  const volumeCuFt = areaSqFt * (thicknessInches / 12);
  const volumeCuM = volumeCuFt * 0.0283168; // Cu.Ft to Cu.M

  // Standard M20 concrete mix ratio rule of thumb per cu.m:
  // Cement: ~8 bags per m3
  // Sand: ~0.45 m3 (~0.65 tons) per m3
  // Aggregate: ~0.85 m3 (~1.35 tons) per m3
  // JCB Earthwork: ~1 hour per 500 sq ft site clearance
  const requiredCementBags = Math.max(10, Math.ceil(volumeCuM * 8));
  const requiredSandTons = Math.max(2, Math.ceil(volumeCuM * 0.65));
  const requiredAggregateTons = Math.max(4, Math.ceil(volumeCuM * 1.35));
  const requiredJcbHours = Math.max(4, Math.ceil(areaSqFt / 400));

  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddCalculatedItems(requiredCementBags, requiredSandTons, requiredAggregateTons, requiredJcbHours);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-[#0e1524] border border-amber-500/40 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl z-10 glass-panel"
        >
          {/* Header */}
          <div className="p-5 bg-[#121a2b] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-lg text-white">
                  Site Material & Fleet Quantity Estimator
                </h3>
                <p className="text-xs text-slate-400">
                  Calculate exact Cement, Sand, Aggregate & JCB hours for your site dimensions.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Controls */}
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold mb-1 block">Length (Feet)</label>
                <input
                  type="number"
                  min={10}
                  max={500}
                  value={lengthFt}
                  onChange={(e) => setLengthFt(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 font-bold text-slate-100 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold mb-1 block">Width (Feet)</label>
                <input
                  type="number"
                  min={10}
                  max={500}
                  value={widthFt}
                  onChange={(e) => setWidthFt(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 font-bold text-slate-100 focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold mb-1 block">Slab Depth (Inches)</label>
                <input
                  type="number"
                  min={2}
                  max={24}
                  value={thicknessInches}
                  onChange={(e) => setThicknessInches(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 font-bold text-slate-100 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            {/* Area & Volume Summary Pill */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex justify-around text-center text-xs">
              <div>
                <div className="text-slate-400">Total Slab Area</div>
                <div className="font-display font-bold text-amber-400 text-sm">{areaSqFt} Sq. Ft.</div>
              </div>
              <div className="border-r border-slate-800" />
              <div>
                <div className="text-slate-400">Concrete Volume</div>
                <div className="font-display font-bold text-emerald-400 text-sm">{volumeCuM.toFixed(2)} m³ ({volumeCuFt.toFixed(0)} cu.ft)</div>
              </div>
            </div>

            {/* Calculated Quantities Output Card */}
            <div>
              <h4 className="font-display font-bold text-xs text-amber-400 uppercase tracking-wider mb-2.5">
                Recommended 45-Min Dispatch Package
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400">UltraTech Cement</div>
                    <div className="font-bold text-white text-sm">{requiredCementBags} Bags (50kg)</div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                    <Box className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400">M-Sand Grade A</div>
                    <div className="font-bold text-white text-sm">{requiredSandTons} Tons</div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold">
                    <Box className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400">20mm Aggregates</div>
                    <div className="font-bold text-white text-sm">{requiredAggregateTons} Tons</div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-slate-400">JCB Earthwork</div>
                    <div className="font-bold text-white text-sm">{requiredJcbHours} Hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-5 bg-[#121a2b] border-t border-slate-800 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>

            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition shadow-lg glow-amber"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added All to Cart!</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>Add Calculated Package to Cart</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
