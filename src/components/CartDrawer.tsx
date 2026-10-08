import React, { useState } from 'react';
import { CartItem, SiteLocation } from '../types';
import { X, Trash2, Plus, Minus, Zap, Truck, ShieldCheck, MapPin, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  selectedLocation: SiteLocation;
  onCheckoutSuccess: (paymentMethod: any) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  selectedLocation,
  onCheckoutSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'corporate_account' | 'site_cod' | 'upi_express' | 'bank_transfer'>('corporate_account');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce((acc, item) => {
    const factor = item.product.tab === 'vehicles' ? (item.rentalDurationHours ?? 8) / 8 : 1;
    return acc + item.product.price * item.quantity * factor;
  }, 0);

  const deliveryFee = subtotal > 300 || items.length === 0 ? 0 : 25; // Free express dispatch over $300
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + deliveryFee + tax;

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      // Trigger confetti celebration!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      onCheckoutSuccess(paymentMethod);
      onClearCart();
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Slide-over Drawer */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-[#0f1624] border-l border-amber-500/40 text-slate-100 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-5 bg-[#131b2c] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5 fill-slate-950" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-lg text-white">
                    Site Order Manifest
                  </h3>
                  <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>45-Min Express Site Dispatch Guaranteed</span>
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

            {/* Delivery Location Summary */}
            <div className="bg-slate-900/90 px-5 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-300 truncate">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="truncate font-semibold">{selectedLocation.siteName}</span>
              </div>
              <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800 text-[10px]">
                Zone 1 Express
              </span>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-slate-600">
                    <Truck className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-slate-200">
                    Your Freight Manifest is Empty
                  </h4>
                  <p className="text-xs max-w-xs text-slate-400">
                    Select JCBs, Cranes, Cement Bags, Sand or Power Tools to dispatch to your construction site within 45 minutes.
                  </p>
                </div>
              ) : (
                items.map((item) => {
                  const itemFactor = item.product.tab === 'vehicles' ? (item.rentalDurationHours ?? 8) / 8 : 1;
                  const itemPrice = item.product.price * itemFactor;
                  return (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 flex gap-3 items-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-bold text-xs text-slate-100 truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-slate-500 hover:text-red-400 p-1 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {item.product.tab === 'vehicles' && item.withOperator && '👨‍✈️ Driver Included • '}
                          ${itemPrice.toFixed(2)} /{item.product.unit}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80">
                          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                            <button
                              onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                              className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white bg-slate-900"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                              className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-white bg-slate-900"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="font-display font-bold text-sm text-amber-400">
                            ${(itemPrice * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Payment Method Selector & Summary Footer */}
            {items.length > 0 && (
              <div className="p-5 bg-[#131b2c] border-t border-slate-800 space-y-4">
                {/* Payment Selection */}
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 block">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                    <button
                      onClick={() => setPaymentMethod('corporate_account')}
                      className={`p-2 rounded-xl border text-left flex flex-col justify-between transition ${
                        paymentMethod === 'corporate_account'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>💳 Corporate Credit</span>
                      <span className="text-[10px] opacity-70">30-Day Net Site Credit</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('site_cod')}
                      className={`p-2 rounded-xl border text-left flex flex-col justify-between transition ${
                        paymentMethod === 'site_cod'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>💵 Pay on Arrival</span>
                      <span className="text-[10px] opacity-70">Inspect & Pay at Site</span>
                    </button>
                  </div>
                </div>

                {/* Costs Breakdown */}
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Items Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">45-Min Express Dispatch</span>
                    <span className="font-medium text-emerald-400">
                      {deliveryFee === 0 ? 'FREE (Orders > $300)' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimated Taxes (8%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                    <span>Total Amount</span>
                    <span className="text-amber-400 font-display">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  disabled={isProcessing}
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl text-sm shadow-xl glow-amber flex items-center justify-center gap-2 transition"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Allocating Trailer & Operator...</span>
                    </div>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 fill-slate-950" />
                      <span>CONFIRM & DISPATCH IN 45 MINS</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
