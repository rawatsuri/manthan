import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Users, CreditCard, BedDouble, Calendar } from 'lucide-react';
import { getDashboardStats } from '../services/mockDb';
import { DashboardStats } from '../types';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    setStats(getDashboardStats());
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-serif font-bold text-slate-800">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Bookings</p>
            <p className="text-2xl font-bold text-slate-800">{stats.totalBookings}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <CreditCard size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Revenue</p>
            <p className="text-2xl font-bold text-slate-800">₹{stats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
            <BedDouble size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Occupancy Rate</p>
            <p className="text-2xl font-bold text-slate-800">{stats.occupancyRate}%</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">New Customers</p>
            <p className="text-2xl font-bold text-slate-800">+12%</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-96">
          <h3 className="text-lg font-semibold mb-4 text-slate-800">Revenue Trends</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.monthlyRevenue}>
              <defs>
                <linearGradient id="colorRv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EAB308" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#EAB308" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#EAB308" fillOpacity={1} fill="url(#colorRv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-96">
          <h3 className="text-lg font-semibold mb-4 text-slate-800">Bookings by Month</h3>
           <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="value" fill="#1e293b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};