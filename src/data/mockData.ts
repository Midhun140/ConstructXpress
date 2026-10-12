import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // ==================== 1. VEHICLES TAB ====================
  {
    id: 'veh-1',
    name: 'JCB 3DX Super Backhoe Loader',
    tab: 'vehicles',
    category: 'jcb',
    tagline: '76 HP Turbo Diesel • 1.1 m³ Bucket • Certified Operator Included',
    price: 120, // $120 / hr or ₹1800/hr equivalent
    unit: 'per hour (min 4 hrs)',
    pricingType: 'rental',
    deliveryMinutes: 45,
    rating: 4.9,
    reviewsCount: 142,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=800',
    iconName: 'Truck',
    featured: true,
    badge: '⚡ 45 Min Dispatch',
    includesOperator: true,
    fuelIncluded: true,
    specs: [
      { label: 'Engine Power', value: '76 HP @ 2200 RPM' },
      { label: 'Dig Depth', value: '4.77 Metres' },
      { label: 'Loader Bucket', value: '1.1 m³ Heavy Duty' },
      { label: 'Mobilization', value: 'Flatbed Express Trailer' }
    ],
    description: 'The gold standard backhoe loader for earthmoving, trench excavation, site clearing, and material handling. Delivered directly to your construction zone on a low-bed trailer within 45 minutes.'
  },
  {
    id: 'veh-2',
    name: 'SANY 50-Ton Mobile Hydraulic Crane',
    tab: 'vehicles',
    category: 'crane',
    tagline: '43.5m Main Boom • 50 Ton Capacity • Dual Winch System',
    price: 350,
    unit: 'per shift (4 hrs)',
    pricingType: 'rental',
    deliveryMinutes: 45,
    rating: 4.95,
    reviewsCount: 89,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=800',
    iconName: 'Crane',
    featured: true,
    badge: '🔥 High Demand',
    includesOperator: true,
    fuelIncluded: true,
    specs: [
      { label: 'Lifting Capacity', value: '50 Metric Tons' },
      { label: 'Max Boom Length', value: '43.5 Metres' },
      { label: 'Outrigger Spread', value: '6.0m x 7.2m' },
      { label: 'Certification', value: 'Third-Party Load Tested' }
    ],
    description: 'All-terrain mobile hydraulic crane equipped with telescopic boom and emergency counterweights. Perfect for structural steel erection, heavy equipment placement, and bridge girders.'
  },
  {
    id: 'veh-3',
    name: 'Caterpillar 320 Hydraulic Excavator',
    tab: 'vehicles',
    category: 'excavator',
    tagline: '22 Ton Class • 1.2 m³ HD Bucket • GPS Grade Control Built-in',
    price: 240,
    unit: 'per hour (min 4 hrs)',
    pricingType: 'rental',
    deliveryMinutes: 45,
    rating: 4.88,
    reviewsCount: 116,
    stock: 6,
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=800',
    iconName: 'Excavator',
    featured: true,
    badge: '⚡ Instant Dispatch',
    includesOperator: true,
    fuelIncluded: true,
    specs: [
      { label: 'Operating Weight', value: '22.5 Tons' },
      { label: 'Bucket Capacity', value: '1.2 m³ Heavy Duty' },
      { label: 'Max Reach', value: '9.87 Metres' },
      { label: 'Technology', value: 'CAT 2D Grade Control' }
    ],
    description: 'High-production heavy excavator designed for deep foundation digging, rock breaking attachment ready, and mass quarrying operations.'
  },
  {
    id: 'veh-4',
    name: 'TATA Signa 10-Wheeler Dump Truck (18 m³)',
    tab: 'vehicles',
    category: 'dumper',
    tagline: '30 Ton Payload • Hydraulic Tipper Body • GPS Tracked Fleet',
    price: 180,
    unit: 'per trip / shift',
    pricingType: 'rental',
    deliveryMinutes: 45,
    rating: 4.82,
    reviewsCount: 210,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800',
    iconName: 'Truck',
    featured: false,
    badge: '⚡ 45 Min Express',
    includesOperator: true,
    fuelIncluded: true,
    specs: [
      { label: 'Payload Capacity', value: '30 Metric Tons' },
      { label: 'Volumetric Capacity', value: '18 Cubic Metres' },
      { label: 'Transmission', value: 'Heavy Duty 9-Speed' },
      { label: 'Disposal License', value: 'Permitted Municipal Dumping' }
    ],
    description: 'Heavy duty 10-wheel tipper truck ready to transport excavated earth, gravel, demolition debris, or bulk aggregates directly from site.'
  },
  {
    id: 'veh-5',
    name: 'HAMM 311 Heavy Soil Compactor Roller',
    tab: 'vehicles',
    category: 'roller',
    tagline: '11 Ton Single Drum • Dual Frequency Vibration • Edge Cutter',
    price: 150,
    unit: 'per hour',
    pricingType: 'rental',
    deliveryMinutes: 45,
    rating: 4.79,
    reviewsCount: 64,
    stock: 4,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    iconName: 'Roller',
    featured: false,
    badge: 'Precision Soil Compactor',
    includesOperator: true,
    fuelIncluded: true,
    specs: [
      { label: 'Operating Weight', value: '11.3 Tons' },
      { label: 'Drum Width', value: '2.14 Metres' },
      { label: 'Vibration Freq', value: '30/40 Hz Dual Mode' },
      { label: 'Gradeability', value: 'Up to 55%' }
    ],
    description: 'Smooth drum soil compactor engineered for road base compaction, sub-grade preparation, and industrial park ground stabilization.'
  },
  {
    id: 'veh-6',
    name: 'Bobcat S450 Compact Skid Steer Loader',
    tab: 'vehicles',
    category: 'jcb',
    tagline: '49 HP Diesel • 600kg Lift Capacity • Pallet Fork & Bucket',
    price: 95,
    unit: 'per hour (min 3 hrs)',
    pricingType: 'rental',
    deliveryMinutes: 45,
    rating: 4.91,
    reviewsCount: 94,
    stock: 9,
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800',
    iconName: 'Loader',
    featured: true,
    badge: 'Compact Site King',
    includesOperator: true,
    fuelIncluded: true,
    specs: [
      { label: 'Lift Capacity', value: '608 kg' },
      { label: 'Operating Weight', value: '2,240 kg' },
      { label: 'Width', value: '1.4 Metres (Fits tight spaces)' },
      { label: 'Attachments', value: 'Bucket, Breaker & Forks' }
    ],
    description: 'Ultra-agile skid steer loader capable of operating inside basement structures, narrow urban alleys, and indoor warehouse conversions.'
  },

  // ==================== 2. MATERIALS TAB ====================
  {
    id: 'mat-1',
    name: 'UltraTech Super 53 Grade OPC Cement',
    tab: 'materials',
    category: 'cement',
    tagline: '50kg Moisture-Lock Bag • High Initial Strength • BIS Certified',
    price: 5.80, // $5.80 / bag
    unit: 'per 50kg bag (Min 20 bags)',
    pricingType: 'buy',
    deliveryMinutes: 45,
    rating: 4.96,
    reviewsCount: 540,
    stock: 2500,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
    iconName: 'Package',
    featured: true,
    badge: '⚡ Best Seller • 45m Express',
    specs: [
      { label: 'Grade', value: 'OPC 53 Grade (IS 12269)' },
      { label: 'Bag Weight', value: '50 kg Polypropylene' },
      { label: 'Setting Time', value: 'Initial 30 min / Final 600 min' },
      { label: 'Batch Freshness', value: 'Direct from Factory Terminal' }
    ],
    description: 'Premium high-early strength Ordinary Portland Cement engineered for heavy load-bearing RCC columns, beams, multi-story slabs, and structural foundations.'
  },
  {
    id: 'mat-2',
    name: 'Manufactured River Sand (M-Sand Grade A)',
    tab: 'materials',
    category: 'sand',
    tagline: '0-4.75mm Granulometry • Zero Silt Content • Hydro-Washed',
    price: 24, // $24 / ton
    unit: 'per ton (Express Tipper Truck)',
    pricingType: 'buy',
    deliveryMinutes: 45,
    rating: 4.9,
    reviewsCount: 310,
    stock: 450,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    iconName: 'Box',
    featured: true,
    badge: '⚡ 45 Min Express Load',
    specs: [
      { label: 'Particle Size', value: '0 - 4.75 mm Angular' },
      { label: 'Silt Content', value: '< 1% (Triple Hydro-Washed)' },
      { label: 'Testing Standard', value: 'IS 383 Zone II Compliant' },
      { label: 'Dispatch Unit', value: '10-Ton / 20-Ton Hydraulic Tipper' }
    ],
    description: 'Eco-friendly, cubical-shaped engineered M-Sand with optimized grain size distribution for high-strength concrete mixes and structural plaster work.'
  },
  {
    id: 'mat-3',
    name: 'Fe550D TMT Steel Rebar Rods (12mm)',
    tab: 'materials',
    category: 'steel',
    tagline: 'Ductile Grade • Earthquake Resistant • 12 Metre Bundles',
    price: 720, // per ton
    unit: 'per ton',
    pricingType: 'buy',
    deliveryMinutes: 45,
    rating: 4.93,
    reviewsCount: 184,
    stock: 120,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    iconName: 'Shield',
    featured: true,
    badge: 'Highest Ductility Fe550D',
    specs: [
      { label: 'Diameter', value: '12 mm (Also 8/10/16/20/25mm)' },
      { label: 'Yield Strength', value: '550 N/mm² Minimum' },
      { label: 'Elongation', value: '16% Minimum (High Ductility)' },
      { label: 'Bundle Weight', value: '~100 kg per sub-bundle' }
    ],
    description: 'Thermo-Mechanically Treated (TMT) high-strength rebar rods manufactured using German Tempcore technology for superior bendability and seismic resistance.'
  },
  {
    id: 'mat-4',
    name: 'Crushed Granite Aggregate Gravel (20mm)',
    tab: 'materials',
    category: 'aggregates',
    tagline: 'Uniform 20mm Angular • Clean Washed • High Crushing Value',
    price: 22,
    unit: 'per ton',
    pricingType: 'buy',
    deliveryMinutes: 45,
    rating: 4.85,
    reviewsCount: 142,
    stock: 600,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
    iconName: 'Box',
    featured: false,
    badge: 'Quarry Fresh',
    specs: [
      { label: 'Gradation Size', value: '20 mm Uniform Single Size' },
      { label: 'Specific Gravity', value: '2.68' },
      { label: 'Flakiness Index', value: '< 12%' },
      { label: 'Ideal For', value: 'RCC Concrete M20, M25, M30 Grade' }
    ],
    description: 'Quarry-processed hard blue granite aggregates free from dust, clay, and organic matter, optimized for reinforced concrete casting.'
  },
  {
    id: 'mat-5',
    name: 'Red Clay Kiln Bricks (Class 10.5)',
    tab: 'materials',
    category: 'bricks',
    tagline: 'Compressive Strength 10.5 N/mm² • Metallic Sound • Solid Core',
    price: 180,
    unit: 'per pallet of 1000 Pcs',
    pricingType: 'buy',
    deliveryMinutes: 45,
    rating: 4.81,
    reviewsCount: 290,
    stock: 85,
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=800',
    iconName: 'Layers',
    featured: false,
    badge: 'Palletized & Wrapped',
    specs: [
      { label: 'Standard Dimensions', value: '230mm x 110mm x 70mm' },
      { label: 'Compressive Strength', value: '10.5 N/mm²' },
      { label: 'Water Absorption', value: '< 15% Weight' },
      { label: 'Packaging', value: 'Strapped Wooden Pallets' }
    ],
    description: 'Traditional wire-cut kiln burnt solid red bricks with sharp edges and uniform baking for load-bearing brickwork and exterior façade masonry.'
  },
  {
    id: 'mat-6',
    name: 'Transit Ready-Mix Concrete M25 Grade',
    tab: 'materials',
    category: 'cement',
    tagline: '6.0 m³ Mixer Truck • Slump Retainer Additive • 45m Site Pour',
    price: 85,
    unit: 'per Cubic Metre (m³)',
    pricingType: 'buy',
    deliveryMinutes: 45,
    rating: 4.98,
    reviewsCount: 160,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=800',
    iconName: 'Truck',
    featured: true,
    badge: '⚡ Live Transit Dispatch',
    specs: [
      { label: 'Target Strength', value: '25 N/mm² @ 28 Days' },
      { label: 'Slump Flow', value: '120mm ± 25mm' },
      { label: 'Admixture', value: 'Polycarboxylate Ether Superplasticizer' },
      { label: 'Truck Capacity', value: '6.0 m³ to 7.0 m³ Rotating Drum' }
    ],
    description: 'Computerized batching plant concrete delivered in rotating transit mixers. Maintained at exact slump parameters for immediate slab pouring.'
  },

  // ==================== 3. TOOLS TAB ====================
  {
    id: 'tool-1',
    name: 'DeWalt D25899K SDS-Max Demolition Breaker (10kg)',
    tab: 'tools',
    category: 'power_tools',
    tagline: '1500W Engine • 17.9 Joules Impact Energy • Anti-Vibration Tech',
    price: 45, // buy $420, rent $45
    unit: 'per day rental (or $420 Buy)',
    pricingType: 'both',
    deliveryMinutes: 45,
    rating: 4.94,
    reviewsCount: 188,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800',
    iconName: 'Wrench',
    featured: true,
    badge: '⚡ Heavy Breaker',
    specs: [
      { label: 'Power Input', value: '1500 Watts' },
      { label: 'Impact Energy', value: '17.9 Joules' },
      { label: 'Blows Per Minute', value: '2040 BPM' },
      { label: 'Included Accessories', value: 'Pointed Chisel, Flat Chisel & Case' }
    ],
    description: 'Industrial heavy-duty demolition hammer for chiseling, concrete floor breaking, wall opening creation, and masonry demolition.'
  },
  {
    id: 'tool-2',
    name: 'Makita EK7651H 4-Stroke Concrete Cut-off Saw 14"',
    tab: 'tools',
    category: 'cutting',
    tagline: '75.6cc 4-Stroke Engine • 122mm Cutting Depth • Water Kit Included',
    price: 55,
    unit: 'per day rental (or $890 Buy)',
    pricingType: 'both',
    deliveryMinutes: 45,
    rating: 4.91,
    reviewsCount: 95,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
    iconName: 'Zap',
    featured: true,
    badge: '🔥 Low Emission 4-Stroke',
    specs: [
      { label: 'Engine Capacity', value: '75.6 cc 4-Stroke (Pure Petrol)' },
      { label: 'Blade Diameter', value: '355 mm (14 Inch Diamond Blade)' },
      { label: 'Max Cut Depth', value: '122 mm (4.8 Inches)' },
      { label: 'Decompression', value: 'Automatic Pressure Relief Start' }
    ],
    description: 'High-torque gas saw engineered for cutting reinforced concrete slabs, asphalt roads, ductile iron pipes, and structural granite blocks.'
  },
  {
    id: 'tool-3',
    name: 'Bosch GLL 3-80 CG 360° Green Beam Laser Level',
    tab: 'tools',
    category: 'measuring',
    tagline: '3x 360° Lines • Bluetooth App Connect • 120m Range with Receiver',
    price: 30,
    unit: 'per day rental (or $340 Buy)',
    pricingType: 'both',
    deliveryMinutes: 45,
    rating: 4.97,
    reviewsCount: 112,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800',
    iconName: 'Compass',
    featured: true,
    badge: '⚡ High Precision',
    specs: [
      { label: 'Laser Line Color', value: 'Ultra-Visible Green Diode' },
      { label: 'Accuracy', value: '± 0.2 mm/m' },
      { label: 'Self-Leveling Range', value: '± 4°' },
      { label: 'Battery System', value: 'Dual Power (12V Li-ion or AA)' }
    ],
    description: 'Simultaneous 3x 360° layout laser level. Allows site engineers and carpenters to level, align, and square entire building floors in seconds.'
  },
  {
    id: 'tool-4',
    name: 'Honda GX160 Gasoline Plate Compactor (90kg)',
    tab: 'tools',
    category: 'compaction',
    tagline: '5.5 HP Engine • 15 kN Centrifugal Force • Built-in Water Tank',
    price: 40,
    unit: 'per day rental (or $650 Buy)',
    pricingType: 'both',
    deliveryMinutes: 45,
    rating: 4.86,
    reviewsCount: 78,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    iconName: 'Maximize',
    featured: false,
    badge: 'Site Foundation Ready',
    specs: [
      { label: 'Plate Size', value: '530mm x 500mm Cast Iron' },
      { label: 'Compaction Force', value: '15 kN (1,530 kgf)' },
      { label: 'Travel Speed', value: 'Up to 25 metres / min' },
      { label: 'Vibration Freq', value: '5600 VPM' }
    ],
    description: 'Vibratory plate compactor for compacting sand, trench backfill, paving stones, and hot asphalt patches.'
  },
  {
    id: 'tool-5',
    name: 'Lincoln Electric Inverter Arc Welder 400A Heavy Duty',
    tab: 'tools',
    category: 'welding',
    tagline: 'IGBT Inverter • Dual 110V/415V Phase • VRD Safety Device',
    price: 35,
    unit: 'per day rental (or $520 Buy)',
    pricingType: 'both',
    deliveryMinutes: 45,
    rating: 4.88,
    reviewsCount: 63,
    stock: 16,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    iconName: 'Flame',
    featured: false,
    badge: 'Industrial Grade',
    specs: [
      { label: 'Current Output', value: '20 - 400 Amps Continuous' },
      { label: 'Duty Cycle', value: '60% @ 400A / 100% @ 310A' },
      { label: 'Supported Rods', value: '6010, 7018, Stainless, Hardfacing' },
      { label: 'Cable Length', value: '10 Metre Copper Lead Kit' }
    ],
    description: 'Heavy structural steel inverter welding plant built for continuous site operations, pipe welding, and structural column joints.'
  },
  {
    id: 'tool-6',
    name: 'ProSafety Master Site Safety Combo (10-Man Kit)',
    tab: 'tools',
    category: 'safety',
    tagline: '10x ANSI Helmets • 10x Full Body Harness • 10x Steel Toe Boots',
    price: 110,
    unit: 'per 10-Man Kit (Buy)',
    pricingType: 'buy',
    deliveryMinutes: 45,
    rating: 4.99,
    reviewsCount: 320,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&q=80&w=800',
    iconName: 'ShieldCheck',
    featured: true,
    badge: '⚡ OSHA & ISO Compliant',
    specs: [
      { label: 'Contents', value: 'Helmets, High-Viz Vests, Harnesses, Gloves & Boots' },
      { label: 'Compliance', value: 'ANSI Z89.1 & EN361 Certified' },
      { label: 'Harsh Protection', value: 'Fall arrest shock absorbers included' },
      { label: 'Dispatch Packaging', value: 'Waterproof Site Storage Bin' }
    ],
    description: 'Complete site safety compliance bundle for 10 construction workers. Ready to pass safety audit compliance instantly.'
  }
];

