import React, { useState } from 'react';
import {
  FleetAsset,
  DispatchJob,
  OperatorProfile,
  VendorProfile
} from '../types';
import {
  MOCK_VENDOR_PROFILE,
  INITIAL_FLEET_ASSETS,
  MOCK_OPERATORS,
  INITIAL_DISPATCH_JOBS
} from '../data/mockData';
import {
  Truck,
  Shield,
  Zap,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Plus,
  Radio,
  Gauge,
  Wallet,
  ArrowUpRight,
  UserCheck,
  Fuel,
  RefreshCw,
  BellRing,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VendorPortalProps {
  onSwitchToContractorView: () => void;
}

export const VendorPortal: React.FC<VendorPortalProps> = ({ onSwitchToContractorView }) => {
  // State
  const [vendorProfile, setVendorProfile] = useState<VendorProfile>(MOCK_VENDOR_PROFILE);
  const [fleetAssets, setFleetAssets] = useState<FleetAsset[]>(INITIAL_FLEET_ASSETS);
  const [operators, setOperators] = useState<OperatorProfile[]>(MOCK_OPERATORS);
  const [dispatchJobs, setDispatchJobs] = useState<DispatchJob[]>(INITIAL_DISPATCH_JOBS);
  const [activeTab, setActiveTab] = useState<'dispatch' | 'fleet' | 'operators' | 'payouts'>('dispatch');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedJobForModal, setSelectedJobForModal] = useState<DispatchJob | null>(null);

  // New Equipment Modal state
  const [isAddAssetModalOpen, setIsAddAssetModalOpen] = useState(false);
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetReg, setNewAssetReg] = useState('');
  const [newAssetCategory, setNewAssetCategory] = useState<'jcb' | 'crane' | 'excavator' | 'dumper'>('jcb');
  const [newAssetRate, setNewAssetRate] = useState(150);

  // Stats calculation
  const readyAssetsCount = fleetAssets.filter(a => a.status === 'ready').length;
  const onJobCount = fleetAssets.filter(a => a.status === 'on_job' || a.status === 'mobilizing').length;
  const pendingJobsCount = dispatchJobs.filter(j => j.status === 'pending_acceptance').length;

  // Actions
  const handleAcceptJob = (jobId: string, operatorName: string) => {
    setDispatchJobs(prev =>
      prev.map(job => {
        if (job.id === jobId) {
          return {
            ...job,
            status: 'mobilizing',
            assignedOperatorName: operatorName,
            timestamp: 'Mobilizing now (10m SLA active)'
          };
        }
        return job;
      })
    );

    // Update corresponding fleet asset to mobilizing
    const job = dispatchJobs.find(j => j.id === jobId);
    if (job && job.assignedAssetId) {
      setFleetAssets(prev =>
        prev.map(asset =>
          asset.id === job.assignedAssetId
            ? { ...asset, status: 'mobilizing', operatorName: operatorName }
            : asset
        )
      );
    }
  };

  const handleUpdateJobStatus = (jobId: string, nextStatus: DispatchJob['status']) => {
    setDispatchJobs(prev =>
      prev.map(job => (job.id === jobId ? { ...job, status: nextStatus } : job))
    );

    if (nextStatus === 'completed') {
      const job = dispatchJobs.find(j => j.id === jobId);
      if (job) {
        setVendorProfile(prev => ({
          ...prev,
          todayEarnings: prev.todayEarnings + job.payoutAmount + job.rushBonus,
          lifetimeCompletedJobs: prev.lifetimeCompletedJobs + 1
        }));
      }
    }
  };

  const handleToggleAssetStatus = (assetId: string) => {
    setFleetAssets(prev =>
      prev.map(asset => {
        if (asset.id === assetId) {
          const nextStatus =
            asset.status === 'ready'
              ? 'maintenance'
              : asset.status === 'maintenance'
              ? 'ready'
              : asset.status;
          return { ...asset, status: nextStatus };
        }
        return asset;
      })
    );
  };

  const handleSimulateNewIncomingJob = () => {
    const randomId = Math.floor(100 + Math.random() * 900);
    const newJob: DispatchJob = {
      id: `job-${randomId}`,
      orderId: `CX-${Math.floor(10000 + Math.random() * 90000)}`,
      siteName: 'Site #18 - CyberPark HighRise Pier 2',
      siteAddress: 'Sector 44, Express Highway Service Road',
      contactPerson: 'Lead Eng. Amit Deshmukh',
      contactPhone: '+91 98990 11223',
      itemTitle: 'Caterpillar 320 Next-Gen Excavator',
      itemType: 'vehicle',
      quantityDesc: '1 Unit • 1 Shift (8 hrs) • Urgent Foundation Digging',
      payoutAmount: 480,
      rushBonus: 50,
      urgencyLevel: 'high_45min',
      slaSecondsRemaining: 600, // 10 mins
      status: 'pending_acceptance',
      assignedAssetId: 'ast-3',
      assignedOperatorName: 'Anand Verma',
      estimatedSiteDistanceKm: 7.4,
      timestamp: 'Just now'
    };

    setDispatchJobs(prev => [newJob, ...prev]);
    setActiveTab('dispatch');
  };

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetName || !newAssetReg) return;

    const newAsset: FleetAsset = {
      id: `ast-${Date.now()}`,
      name: newAssetName,
      regNumber: newAssetReg.toUpperCase(),
      category: newAssetCategory,
      status: 'ready',
      fuelLevelPercent: 95,
      engineHours: 120,
      dailyRate: newAssetRate * 6,
      hourlyRate: newAssetRate,
      locationHub: 'Hub Alpha Bay 5',
      telematicsHealth: 'excellent'
    };

    setFleetAssets(prev => [newAsset, ...prev]);
    setIsAddAssetModalOpen(false);
    setNewAssetName('');
    setNewAssetReg('');
  };

  const filteredAssets = fleetAssets.filter(
    a => categoryFilter === 'all' || a.category === categoryFilter
  );

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 font-sans">
      {/* Top Banner Navigation & View Switcher */}
      <div className="bg-[#0f172a] border-b border-slate-800 px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-emerald-400 uppercase tracking-wider">
              VENDOR TELEMATICS TERMINAL ACTIVE
            </span>
          </div>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">
            Logged into: <strong className="text-slate-200">{vendorProfile.companyName}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateNewIncomingJob}
            className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-lg font-semibold transition"
          >
            <BellRing className="w-3.5 h-3.5 animate-bounce" />
            <span>Simulate Incoming 45m Order</span>
          </button>

          <button
            onClick={onSwitchToContractorView}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1 rounded-lg font-semibold transition"
          >
            <Truck className="w-3.5 h-3.5 text-amber-500" />
            <span>Switch to Contractor App</span>
          </button>
        </div>
      </div>

      {/* Main Vendor Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-black shadow-lg glow-amber">
                <Truck className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display font-extrabold text-2xl text-white tracking-tight">
                    {vendorProfile.companyName}
                  </h1>
                  <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Shield className="w-3 h-3" /> {vendorProfile.partnerTier}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>{vendorProfile.hubZone}</span>
                  <span className="text-slate-600">•</span>
                  <span>45-Min Staging Hub Certified</span>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-[#101726] border border-slate-800 p-3 rounded-2xl">
              <div className="text-slate-400 text-[11px] flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400" /> Fleet Ready
              </div>
              <div className="font-display font-extrabold text-lg text-emerald-400 mt-1">
                {readyAssetsCount} / {fleetAssets.length} Units
              </div>
            </div>

            <div className="bg-[#101726] border border-slate-800 p-3 rounded-2xl">
              <div className="text-slate-400 text-[11px] flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" /> Avg Mobilize SLA
              </div>
              <div className="font-display font-extrabold text-lg text-white mt-1">
                {vendorProfile.avgMobilizationMinutes} Mins
              </div>
            </div>

            <div className="bg-[#101726] border border-slate-800 p-3 rounded-2xl">
              <div className="text-slate-400 text-[11px] flex items-center gap-1">
                <Activity className="w-3 h-3 text-blue-400" /> On-Time Score
              </div>
              <div className="font-display font-extrabold text-lg text-blue-400 mt-1">
                {vendorProfile.slaScorePercent}%
              </div>
            </div>

            <div className="bg-[#101726] border border-amber-500/30 p-3 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent">
              <div className="text-amber-400 text-[11px] flex items-center gap-1 font-semibold">
                <Wallet className="w-3 h-3" /> Today's Earnings
              </div>
              <div className="font-display font-extrabold text-lg text-white mt-1">
                ${vendorProfile.todayEarnings}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between mt-6 gap-2 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('dispatch')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'dispatch'
                  ? 'bg-amber-500 text-slate-950 shadow-md glow-amber'
                  : 'bg-slate-900 text-slate-300 hover:text-white'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>Live Dispatch Radar</span>
              {pendingJobsCount > 0 && (
                <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded-full animate-pulse">
                  {pendingJobsCount} NEW
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('fleet')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'fleet'
                  ? 'bg-amber-500 text-slate-950 shadow-md glow-amber'
                  : 'bg-slate-900 text-slate-300 hover:text-white'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Fleet & Telematics ({fleetAssets.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('operators')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'operators'
                  ? 'bg-amber-500 text-slate-950 shadow-md glow-amber'
                  : 'bg-slate-900 text-slate-300 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Certified Operators ({operators.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('payouts')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'payouts'
                  ? 'bg-amber-500 text-slate-950 shadow-md glow-amber'
                  : 'bg-slate-900 text-slate-300 hover:text-white'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>Escrow & Settlements</span>
            </button>
          </div>

          {activeTab === 'fleet' && (
            <button
              onClick={() => setIsAddAssetModalOpen(true)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs hover:scale-105 transition shadow glow-amber"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Equipment Unit</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Body Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* ================= SECTION 1: DISPATCH RADAR ================= */}
        {activeTab === 'dispatch' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <Radio className="w-5 h-5 text-amber-500 animate-pulse" />
                  <span>Incoming Site Requests (45-Minute SLA Pipeline)</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Accept within 3 minutes and mobilize wheels within 10 minutes to maintain your Platinum Partner Tier.
                </p>
              </div>

              <button
                onClick={handleSimulateNewIncomingJob}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Trigger New Test Order</span>
              </button>
            </div>

            {/* List of Dispatch Jobs */}
            <div className="space-y-4">
              {dispatchJobs.map((job) => {
                const isPending = job.status === 'pending_acceptance';
                const isMobilizing = job.status === 'mobilizing';
                const isEnRoute = job.status === 'en_route';
                const isCompleted = job.status === 'completed';

                return (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-2xl border p-5 transition relative overflow-hidden ${
                      isPending
                        ? 'bg-gradient-to-r from-red-950/40 via-[#131b2c] to-[#131b2c] border-red-500/50 shadow-lg'
                        : isMobilizing
                        ? 'bg-[#121929] border-amber-500/50 shadow-md'
                        : isEnRoute
                        ? 'bg-[#101726] border-emerald-500/40'
                        : 'bg-[#0e1422] border-slate-800/80 opacity-80'
                    }`}
                  >
                    {isPending && (
                      <div className="absolute top-0 right-0 bg-red-600 text-white font-extrabold text-[10px] px-3 py-1 rounded-bl-xl tracking-wider uppercase flex items-center gap-1 animate-pulse">
                        <Clock className="w-3 h-3" /> URGENT • 45-MIN GUARANTEED ARRIVAL
                      </div>
                    )}

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      {/* Left: Job & Site Details */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-display font-extrabold text-lg text-white">
                            {job.itemTitle}
                          </span>
                          <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                            {job.orderId}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              isPending
                                ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                                : isMobilizing
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                : isEnRoute
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {job.status.replace('_', ' ')}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 font-medium">
                          {job.quantityDesc}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                          <div className="flex items-center gap-1 text-slate-200 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-amber-500" />
                            <span>{job.siteName} ({job.estimatedSiteDistanceKm} km away)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                            <span>Contact: {job.contactPerson} ({job.contactPhone})</span>
                          </div>
                        </div>
                      </div>

                      {/* Middle: Financials & Payout */}
                      <div className="bg-slate-900/90 border border-slate-800/80 p-3.5 rounded-xl text-center min-w-[160px]">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">Net Vendor Payout</div>
                        <div className="font-display font-extrabold text-xl text-emerald-400 mt-0.5">
                          ${job.payoutAmount + job.rushBonus}
                        </div>
                        <div className="text-[10px] text-amber-400 font-semibold mt-0.5">
                          Includes ${job.rushBonus} 45-Min Rush Bonus
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                        {isPending && (
                          <>
                            <div className="text-xs">
                              <label className="text-[10px] text-slate-400 block mb-1">Assign Operator</label>
                              <select
                                id={`op-select-${job.id}`}
                                defaultValue="Rajesh Kumar"
                                className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-amber-500"
                              >
                                {operators.map(op => (
                                  <option key={op.id} value={op.name}>
                                    {op.name} ({op.experienceYears}y exp)
                                  </option>
                                ))}
                              </select>
                            </div>

                            <button
                              onClick={() => {
                                const selectEl = document.getElementById(`op-select-${job.id}`) as HTMLSelectElement;
                                const operatorName = selectEl ? selectEl.value : 'Rajesh Kumar';
                                handleAcceptJob(job.id, operatorName);
                              }}
                              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg glow-green"
                            >
                              <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                              <span>Accept & Mobilize Fleet</span>
                            </button>
                          </>
                        )}

                        {isMobilizing && (
                          <button
                            onClick={() => handleUpdateJobStatus(job.id, 'en_route')}
                            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow glow-amber"
                          >
                            <Truck className="w-4 h-4 stroke-[2.5]" />
                            <span>Wheels Rolling ➔ Mark En-Route</span>
                          </button>
                        )}

                        {isEnRoute && (
                          <button
                            onClick={() => handleUpdateJobStatus(job.id, 'completed')}
                            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow glow-green"
                          >
                            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                            <span>Confirm Site Arrival & Signoff</span>
                          </button>
                        )}

                        {isCompleted && (
                          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs bg-emerald-950/60 border border-emerald-800/60 px-3 py-2 rounded-xl">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Payout Credited to Escrow</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= SECTION 2: FLEET & TELEMATICS ================= */}
        {activeTab === 'fleet' && (
          <div className="space-y-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Filter Category:
                </span>
                {['all', 'crane', 'jcb', 'excavator', 'dumper'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-lg capitalize font-medium transition ${
                      categoryFilter === cat
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat === 'all' ? 'All Fleet' : cat}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-400">
                Showing <strong>{filteredAssets.length}</strong> active machinery units
              </div>
            </div>

            {/* Asset Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredAssets.map((asset) => {
                const isReady = asset.status === 'ready';
                const isOnJob = asset.status === 'on_job' || asset.status === 'mobilizing';

                return (
                  <div
                    key={asset.id}
                    className="bg-[#0f1728] border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition"
                  >
                    {/* Top Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold">
                          {asset.regNumber}
                        </span>
                        <h3 className="font-display font-bold text-white text-base mt-0.5">
                          {asset.name}
                        </h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{asset.locationHub}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => handleToggleAssetStatus(asset.id)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border transition ${
                          isReady
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30'
                            : isOnJob
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                            : 'bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/30'
                        }`}
                        title="Click to toggle Ready / Maintenance status"
                      >
                        {asset.status.replace('_', ' ')}
                      </button>
                    </div>

                    {/* Telematics Gauges */}
                    <div className="grid grid-cols-3 gap-2 bg-slate-900/80 p-3 rounded-xl text-center text-xs">
                      <div>
                        <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                          <Fuel className="w-3 h-3 text-amber-500" /> Fuel
                        </div>
                        <div className="font-bold text-white mt-0.5">{asset.fuelLevelPercent}%</div>
                      </div>
                      <div className="border-x border-slate-800">
                        <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                          <Gauge className="w-3 h-3 text-blue-400" /> Run Hrs
                        </div>
                        <div className="font-bold text-white mt-0.5">{asset.engineHours}h</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                          <Activity className="w-3 h-3 text-emerald-400" /> IoT Health
                        </div>
                        <div className="font-bold text-emerald-400 mt-0.5 capitalize">{asset.telematicsHealth}</div>
                      </div>
                    </div>

                    {/* Operator Assigned */}
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Operator Assigned</span>
                        <span className="font-semibold text-slate-200">
                          {asset.operatorName || 'No Driver Assigned'}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Rental Rate</span>
                        <span className="font-bold text-amber-400">${asset.hourlyRate}/hr</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= SECTION 3: CERTIFIED OPERATORS ================= */}
        {activeTab === 'operators' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-lg text-white">
                  Certified Operator & Driver Roster
                </h2>
                <p className="text-xs text-slate-400">
                  All operators are pre-verified with heavy equipment certifications and background checks.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {operators.map((op) => (
                <div
                  key={op.id}
                  className="bg-[#0f1728] border border-slate-800 rounded-2xl p-5 flex items-start justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center font-bold">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm">{op.name}</h3>
                        <p className="text-[11px] text-slate-400">
                          {op.experienceYears} Years Heavy Equipment Exp • Rating: ★ {op.rating}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {op.certifications.map((cert, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-slate-900 border border-slate-700/80 text-slate-300 px-2 py-0.5 rounded-md"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>

                    <div className="text-xs text-slate-400 font-mono">
                      License: <span className="text-slate-200">{op.licenseNo}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        op.isAvailable
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}
                    >
                      {op.isAvailable ? 'Available for Job' : 'Currently On Site'}
                    </span>

                    <a
                      href={`tel:${op.phone}`}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-2 rounded-xl text-xs flex items-center gap-1.5 transition"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{op.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= SECTION 4: PAYOUTS & ESCROW ================= */}
        {activeTab === 'payouts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0f1728] border border-slate-800 p-5 rounded-2xl">
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Today's Settled Payout</span>
                <span className="font-display font-extrabold text-2xl text-emerald-400 mt-1 block">
                  ${vendorProfile.todayEarnings}
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">T+1 automated ACH/IMPS transfer at 11:59 PM</span>
              </div>

              <div className="bg-[#0f1728] border border-amber-500/30 p-5 rounded-2xl bg-amber-500/5">
                <span className="text-xs text-amber-400 uppercase tracking-wider block font-bold">Escrow Guarantee Balance</span>
                <span className="font-display font-extrabold text-2xl text-white mt-1 block">
                  ${vendorProfile.pendingEscrowPayout}
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">Protected by ConstructXpress B2B Escrow</span>
              </div>

              <div className="bg-[#0f1728] border border-slate-800 p-5 rounded-2xl">
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Lifetime Completed Jobs</span>
                <span className="font-display font-extrabold text-2xl text-blue-400 mt-1 block">
                  {vendorProfile.lifetimeCompletedJobs} Dispatches
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">Zero SLA dispute history</span>
              </div>
            </div>

            <div className="bg-[#0e1424] border border-slate-800 rounded-2xl p-5">
              <h3 className="font-display font-bold text-white text-sm mb-3">
                Recent Dispatch Settlement History
              </h3>

              <div className="space-y-2 text-xs">
                {dispatchJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80"
                  >
                    <div>
                      <div className="font-bold text-white">{job.itemTitle}</div>
                      <div className="text-slate-400 text-[11px]">
                        Order #{job.orderId} • {job.siteName} • {job.timestamp}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-emerald-400">+${job.payoutAmount + job.rushBonus}</div>
                      <div className="text-[10px] text-slate-400">Status: {job.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Equipment Modal */}
      {isAddAssetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0f1728] border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="font-display font-extrabold text-lg text-white mb-1">
              Add Machinery or Material Stock to Hub
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Instantly make this unit available for 45-minute site dispatch in Zone 1.
            </p>

            <form onSubmit={handleCreateAsset} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Machine / Equipment Model</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JCB 3DX Backhoe Loader 2024"
                  value={newAssetName}
                  onChange={e => setNewAssetName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold mb-1 block">Vehicle Plate / Asset Tag</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DL-04-JCB-9821"
                  value={newAssetReg}
                  onChange={e => setNewAssetReg(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white uppercase outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold mb-1 block">Category</label>
                  <select
                    value={newAssetCategory}
                    onChange={e => setNewAssetCategory(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-500"
                  >
                    <option value="jcb">JCB / Backhoe</option>
                    <option value="crane">Mobile Crane</option>
                    <option value="excavator">Excavator</option>
                    <option value="dumper">Dump Truck</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold mb-1 block">Hourly Rate ($)</label>
                  <input
                    type="number"
                    min={20}
                    value={newAssetRate}
                    onChange={e => setNewAssetRate(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddAssetModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 rounded-xl shadow glow-amber"
                >
                  Add Equipment to Fleet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
