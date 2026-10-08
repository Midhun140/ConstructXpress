import React, { useState } from 'react';
import { Product } from '../types';
import { Zap, Star, ShieldCheck, Check, Plus, Eye, Truck, UserCheck, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, mode: 'rent' | 'buy', withOperator: boolean) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedMode, setSelectedMode] = useState<'rent' | 'buy'>(
    product.pricingType === 'buy' ? 'buy' : 'rent'
  );
  const [withOperator, setWithOperator] = useState<boolean>(
    product.includesOperator ?? false
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedMode, withOperator);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group bg-[#131a28] border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg transition-all duration-300 glass-card"
    >
      <div>
        {/* Image & Top Badges */}
        <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#131a28] via-transparent to-black/40" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/40 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
              <Zap className="w-3 h-3 fill-amber-400 text-amber-400" /> 45 MIN DISPATCH
            </span>

            {product.badge && (
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                {product.badge}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1 border border-white/10">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>{product.rating}</span>
            <span className="text-slate-400">({product.reviewsCount})</span>
          </div>

          {/* Quick View Button Overlay */}
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-3 right-3 bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-slate-700 hover:border-amber-400 text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition opacity-90 group-hover:opacity-100 shadow"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Specs</span>
          </button>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <div className="text-[10px] uppercase tracking-wider font-extrabold text-amber-500 mb-1">
            {product.category.toUpperCase()}
          </div>

          <h3 className="font-display font-bold text-base text-slate-100 group-hover:text-amber-400 transition leading-snug line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-slate-400 mt-1 line-clamp-2 min-h-[32px]">
            {product.tagline}
          </p>

          {/* Specs Grid Chips */}
          <div className="mt-3 grid grid-cols-2 gap-1.5 text-[11px]">
            {product.specs.slice(0, 2).map((spec, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-lg px-2 py-1 text-slate-300 truncate"
              >
                <span className="text-slate-500 font-medium">{spec.label}: </span>
                <span className="font-semibold text-slate-200">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Rent / Buy Mode Toggle if applicable */}
          {product.pricingType === 'both' && (
            <div className="mt-3 bg-slate-900/90 p-1 rounded-xl border border-slate-800 flex text-xs font-semibold">
              <button
                onClick={() => setSelectedMode('rent')}
                className={`flex-1 py-1 rounded-lg transition ${
                  selectedMode === 'rent'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Rent (Daily)
              </button>
              <button
                onClick={() => setSelectedMode('buy')}
                className={`flex-1 py-1 rounded-lg transition ${
                  selectedMode === 'buy'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Buy Outright
              </button>
            </div>
          )}

          {/* Operator Toggle if vehicle */}
          {product.tab === 'vehicles' && (
            <label className="mt-3 flex items-center gap-2 text-xs text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80 cursor-pointer">
              <input
                type="checkbox"
                checked={withOperator}
                onChange={(e) => setWithOperator(e.target.checked)}
                className="rounded text-amber-500 focus:ring-amber-500 bg-slate-950 border-slate-700"
              />
              <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-[11px] font-medium">Include Certified Operator</span>
            </label>
          )}
        </div>
      </div>

      {/* Footer Section: Price & Add Button */}
      <div className="p-4 pt-0 border-t border-slate-800/60 mt-2">
        <div className="flex items-center justify-between gap-2 pt-3">
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Site Price</div>
            <div className="font-display font-extrabold text-lg text-white">
              ${product.price.toFixed(2)}
              <span className="text-xs text-slate-400 font-normal ml-1">/{product.unit}</span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={handleAdd}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition shadow-md ${
              addedAnimation
                ? 'bg-emerald-500 text-slate-950 glow-green'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 glow-amber'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Order Express</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