export const MOCK_SITE_LOCATIONS = [
  {
    siteName: 'Site #4 - Metro Express Line A',
    address: 'Sector 62, Phase 3 Extension Zone',
    zone: 'Zone 1 (Fast Dispatch Terminal)',
    contactName: 'Site Engineer Vikram Sharma',
    phone: '+91 98765 43210'
  },
  {
    siteName: 'Site #12 - Horizon IT Tower Complex',
    address: 'Plot 4B, Outer Ring Road Tech Corridor',
    zone: 'Zone 2 (Central Hub)',
    contactName: 'Contractor Rajesh Mehta',
    phone: '+91 91234 56789'
  },
  {
    siteName: 'Site #8 - GreenValley Residential Township',
    address: 'Highway KM 14, North Bypass Road',
    zone: 'Zone 3 (Express Hub North)',
    contactName: 'Project Manager Sunita Rao',
    phone: '+91 99887 76655'
  }
];

export const MOCK_VENDOR_PROFILE = {
  companyName: 'Apex Heavy Fleet & Logistics Pvt Ltd',
  hubZone: 'Hub Alpha (Sector 62 Outer Expressway)',
  partnerTier: 'Platinum Certified' as const,
  slaScorePercent: 98.4,
  avgMobilizationMinutes: 7.2,
  activeFleetCount: 6,
  totalFleetCount: 8,
  todayEarnings: 1420,
  pendingEscrowPayout: 3890,
  lifetimeCompletedJobs: 418
};

