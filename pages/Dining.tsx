import React from 'react';
import { motion } from 'framer-motion';
import { getMenu } from '../services/mockDb';

export const DiningPage: React.FC = () => {
  const menu = getMenu();
  const categories = ['Starter', 'Main Course', 'Dessert', 'Beverage'];

  return (
    <div className="bg-white min-h-screen pb-20">
       {/* Hero */}
       <div className="relative h-[60vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=2000" alt="Dining" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>
        <div className="relative z-10 px-4">
          <span className="text-gold-500 uppercase tracking-[0.3em] text-sm font-bold mb-4 block">The Spice Route</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Culinary Excellence</h1>
          <p className="text-xl text-slate-200 font-light">A symphony of flavors from across India and the globe.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-24">
         <div className="text-center mb-16">
            <p className="text-slate-600 leading-relaxed text-lg">
                Our award-winning chefs source the finest local ingredients to create dishes that are both authentic and innovative.
                Whether you crave the spicy notes of the South or the rich gravies of the North, The Spice Route promises an unforgettable dining experience.
            </p>
         </div>

         {categories.map((category) => {
             const items = menu.filter(m => m.category === category);
             if (items.length === 0) return null;

             return (
                 <div key={category} className="mb-16">
                     <h3 className="text-3xl font-serif font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4 flex items-center gap-4">
                         {category}
                     </h3>
                     <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                         {items.map((item) => (
                             <motion.div 
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex gap-4 group"
                             >
                                 <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-full border-2 border-slate-100">
                                     <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                 </div>
                                 <div className="flex-1">
                                     <div className="flex justify-between items-baseline mb-1 border-b border-dashed border-slate-300 pb-1">
                                         <h4 className="text-xl font-serif font-bold text-slate-800">{item.name}</h4>
                                         <span className="text-gold-600 font-bold">₹{item.price}</span>
                                     </div>
                                     <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} title={item.isVeg ? "Vegetarian" : "Non-Vegetarian"}/>
                                        <p className="text-slate-500 text-sm italic">{item.description}</p>
                                     </div>
                                 </div>
                             </motion.div>
                         ))}
                     </div>
                 </div>
             )
         })}
      </div>
    </div>
  );
};