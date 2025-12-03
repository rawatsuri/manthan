import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getGallery } from '../services/mockDb';

export const GalleryPage: React.FC = () => {
  const images = getGallery();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-slate-900 text-white py-20 text-center">
        <h1 className="text-5xl font-serif font-bold mb-4">Gallery</h1>
        <p className="text-slate-400">Glimpses of paradise.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((img) => (
            <motion.div 
              key={img.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(img.url)}
              className="break-inside-avoid rounded-xl overflow-hidden cursor-zoom-in shadow-lg"
            >
              <img src={img.url} alt={img.title} className="w-full h-auto" />
              <div className="p-4 bg-white">
                <h3 className="font-serif font-bold">{img.title}</h3>
                <p className="text-xs text-gold-600 uppercase">{img.category}</p>
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
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white hover:text-gold-500">
              <X size={40} />
            </button>
            <img 
              src={selectedImage} 
              alt="Full view" 
              className="max-w-full max-h-[90vh] rounded shadow-2xl" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};