export type MainTab = 'vehicles' | 'materials' | 'tools';

export type VehicleType = 'jcb' | 'crane' | 'excavator' | 'dumper' | 'roller' | 'paver' | 'concrete_mixer';
export type MaterialCategory = 'cement' | 'sand' | 'steel' | 'bricks' | 'aggregates' | 'chemicals';
export type ToolCategory = 'power_tools' | 'cutting' | 'compaction' | 'welding' | 'safety' | 'measuring' | 'scaffolding';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  tab: MainTab;
  category: string;
  tagline: string;
  price: number; // base price in $ or ₹
  unit: string; // e.g. "per shift (8 hrs)", "per bag (50kg)", "per day", "per ton"
  pricingType: 'rental' | 'buy' | 'both';
  deliveryMinutes: number; // 45 min guarantee
  rating: number;
  reviewsCount: number;
  stock: number;
  image: string;
  iconName: string;
  featured?: boolean;
  specs: ProductSpec[];
  description: string;
  badge?: string; // e.g. "⚡ Most Ordered", "Heavy Duty", "Certified Operator Included"
  includesOperator?: boolean;
  fuelIncluded?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  mode: 'rent' | 'buy';
  rentalDurationHours?: number; // e.g., 4 hrs, 8 hrs (1 shift), 24 hrs
  withOperator?: boolean;
  notes?: string;
}

export interface SiteLocation {
  siteName: string;
  address: string;
  zone: string;
  contactName: string;
  phone: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  totalAmount: number;
  location: SiteLocation;
  paymentMethod: 'corporate_account' | 'site_cod' | 'upi_express' | 'bank_transfer';
  status: 'confirmed' | 'dispatching' | 'en_route' | 'delivered';
  createdAt: string;
  estimatedDeliveryTime: string; // timestamp or remaining mins
  remainingSeconds: number;
}
