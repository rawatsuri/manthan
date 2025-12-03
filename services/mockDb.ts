import { Room, Booking, Attraction, Service, RoomType, DashboardStats, PromoCode, GalleryItem, MenuItem } from '../types';

// Initial Seed Data - Updated to INR prices and Indian Context
const INITIAL_ROOMS: Room[] = [
  {
    id: '1',
    title: 'Ocean View Deluxe',
    description: 'Wake up to the sound of waves in this spacious deluxe room featuring a private balcony and premium amenities.',
    price: 12000,
    capacity: 2,
    size: 450,
    bedType: 'King',
    type: RoomType.DELUXE,
    amenities: ['wifi', 'ac', 'tv', 'minibar', 'balcony'],
    images: [
      'https://images.unsplash.com/photo-1571003123894-1ac16e790554?q=80&w=1000&auto=format&fit=crop', 
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
  },
  {
    id: '2',
    title: 'Maharaja Presidential Suite',
    description: 'Experience royalty with a separate living area, private jacuzzi, panoramic views, and personal butler service.',
    price: 45000,
    capacity: 4,
    size: 1200,
    bedType: '2 King',
    type: RoomType.PENTHOUSE,
    amenities: ['wifi', 'ac', 'tv', 'minibar', 'jacuzzi', 'kitchen', 'butler'],
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
  },
  {
    id: '3',
    title: 'Garden Retreat',
    description: 'A quiet sanctuary facing our award-winning botanical gardens. Perfect for reading and relaxation.',
    price: 8500,
    capacity: 2,
    size: 350,
    bedType: 'Queen',
    type: RoomType.STANDARD,
    amenities: ['wifi', 'ac', 'coffee'],
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: false,
  },
  {
    id: '4',
    title: 'Executive Suite',
    description: 'Designed for the modern traveler, featuring a dedicated workspace and lounge area.',
    price: 18000,
    capacity: 3,
    size: 600,
    bedType: 'King',
    type: RoomType.SUITE,
    amenities: ['wifi', 'ac', 'tv', 'workspace', 'lounge'],
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
  },
];

const INITIAL_ATTRACTIONS: Attraction[] = [
  {
    id: '1',
    name: 'Sunset Point Beach',
    category: 'Nature',
    distance: '0.5 km',
    description: 'Golden sands and crystal clear waters perfect for evening walks.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Ancient Fort',
    category: 'Culture',
    distance: '2.0 km',
    description: 'A 16th-century fort offering panoramic views of the coastline.',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800&auto=format&fit=crop'
  }
];

const INITIAL_SERVICES: Service[] = [
  { id: '1', name: 'Ayurvedic Spa', description: 'Traditional healing therapies and massages.', icon: 'Sparkles', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800' },
  { id: '2', name: 'Infinity Pool', description: 'Temperature controlled pool with ocean view.', icon: 'Waves', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800' },
  { id: '3', name: 'Spice Route Restaurant', description: 'Authentic Indian and Continental fine dining.', icon: 'Utensils', image: 'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=800' },
  { id: '4', name: 'Fitness Studio', description: 'Modern equipment and yoga sessions.', icon: 'Dumbbell', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800' },
];

const INITIAL_MENU: MenuItem[] = [
  { id: '1', name: 'Paneer Tikka', description: 'Cottage cheese marinated in indian spices and grilled in tandoor.', price: 450, category: 'Starter', isVeg: true, image: 'https://images.unsplash.com/photo-1567188040706-fb8d89541d88?q=80&w=800' },
  { id: '2', name: 'Butter Chicken', description: 'Classic chicken curry in a rich tomato and butter gravy.', price: 650, category: 'Main Course', isVeg: false, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800' },
  { id: '3', name: 'Dal Makhani', description: 'Slow cooked black lentils with kidney beans, butter and cream.', price: 400, category: 'Main Course', isVeg: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800' },
  { id: '4', name: 'Gulab Jamun', description: 'Deep fried milk solids dipped in rose flavored sugar syrup.', price: 250, category: 'Dessert', isVeg: true, image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=800' },
];

const INITIAL_PROMOS: PromoCode[] = [
  { id: '1', code: 'WELCOME20', discountPercent: 20, isActive: true },
  { id: '2', code: 'SUMMER10', discountPercent: 10, isActive: true },
];

const INITIAL_GALLERY: GalleryItem[] = [
  { id: '1', title: 'Grand Lobby', category: 'Interior', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000' },
  { id: '2', title: 'Resort Facade', category: 'Exterior', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000' },
  { id: '3', title: 'Sunset Pool', category: 'Amenities', url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000' },
  { id: '4', title: 'Dining Area', category: 'Dining', url: 'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=1000' },
  { id: '5', title: 'Royal Suite', category: 'Interior', url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000' },
  { id: '6', title: 'Beach Access', category: 'Exterior', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000' },
];

// Helper to manage local storage
const getStorage = <T>(key: string, initial: T): T => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(stored);
};

const setStorage = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// --- API ---

// Rooms
export const getRooms = (): Room[] => getStorage<Room[]>('rooms', INITIAL_ROOMS);
export const saveRoom = (room: Room): void => {
  const rooms = getRooms();
  const index = rooms.findIndex(r => r.id === room.id);
  if (index >= 0) rooms[index] = room;
  else rooms.push(room);
  setStorage('rooms', rooms);
};
export const deleteRoom = (id: string): void => {
  const rooms = getRooms().filter(r => r.id !== id);
  setStorage('rooms', rooms);
};

// Bookings
export const getBookings = (): Booking[] => getStorage<Booking[]>('bookings', []);
export const saveBooking = (booking: Booking): void => {
  const bookings = getBookings();
  const index = bookings.findIndex(b => b.id === booking.id);
  if (index >= 0) bookings[index] = booking;
  else bookings.push(booking);
  setStorage('bookings', bookings);
};

// Attractions
export const getAttractions = (): Attraction[] => getStorage<Attraction[]>('attractions', INITIAL_ATTRACTIONS);
export const saveAttraction = (attraction: Attraction): void => {
    const list = getAttractions();
    const idx = list.findIndex(a => a.id === attraction.id);
    if(idx >= 0) list[idx] = attraction;
    else list.push(attraction);
    setStorage('attractions', list);
}
export const deleteAttraction = (id: string): void => {
  const list = getAttractions().filter(a => a.id !== id);
  setStorage('attractions', list);
};

// Services
export const getServices = (): Service[] => getStorage<Service[]>('services', INITIAL_SERVICES);
export const saveService = (service: Service): void => {
  const list = getServices();
  const idx = list.findIndex(s => s.id === service.id);
  if(idx >= 0) list[idx] = service;
  else list.push(service);
  setStorage('services', list);
}
export const deleteService = (id: string): void => {
  const list = getServices().filter(s => s.id !== id);
  setStorage('services', list);
};

// Menu Items
export const getMenu = (): MenuItem[] => getStorage<MenuItem[]>('menu', INITIAL_MENU);
export const saveMenuItem = (item: MenuItem): void => {
  const list = getMenu();
  const idx = list.findIndex(m => m.id === item.id);
  if(idx >= 0) list[idx] = item;
  else list.push(item);
  setStorage('menu', list);
}
export const deleteMenuItem = (id: string): void => {
  const list = getMenu().filter(m => m.id !== id);
  setStorage('menu', list);
};

// Promo Codes
export const getPromoCodes = (): PromoCode[] => getStorage<PromoCode[]>('promos', INITIAL_PROMOS);
export const savePromoCode = (promo: PromoCode): void => {
  const list = getPromoCodes();
  const idx = list.findIndex(p => p.id === promo.id);
  if(idx >= 0) list[idx] = promo;
  else list.push(promo);
  setStorage('promos', list);
}
export const deletePromoCode = (id: string): void => {
  const list = getPromoCodes().filter(p => p.id !== id);
  setStorage('promos', list);
};

// Gallery
export const getGallery = (): GalleryItem[] => getStorage<GalleryItem[]>('gallery', INITIAL_GALLERY);

// Dashboard
export const getDashboardStats = (): DashboardStats => {
  const bookings = getBookings();
  const totalRevenue = bookings.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + b.totalPrice, 0);
  
  // Mock occupancy calculation
  const totalRooms = getRooms().length;
  const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'checked-in').length;
  const occupancyRate = totalRooms > 0 ? Math.round((activeBookings / (totalRooms * 30)) * 100 * 10) : 0; // Rough calc
  
  // Mock monthly data for chart (Values in INR)
  const monthlyRevenue = [
    { name: 'Jan', value: 450000 },
    { name: 'Feb', value: 380000 },
    { name: 'Mar', value: 520000 },
    { name: 'Apr', value: 490000 },
    { name: 'May', value: 650000 },
    { name: 'Jun', value: 720000 },
  ];

  return {
    totalBookings: bookings.length,
    totalRevenue,
    occupancyRate: 65, // Static mock for better visuals
    monthlyRevenue,
    recentBookings: bookings.slice(-5).reverse()
  };
};