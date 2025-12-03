import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getRooms } from '../services/mockDb';
import { RoomType } from '../types';
import { Wifi, Tv, Coffee, Wind, Users, BedDouble, Maximize } from 'lucide-react';

export const RoomsPage: React.FC = () => {
  const allRooms = getRooms();
  const [filterType, setFilterType] = useState<string>('all');

  const filteredRooms = filterType === 'all' 
    ? allRooms 
    : allRooms.filter(r => r.type === filterType);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return <Wifi size={14} />;
      case 'tv': return <Tv size={14} />;
      case 'ac': return <Wind size={14} />;
      case 'coffee': return <Coffee size={14} />;
      default: return <div className="w-3 h-3 bg-slate-300 rounded-full" />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-slate-900 text-white py-20 text-center">
        <h1 className="text-5xl font-serif font-bold mb-4">Accommodations</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">Discover our collection of elegantly appointed rooms and suites, designed for your ultimate comfort.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        {/* Filters */}
        <div className="flex justify-center mb-12 gap-4 flex-wrap">
          <button 
            onClick={() => setFilterType('all')}
            className={`px-6 py-2 rounded-full border transition-all ${filterType === 'all' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-gold-500'}`}
          >
            All View
          </button>
          {Object.values(RoomType).map(type => (
            <button 
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-2 rounded-full border transition-all ${filterType === type ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-gold-500'}`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Room Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <motion.div 
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={room.images[0]} alt={room.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                  {room.type}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold font-serif">{room.title}</h3>
                  <span className="text-gold-600 font-bold text-xl">₹{room.price.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2 h-10">{room.description}</p>
                
                <div className="flex gap-4 mb-6 text-sm text-slate-400 border-y border-slate-100 py-4">
                  <div className="flex items-center gap-1"><Users size={16}/> {room.capacity}</div>
                  <div className="flex items-center gap-1"><Maximize size={16}/> {room.size} ft²</div>
                  <div className="flex items-center gap-1"><BedDouble size={16}/> {room.bedType}</div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {room.amenities.slice(0, 4).map(a => (
                      <div key={a} className="p-1.5 bg-slate-50 rounded-full text-slate-500" title={a}>
                        {getAmenityIcon(a)}
                      </div>
                    ))}
                  </div>
                  <Link 
                    to={`/booking?room=${room.id}`}
                    className="bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};