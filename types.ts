export enum RoomType {
  STANDARD = 'Standard',
  DELUXE = 'Deluxe',
  SUITE = 'Suite',
  PENTHOUSE = 'Penthouse'
}

export interface Amenity {
  id: string;
  name: string;
  icon: string; // Lucide icon name
}

export interface Room {
  id: string;
  title: string;
  description: string;
  price: number; // In INR
  capacity: number;
  size: number; // sq ft
  bedType: string;
  type: RoomType;
  amenities: string[]; 
  images: string[];
  featured: boolean;
}

export interface Booking {
  id: string;
  roomId: string;
  roomTitle: string; // Snapshot
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  checkIn: string; // ISO Date string
  checkOut: string; // ISO Date string
  guests: number;
  subtotal: number;
  discount: number;
  totalPrice: number;
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  paymentStatus: 'paid' | 'unpaid';
  paymentMethod: 'razorpay' | 'cash' | 'other';
  createdAt: string;
}

export interface Attraction {
  id: string;
  name: string;
  category: string;
  distance: string;
  description: string;
  image: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  image?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Starter' | 'Main Course' | 'Dessert' | 'Beverage';
  image: string;
  isVeg: boolean;
}

export interface PromoCode {
  id: string;
  code: string;
  discountPercent: number;
  isActive: boolean;
}

export interface GalleryItem {
  id: string;
  url: string;
  category: string;
  title: string;
}

// Stats for Admin Dashboard
export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  occupancyRate: number;
  monthlyRevenue: { name: string; value: number }[];
  recentBookings: Booking[];
}