export const MOCK_OPERATORS = [
  {
    id: 'op-1',
    name: 'Rajesh Kumar',
    experienceYears: 14,
    certifications: ['Heavy Crane Rigging Class 1', 'Hydraulic Safety Certified'],
    licenseNo: 'DL-04-2010-0982',
    phone: '+91 98112 34567',
    isAvailable: true,
    rating: 4.95
  },
  {
    id: 'op-2',
    name: 'Vikram Solanki',
    experienceYears: 9,
    certifications: ['JCB 3DX Master Operator', 'Excavator 20T License'],
    licenseNo: 'HR-26-2015-7712',
    phone: '+91 97223 45678',
    isAvailable: false,
    rating: 4.88
  },
  {
    id: 'op-3',
    name: 'Anand Verma',
    experienceYears: 7,
    certifications: ['Heavy Commercial Tipper Class 2', 'Defensive Driving'],
    licenseNo: 'UP-16-2017-3319',
    phone: '+91 99334 56789',
    isAvailable: true,
    rating: 4.82
  },
  {
    id: 'op-4',
    name: 'Sunita Rao (Dispatch Controller)',
    experienceYears: 8,
    certifications: ['OSHA Logistics Lead', 'Hazardous Materials Handling'],
    licenseNo: 'DL-01-2016-5541',
    phone: '+91 98445 67890',
    isAvailable: true,
    rating: 4.98
  }
];

