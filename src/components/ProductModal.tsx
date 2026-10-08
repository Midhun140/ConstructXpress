import React, { useState } from 'react';
import { Product } from '../types';
import { X, Zap, ShieldCheck, Check, Star, Truck, UserCheck, Clock, Layers, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, mode: 'rent' | 'buy', withOperator: boolean, durationHours?: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [mode, setMode] = useState<'rent' | 'buy'>(
    product.pricingType === 'buy' ? 'buy' : 'rent'
  );
  const [withOperator, setWithOperator] = useState<boolean>(
    product.includesOperator ?? true
  );
  const [durationHours, setDurationHours] = useState<number>(8); // 8 hrs (1 shift)
  const [added, setAdded] = useState(false);

  const handleConfirm = () => {
    onAddToCart(product, mode, withOperator, durationHours);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-[#111723] border border-amber-500/40 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl z-10 glass-panel"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white p-2 rounded-full border border-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header Media Banner */}
          <div className="relative h-64 w-full bg-slate-900">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111723] via-[#111723]/30 to-transparent" />

            <div className="absolute bottom-4 left-6 right-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="bg-emerald-950/90 text-emerald-400 border border-emerald-500/40 font-bold text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-emerald-400" /> 45 MIN EXPRESS DISPATCH
                </span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                {product.name}
              </h2>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
            <p className="text-slate-300 text-sm leading-relaxed">{product.description}</p>

            {/* Technical Specifications Sheet */}
            <div>
              <h4 className="font-display font-bold text-sm text-amber-400 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Technical Specifications & Certification</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {product.specs.map((spec, i) => (
                  <div key={i} className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl flex items-center justify-between">
                    <span className="text-slate-400">{spec.label}</span>
                    <span className="font-semibold text-slate-100">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle Specifics: Shift Duration Slider */}
            {product.tab === 'vehicles' && (
              <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-200">Mobilization Duration:</span>
                  <span className="text-amber-400 font-bold">{durationHours} Hours ({Math.ceil(durationHours/8)} Shift)</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={24}
                  step={4}
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>4 hrs (Half Shift)</span>
                  <span>8 hrs (1 Shift)</span>
                  <span>16 hrs (2 Shifts)</span>
                  <span>24 hrs (Continuous)</span>
                </div>
              </div>
            )}

            {/* Operator & Guarantee Badges */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-emerald-950/30 border border-emerald-800/40 p-3 rounded-xl flex items-center gap-2.5 text-emerald-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold">Fully Insured & Tested</div>
                  <div className="text-[10px] opacity-80">Safety Audit Passed</div>
                </div>
              </div>

              <div className="bg-amber-950/30 border border-amber-800/40 p-3 rounded-xl flex items-center gap-2.5 text-amber-300">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="font-bold">Site Delivery Timer</div>
                  <div className="text-[10px] opacity-80">45 Minutes Max</div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-6 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400">Total Price</div>
              <div className="font-display font-extrabold text-2xl text-white">
                ${(product.price * (product.tab === 'vehicles' ? durationHours / 8 : 1)).toFixed(2)}
                <span className="text-xs text-slate-400 font-normal ml-1">/{product.unit}</span>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm shadow-lg glow-amber flex items-center gap-2 transition"
            >
              {added ? (
                <>
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-slate-950" />
                  <span>Add & Dispatch in 45 Mins</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
