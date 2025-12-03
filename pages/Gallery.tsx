import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { getGallery } from '../services/mockDb';

export const GalleryPage: React.FC = () => {
  const images = getGallery();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-slate-900 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 relative z-10">Visual Journey</h1>
        <p className="text-slate-400 text-lg relative z-10">Glimpses of paradise, captured in time.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16">
        {/* Masonry Layout using Columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((img, idx) => (
            <motion.div 
              key={img.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-zoom-in shadow-lg mb-8"
              onClick={() => setSelectedImage(img.url)}
            >
              <img src={img.url} alt={img.title} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 delay-100" size={32} />
              </div>

              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-serif font-bold text-white text-lg">{img.title}</h3>
                <p className="text-xs text-gold-400 uppercase tracking-widest">{img.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white hover:text-gold-500 bg-white/10 p-2 rounded-full transition-colors">
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={selectedImage} 
              alt="Full view" 
              className="max-w-full max-h-[90vh] rounded shadow-2xl border-4 border-white"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};