export const INITIAL_FLEET_ASSETS = [
  {
    id: 'ast-1',
    name: 'SANY 50-Ton Mobile Crane',
    regNumber: 'DL-01-CR-5021',
    category: 'crane' as const,
    status: 'ready' as const,
    operatorName: 'Rajesh Kumar',
    operatorPhone: '+91 98112 34567',
    fuelLevelPercent: 92,
    engineHours: 1240,
    dailyRate: 1400,
    hourlyRate: 350,
    locationHub: 'Hub Alpha Bay 1',
    telematicsHealth: 'excellent' as const
  },
  {
    id: 'ast-2',
    name: 'JCB 3DX Super Backhoe Loader',
    regNumber: 'DL-04-JCB-9102',
    category: 'jcb' as const,
    status: 'on_job' as const,
    operatorName: 'Vikram Solanki',
    operatorPhone: '+91 97223 45678',
    fuelLevelPercent: 68,
    engineHours: 2150,
    dailyRate: 750,
    hourlyRate: 120,
    currentSite: 'Site #4 - Metro Express Line A',
    locationHub: 'On Site (En-Route)',
    telematicsHealth: 'good' as const
  },
  {
    id: 'ast-3',
    name: 'Caterpillar 320 Next-Gen Excavator',
    regNumber: 'HR-26-CAT-3200',
    category: 'excavator' as const,
    status: 'ready' as const,
    operatorName: 'Anand Verma',
    operatorPhone: '+91 99334 56789',
    fuelLevelPercent: 85,
    engineHours: 980,
    dailyRate: 1200,
    hourlyRate: 240,
    locationHub: 'Hub Alpha Bay 3',
    telematicsHealth: 'excellent' as const
  },
  {
    id: 'ast-4',
    name: 'TATA Signa 10-Wheeler Tipper (18 m³)',
    regNumber: 'DL-07-TP-1845',
    category: 'dumper' as const,
    status: 'ready' as const,
    operatorName: 'Balwant Singh',
    operatorPhone: '+91 99445 11223',
    fuelLevelPercent: 78,
    engineHours: 3410,
    dailyRate: 600,
    hourlyRate: 180,
    locationHub: 'Hub Alpha Tipper Staging',
    telematicsHealth: 'good' as const
  },
  {
    id: 'ast-5',
    name: 'Bobcat S450 Skid Steer Loader',
    regNumber: 'UP-16-BC-4412',
    category: 'jcb' as const,
    status: 'ready' as const,
    operatorName: 'Mohit Rawat',
    operatorPhone: '+91 98119 88776',
    fuelLevelPercent: 88,
    engineHours: 720,
    dailyRate: 480,
    hourlyRate: 95,
    locationHub: 'Hub Alpha Bay 4',
    telematicsHealth: 'excellent' as const
  },
  {
    id: 'ast-6',
    name: 'HAMM 311 Soil Compactor Roller 11T',
    regNumber: 'DL-03-RL-8821',
    category: 'jcb' as const,
    status: 'maintenance' as const,
    fuelLevelPercent: 45,
    engineHours: 4120,
    dailyRate: 650,
    hourlyRate: 150,
    locationHub: 'Service Workshop Bay 2',
    telematicsHealth: 'check_needed' as const
  }
];

