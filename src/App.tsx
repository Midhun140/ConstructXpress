import React, { useState, useMemo } from 'react';
import { MainTab, Product, CartItem, Order, SiteLocation, AppViewMode } from './types';
import { INITIAL_PRODUCTS, MOCK_SITE_LOCATIONS } from './data/mockData';
import { Header } from './components/Header';
import { TabNavigation } from './components/TabNavigation';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { LiveOrderTrackerModal } from './components/LiveOrderTrackerModal';
import { MaterialCalculatorModal } from './components/MaterialCalculatorModal';
import { VendorPortal } from './components/VendorPortal';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Sparkles, Filter, AlertCircle, ShoppingBag, Truck } from 'lucide-react';

export const App: React.FC = () => {
  // View Mode: Contractor vs Vendor Portal
  const [viewMode, setViewMode] = useState<AppViewMode>('contractor');

  // State
  const [activeTab, setActiveTab] = useState<MainTab>('vehicles');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<SiteLocation>(MOCK_SITE_LOCATIONS[0]);

  // Cart & Order State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState<boolean>(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);

  // Calculate product counts per main tab
  const tabCounts = useMemo(() => {
    return {
      vehicles: INITIAL_PRODUCTS.filter(p => p.tab === 'vehicles').length,
      materials: INITIAL_PRODUCTS.filter(p => p.tab === 'materials').length,
      tools: INITIAL_PRODUCTS.filter(p => p.tab === 'tools').length,
    };
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      // Must match current main tab
      if (product.tab !== activeTab) return false;

      // Category filter
      if (categoryFilter !== 'all' && product.category !== categoryFilter) return false;

      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchTagline = product.tagline.toLowerCase().includes(query);
        const matchCategory = product.category.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        return matchName || matchTagline || matchCategory || matchDesc;
      }

      return true;
    });
  }, [activeTab, categoryFilter, searchQuery]);

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    mode: 'rent' | 'buy',
    withOperator: boolean,
    rentalDurationHours: number = 8
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id && item.mode === mode);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [...prev, { product, quantity: 1, mode, withOperator, rentalDurationHours }];
    });
  };

  const handleUpdateQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: qty } : item));
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Cart total calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => {
    const factor = item.product.tab === 'vehicles' ? (item.rentalDurationHours ?? 8) / 8 : 1;
    return acc + item.product.price * item.quantity * factor;
  }, 0);

  // Checkout Handler
  const handleCheckoutSuccess = (paymentMethod: any) => {
    const newOrder: Order = {
      id: `CX-${Math.floor(100000 + Math.random() * 900000)}`,
      items: cartItems,
      subtotal: cartTotal,
      deliveryFee: cartTotal > 300 ? 0 : 25,
      tax: cartTotal * 0.08,
      totalAmount: cartTotal + (cartTotal > 300 ? 0 : 25) + (cartTotal * 0.08),
      location: selectedLocation,
      paymentMethod,
      status: 'confirmed',
      createdAt: new Date().toLocaleTimeString(),
      estimatedDeliveryTime: '45 Mins',
      remainingSeconds: 45 * 60,
    };
    setActiveOrder(newOrder);
    setIsTrackerOpen(true);
  };

  // Material Calculator auto-add handler
  const handleAddCalculatedItems = (
    cementBags: number,
    sandTons: number,
    aggregateTons: number,
    jcbHours: number
  ) => {
    // Find matching items from mock data
    const cementProduct = INITIAL_PRODUCTS.find(p => p.id === 'mat-1');
    const sandProduct = INITIAL_PRODUCTS.find(p => p.id === 'mat-2');
    const aggProduct = INITIAL_PRODUCTS.find(p => p.id === 'mat-4');
    const jcbProduct = INITIAL_PRODUCTS.find(p => p.id === 'veh-1');

    setCartItems((prev) => {
      let updated = [...prev];
      if (cementProduct) {
        updated.push({ product: cementProduct, quantity: cementBags, mode: 'buy' });
      }
      if (sandProduct) {
        updated.push({ product: sandProduct, quantity: sandTons, mode: 'buy' });
      }
      if (aggProduct) {
        updated.push({ product: aggProduct, quantity: aggregateTons, mode: 'buy' });
      }
      if (jcbProduct) {
        updated.push({ product: jcbProduct, quantity: 1, mode: 'rent', rentalDurationHours: jcbHours, withOperator: true });
      }
      return updated;
    });
    setIsCartOpen(true);
  };

  if (viewMode === 'vendor') {
    return (
      <VendorPortal onSwitchToContractorView={() => setViewMode('contractor')} />
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setCategoryFilter('all');
        }}
        cartCount={cartCount}
        cartTotal={cartTotal}
        setIsCartOpen={setIsCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        allLocations={MOCK_SITE_LOCATIONS}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        activeOrderCount={activeOrder ? 1 : 0}
        onSwitchToVendorView={() => setViewMode('vendor')}
      />

      {/* Hero Section */}
      <HeroBanner
        activeTab={activeTab}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* Animated 3-Tab Switcher Bar */}
      <TabNavigation
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setCategoryFilter('all');
        }}
        counts={tabCounts}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* Section Header Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-tight capitalize flex items-center gap-2">
              <span>
                {activeTab === 'vehicles' && '🚜 Heavy Machinery & Vehicle Fleet'}
                {activeTab === 'materials' && '🧱 Construction Materials & Aggregates'}
                {activeTab === 'tools' && '🛠️ Industrial Tools & Equipment'}
              </span>
              <span className="text-xs bg-amber-500/20 text-amber-400 font-bold border border-amber-500/40 px-2.5 py-0.5 rounded-full">
                {filteredProducts.length} Items Available
              </span>
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Guaranteed 45-minute dispatch to <span className="text-amber-400 font-semibold">{selectedLocation.siteName}</span>
            </p>
          </div>
        </div>

        {/* Product Grid with Framer Motion AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${categoryFilter}-${searchQuery}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProducts.length === 0 ? (
              <div className="bg-[#121929] border border-slate-800 rounded-3xl p-12 text-center max-w-md mx-auto my-12 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-amber-500 mx-auto">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">No Equipment Found</h3>
                <p className="text-xs text-slate-400">
                  We couldn't find items matching "{searchQuery}". Try changing your search keywords or switching category filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                  }}
                  className="bg-amber-500 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Reset Search & Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-over Drawers */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        selectedLocation={selectedLocation}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      <LiveOrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        activeOrder={activeOrder}
      />

      <MaterialCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onAddCalculatedItems={handleAddCalculatedItems}
      />
    </div>
  );
};
