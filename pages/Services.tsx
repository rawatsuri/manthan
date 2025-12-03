import React from 'react';
import { motion } from 'framer-motion';
import { getServices } from '../services/mockDb';
import * as Icons from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const services = getServices();

  const getIcon = (name: string) => {
    // Safety check: Fallback to Sparkles if the icon name is invalid or missing
    // @ts-ignore
    const Icon = (name && Icons[name]) ? Icons[name] : Icons.Sparkles;
    return <Icon size={48} />;
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="relative h-[60vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="Spa" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-950/50" />
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Relax & Rejuvenate</h1>
          <p className="text-xl text-slate-200">World-class amenities at your fingertips.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="space-y-24">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
            >
              <div className="flex-1 w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={service.image || `https://source.unsplash.com/800x600/?${service.name}`} 
                  alt={service.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-6">
                <div className="text-gold-500">
                  {getIcon(service.icon)}
                </div>
                <h2 className="text-4xl font-serif font-bold text-slate-900">{service.name}</h2>
                <p className="text-lg text-slate-600 leading-relaxed">{service.description}</p>
                <button className="text-slate-900 font-bold uppercase tracking-widest text-sm border-b-2 border-slate-900 pb-1 hover:text-gold-600 hover:border-gold-600 transition-colors">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};