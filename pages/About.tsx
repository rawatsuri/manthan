import React from 'react';
import { motion } from 'framer-motion';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2500" alt="Resort Exterior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">Our Legacy</h1>
          <p className="text-xl text-gold-400 font-light">A Tale of Friendship, Passion, and Hospitality</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-24">
        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
             <span className="text-gold-600 font-bold tracking-[0.2em] uppercase text-xs">The Beginning</span>
             <h2 className="text-4xl font-serif font-bold text-slate-900 mt-3 mb-6">Born from a Dream</h2>
             <p className="text-slate-600 leading-relaxed text-lg mb-6">
               Manthan Resort is more than just a luxury destination; it is the realization of a vision shared by two childhood friends, Arjun Malhotra and Vikram Singh. Growing up in the vibrant streets of Mumbai, they often dreamt of creating a sanctuary that would showcase the true essence of Indian hospitality to the world.
             </p>
             <p className="text-slate-600 leading-relaxed text-lg">
               After years of traveling the globe and gaining expertise in international hospitality, they returned to their roots. They chose the pristine shores of Goa to build Manthan—a place where the warmth of tradition seamlessly blends with modern grandeur.
             </p>
          </div>
          <div className="relative">
             <div className="absolute -inset-4 border-2 border-gold-500/30 rounded-lg transform translate-x-4 translate-y-4"></div>
             <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000" className="w-full h-auto rounded-lg shadow-2xl relative z-10" alt="Resort" />
          </div>
        </div>

        {/* Founders */}
        <div className="text-center mb-16">
           <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6">Meet the Visionaries</h2>
           <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
           <motion.div 
             whileHover={{ y: -10 }}
             className="bg-slate-50 p-8 rounded-xl border border-slate-100 text-center group hover:bg-white hover:shadow-xl transition-all"
           >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
                 <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" alt="Arjun" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">Arjun Malhotra</h3>
              <p className="text-xs text-gold-600 font-bold uppercase tracking-wider mb-4">Co-Founder & Managing Director</p>
              <p className="text-slate-600 italic">"We didn't just want to build a hotel. We wanted to build a feeling—a sense of coming home, but to a home more magical than you ever imagined."</p>
           </motion.div>

           <motion.div 
             whileHover={{ y: -10 }}
             className="bg-slate-50 p-8 rounded-xl border border-slate-100 text-center group hover:bg-white hover:shadow-xl transition-all"
           >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
                 <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400" alt="Vikram" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">Vikram Singh</h3>
              <p className="text-xs text-gold-600 font-bold uppercase tracking-wider mb-4">Co-Founder & Head of Operations</p>
              <p className="text-slate-600 italic">"Luxury is in the details. From the thread count of the linens to the spice blend in our curries, every element at Manthan is curated with love."</p>
           </motion.div>
        </div>

        {/* Mission */}
        <div className="mt-24 bg-slate-900 text-white p-12 rounded-2xl text-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl font-serif font-bold mb-6">Our Promise</h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                 To offer every guest an experience that transcends the ordinary. At Manthan, you are not just a customer; you are family. We promise to serve you with the ancient Indian philosophy of "Atithi Devo Bhava"—The Guest is God.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};