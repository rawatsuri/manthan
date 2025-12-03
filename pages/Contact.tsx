import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 text-white py-20 text-center">
        <h1 className="text-5xl font-serif font-bold mb-4">Contact Us</h1>
        <p className="text-slate-400">We are here to assist you.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">Get in Touch</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                <input className="w-full p-3 bg-white border border-slate-200 rounded focus:border-gold-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                <input className="w-full p-3 bg-white border border-slate-200 rounded focus:border-gold-500 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
              <input type="email" className="w-full p-3 bg-white border border-slate-200 rounded focus:border-gold-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
              <textarea rows={5} className="w-full p-3 bg-white border border-slate-200 rounded focus:border-gold-500 outline-none"></textarea>
            </div>
            <button className="bg-gold-500 text-slate-900 px-8 py-3 rounded font-bold hover:bg-gold-400 flex items-center gap-2">
              <Send size={18} /> Send Message
            </button>
          </form>

          <div className="mt-12 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-900"><Phone size={20}/></div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Phone</p>
                <p className="text-lg font-serif">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-900"><Mail size={20}/></div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Email</p>
                <p className="text-lg font-serif">reservations@luxehaven.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-900"><MapPin size={20}/></div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Address</p>
                <p className="text-lg font-serif">123 Paradise Road, Beverly Hills, CA</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full min-h-[400px] bg-slate-200 rounded-2xl overflow-hidden relative">
          {/* Mock Map */}
          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-white p-4 rounded shadow-xl animate-bounce">
                <MapPin size={32} className="text-red-500" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};