import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ArrowRight, MapPin, Star, Wifi, Tv, Wind } from 'lucide-react';
import { getRooms, getAttractions } from '../services/mockDb';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=80",
  "https://images.unsplash.com/photo-1571003123894-1ac16e790554?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=80"
];

export const Home: React.FC = () => {
  const featuredRooms = getRooms().filter(r => r.featured).slice(0, 3);
  const attractions = getAttractions();
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Date logic for Quick Bar
  const today = new Date().toISOString().split('T')[0];
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState('');

  // Hero Slider Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Attraction Scroll Logic
  const scrollAttractions = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="overflow-hidden bg-slate-50 font-sans">
      {/* Dynamic Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={currentHeroIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={HERO_IMAGES[currentHeroIndex]} 
              alt="Luxury Hotel" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-slate-900/90" />
          </motion.div>
        </AnimatePresence>
        
        <div className="relative z-10 px-4 max-w-5xl mx-auto space-y-8 mt-16">
          <motion.div
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 1 }}
          >
             <span className="text-gold-400 uppercase tracking-[0.4em] text-xs md:text-sm font-bold mb-6 block drop-shadow-md">
               Welcome to Paradise
             </span>
             <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
               Manthan
             </h1>
             <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
          </motion.div>

          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-2xl text-slate-100 font-light tracking-wide max-w-2xl mx-auto drop-shadow-md font-serif italic"
          >
            "Where Indian hospitality meets world-class luxury."
          </motion.p>
          
          <motion.div
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 1, delay: 0.6 }}
             className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-8"
          >
            <Link 
              to="/booking" 
              className="bg-gold-500 text-slate-900 px-12 py-4 rounded-sm font-bold text-lg hover:bg-white transition-all shadow-xl uppercase tracking-widest border border-gold-500"
            >
              Book Now
            </Link>
          </motion.div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {HERO_IMAGES.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentHeroIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentHeroIndex ? 'bg-gold-500 w-8' : 'bg-white/50 hover:bg-white'}`}
            />
          ))}
        </div>
      </section>

      {/* Booking Bar - Fixed Responsiveness & Overlapping */}
      <div className="relative z-30 -mt-20 md:-mt-24 px-4 mb-24 max-w-7xl mx-auto">
        <div className="bg-white rounded-sm shadow-2xl p-6 md:p-10 flex flex-col lg:flex-row gap-6 items-end border-t-4 border-gold-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 w-full">
            <div className="border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-6">
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Check In</label>
               <input 
                  type="date" 
                  min={today}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full outline-none font-serif text-xl text-slate-800 bg-transparent cursor-pointer" 
               />
            </div>
            <div className="border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-6">
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Check Out</label>
               <input 
                  type="date" 
                  min={checkIn}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full outline-none font-serif text-xl text-slate-800 bg-transparent cursor-pointer" 
               />
            </div>
            <div className="pb-4 md:pb-0">
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Guests</label>
               <select className="w-full outline-none font-serif text-xl text-slate-800 bg-transparent border-none p-0 focus:ring-0 cursor-pointer">
                 <option>2 Adults</option>
                 <option>1 Adult</option>
                 <option>Family (2A + 2C)</option>
               </select>
            </div>
          </div>
          <Link to="/booking" className="w-full lg:w-auto bg-slate-900 text-gold-500 px-12 py-5 hover:bg-slate-800 transition-colors text-center font-bold uppercase tracking-widest text-sm whitespace-nowrap shadow-lg">
            Check Availability
          </Link>
        </div>
      </div>

      {/* Featured Rooms - Eye Catching Design */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-gold-600 font-bold tracking-[0.2em] uppercase text-xs">Royal Living</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mt-3 mb-6">Our Signature Suites</h2>
            <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredRooms.map((room, i) => (
              <motion.div 
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-[500px] overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                   <img src={room.images[0]} alt={room.title} className="w-full h-full object-cover" />
                </div>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white transform transition-transform duration-500">
                   <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     <span className="bg-gold-500 text-slate-900 text-[10px] font-bold px-2 py-1 uppercase tracking-wider mb-3 inline-block rounded-sm">
                       {room.type}
                     </span>
                     <h3 className="text-3xl font-serif font-bold mb-2 leading-tight">{room.title}</h3>
                     <div className="flex items-center gap-2 mb-4 text-gold-400">
                        <span className="text-xl font-bold">₹{room.price.toLocaleString('en-IN')}</span>
                        <span className="text-xs text-slate-300 font-light">/ night</span>
                     </div>
                     
                     <p className="text-slate-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                       {room.description}
                     </p>

                     <Link to={`/booking?room=${room.id}`} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gold-400 hover:text-white transition-colors">
                       Book This Room <ArrowRight size={16} />
                     </Link>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
             <Link to="/rooms" className="inline-block border border-slate-900 text-slate-900 px-10 py-3 font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all text-sm">
                View All Accommodations
             </Link>
          </div>
        </div>
      </section>

      {/* Interactive Attractions Carousel */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
             <div className="max-w-2xl">
                <span className="text-gold-500 font-bold tracking-wider uppercase text-sm">Explore Goa</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2">Nearby Attractions</h2>
                <p className="text-slate-400 mt-4 text-lg">Swipe to discover the hidden gems surrounding Manthan Resort.</p>
             </div>
             <div className="flex gap-4">
               <button onClick={() => scrollAttractions('left')} className="p-4 rounded-full border border-slate-700 hover:bg-gold-500 hover:border-gold-500 hover:text-slate-900 transition-all">
                 <ChevronLeft size={24} />
               </button>
               <button onClick={() => scrollAttractions('right')} className="p-4 rounded-full border border-slate-700 hover:bg-gold-500 hover:border-gold-500 hover:text-slate-900 transition-all">
                 <ChevronRight size={24} />
               </button>
             </div>
          </div>
          
          {/* Scroll Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {attractions.map((att, idx) => (
               <div key={att.id} className="min-w-[300px] md:min-w-[400px] snap-center">
                  <div className="group relative h-[450px] rounded-xl overflow-hidden cursor-pointer shadow-xl">
                    <img src={att.image} alt={att.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                    
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                       <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block border border-white/30">
                         {att.category}
                       </span>
                       <h3 className="text-2xl font-serif font-bold mb-2 group-hover:text-gold-400 transition-colors">{att.name}</h3>
                       <div className="flex items-center gap-2 text-sm text-slate-300 mb-3">
                          <MapPin size={14} className="text-gold-500" /> {att.distance} away
                       </div>
                       <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                         {att.description}
                       </p>
                    </div>
                  </div>
               </div>
            ))}
             {/* Spacer for right padding */}
             <div className="min-w-[50px] h-10"></div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gold-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <div className="flex justify-center gap-1 mb-6">
             {[1,2,3,4,5].map(s => <Star key={s} size={20} className="fill-gold-500 text-gold-500" />)}
           </div>
           <blockquote className="text-3xl md:text-5xl font-serif font-medium text-slate-900 leading-snug mb-8">
             "An absolute dream. The attention to detail, the service, and the beauty of the location made this the best vacation of my life."
           </blockquote>
           <cite className="not-italic">
             <span className="block font-bold text-slate-900 uppercase tracking-widest text-sm">Aditya & Priya Sharma</span>
             <span className="text-slate-500 text-xs uppercase tracking-wider">Delhi, India</span>
           </cite>
        </div>
      </section>
    </div>
  );
};