export const INITIAL_DISPATCH_JOBS = [
  {
    id: 'job-901',
    orderId: 'CX-88421',
    siteName: 'Site #4 - Metro Express Line A',
    siteAddress: 'Sector 62, Phase 3 Extension Zone',
    contactPerson: 'Eng. Vikram Sharma',
    contactPhone: '+91 98765 43210',
    itemTitle: 'SANY 50-Ton Mobile Hydraulic Crane',
    itemType: 'vehicle' as const,
    quantityDesc: '1 Unit • 1 Shift (4 hrs) • Certified Operator Required',
    payoutAmount: 350,
    rushBonus: 45,
    urgencyLevel: 'high_45min' as const,
    slaSecondsRemaining: 540, // 9 mins remaining to mobilize wheels
    status: 'pending_acceptance' as const,
    assignedAssetId: 'ast-1',
    assignedOperatorName: 'Rajesh Kumar',
    estimatedSiteDistanceKm: 6.8,
    timestamp: 'Just now'
  },
  {
    id: 'job-902',
    orderId: 'CX-88390',
    siteName: 'Site #12 - Horizon IT Tower Complex',
    siteAddress: 'Plot 4B, Outer Ring Road Tech Corridor',
    contactPerson: 'Contractor Rajesh Mehta',
    contactPhone: '+91 91234 56789',
    itemTitle: 'JCB 3DX Super Backhoe Loader',
    itemType: 'vehicle' as const,
    quantityDesc: '1 Unit • 8 Hours • Driver Vikram Assigned',
    payoutAmount: 720,
    rushBonus: 60,
    urgencyLevel: 'high_45min' as const,
    slaSecondsRemaining: 1820,
    status: 'en_route' as const,
    assignedAssetId: 'ast-2',
    assignedOperatorName: 'Vikram Solanki',
    estimatedSiteDistanceKm: 4.2,
    timestamp: '18 mins ago'
  },
  {
    id: 'job-903',
    orderId: 'CX-88214',
    siteName: 'Site #8 - GreenValley Residential Township',
    siteAddress: 'Highway KM 14, North Bypass Road',
    contactPerson: 'Project Manager Sunita Rao',
    contactPhone: '+91 99887 76655',
    itemTitle: 'UltraTech Super 53 Grade Cement (100 Bags)',
    itemType: 'material' as const,
    quantityDesc: '100 Bags (50kg each) • Tipper Truck #DL-07',
    payoutAmount: 580,
    rushBonus: 35,
    urgencyLevel: 'high_45min' as const,
    slaSecondsRemaining: 0,
    status: 'completed' as const,
    assignedAssetId: 'ast-4',
    assignedOperatorName: 'Balwant Singh',
    estimatedSiteDistanceKm: 9.1,
    timestamp: '3 hours ago'
  }
];

