import React, { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, BedDouble, Calendar, Users, LogOut,
  Tag, Briefcase, Utensils, Lock, ArrowLeft
} from 'lucide-react';

// Login Screen Component
const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'admin') onLogin();
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=2000" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 w-full max-w-md p-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-xl shadow-2xl text-center">
          <div className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gold-500/20">
            <Lock size={32} className="text-slate-900" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-white mb-2">Manthan Admin</h2>
          <p className="text-slate-300 mb-8 text-sm">Restricted Access • Management Portal</p>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter Passcode (admin)"
              className="w-full bg-white/20 border border-white/30 text-white placeholder-slate-300 p-4 rounded-lg focus:ring-2 focus:ring-gold-500 outline-none transition-all text-center tracking-widest"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
            <button
              onClick={handleLogin}
              className="w-full bg-gold-500 text-slate-900 py-4 rounded-lg font-bold hover:bg-white transition-all uppercase tracking-widest text-sm shadow-lg"
            >
              Authenticate
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <Link to="/" className="text-slate-400 hover:text-white text-sm flex items-center justify-center gap-2 transition-colors">
              <ArrowLeft size={16} /> Return to Website
            </Link>
          </div>
        </div>
        <p className="text-center text-slate-500 text-xs mt-6">© Manthan Secure System</p>
      </div>
    </div>
  );
};

// Admin Layout with Sidebar
export const AdminLayout: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white hidden md:flex flex-col shrink-0">
        <div className="p-8">
          <h2 className="text-2xl font-serif font-bold tracking-tight text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-gold-500 rounded-sm flex items-center justify-center text-slate-900 text-sm font-bold">M</div>
            Manthan
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <NavLink to="/admin" end className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-sm transition-all ${isActive ? 'bg-gold-500 text-slate-900 font-bold shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>

          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Management</div>

          <NavLink to="/admin/rooms" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-sm transition-all ${isActive ? 'bg-gold-500 text-slate-900 font-bold shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <BedDouble size={20} /> Rooms
          </NavLink>
          <NavLink to="/admin/bookings" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-sm transition-all ${isActive ? 'bg-gold-500 text-slate-900 font-bold shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <Calendar size={20} /> Bookings
          </NavLink>
          <NavLink to="/admin/menu" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-sm transition-all ${isActive ? 'bg-gold-500 text-slate-900 font-bold shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <Utensils size={20} /> Dining Menu
          </NavLink>
          <NavLink to="/admin/services" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-sm transition-all ${isActive ? 'bg-gold-500 text-slate-900 font-bold shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <Briefcase size={20} /> Services & Attractions
          </NavLink>

          <div className="pt-4 pb-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Marketing</div>

          <NavLink to="/admin/promos" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-sm transition-all ${isActive ? 'bg-gold-500 text-slate-900 font-bold shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <Tag size={20} /> Promo Codes
          </NavLink>
          <NavLink to="/admin/customers" className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-sm transition-all ${isActive ? 'bg-gold-500 text-slate-900 font-bold shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <Users size={20} /> Customers
          </NavLink>
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-3 text-slate-400 hover:text-red-400 w-full transition-colors">
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-full">
        <header className="bg-white border-b border-slate-200 p-4 md:p-6 sticky top-0 z-30 flex justify-between items-center shadow-sm">
          <div className="md:hidden font-bold text-xl font-serif">Manthan</div>
          <div className="hidden md:block text-slate-500 text-sm">Welcome back, Administrator.</div>
          <div className="flex items-center gap-4">
            <Link to="/" target="_blank" className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-gold-600">View Site</Link>
            <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center text-gold-700">
              <Users size={16}/>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
