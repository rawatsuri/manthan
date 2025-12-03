import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ArrowRight, MapPin, Star, Wifi, Tv, Wind, Coffee, ShieldCheck, UserCheck, Palmtree } from 'lucide-react';
import { getRooms, getAttractions } from '../services/mockDb';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=80",
  "https://images.unsplash.com/photo-1571003123894-1ac16e790554?ixlib=rb-4.0.3&auto=format&fit=crop&w=2500&q=80"
];

const FOUNDERS = [
  {
    name: "Arjun Malhotra",
    role: "Co-Founder & Managing Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    quote: "We wanted to create a sanctuary that honors Indian traditions while embracing modern luxury."
  },
  {
    name: "Vikram Singh",
    role: "Co-Founder & Head of Operations",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    quote: "Service is not just about fulfilling requests, it's about anticipating needs before they arise."
  }
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
  const [guests, setGuests] = useState(2);

  // Hero Slider Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Set checkout to next day when checkin changes
  useEffect(() => {
      if (checkIn && !checkOut) {
          const d = new Date(checkIn);
          d.setDate(d.getDate() + 1);
          setCheckOut(d.toISOString().split('T')[0]);
      }
  }, [checkIn]);

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
    <div className="overflow-x-hidden bg-slate-50 font-sans">
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
        <div className="absolute bottom-32 md:bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {HERO_IMAGES.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentHeroIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentHeroIndex ? 'bg-gold-500 w-8' : 'bg-white/50 hover:bg-white'}`}
            />
          ))}
        </div>
      </section>

      {/* Booking Bar - Fixed Z-Index & Overflow */}
      <div className="relative z-50 -mt-20 md:-mt-24 px-4 mb-24 max-w-7xl mx-auto">
        <div className="bg-white rounded-sm shadow-2xl p-6 md:p-10 flex flex-col lg:flex-row gap-6 items-end border-t-4 border-gold-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 w-full">
            <div className="border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-6 relative">
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Check In</label>
               <input 
                  type="date" 
                  min={today}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full outline-none font-serif text-xl text-slate-800 bg-transparent cursor-pointer" 
                  style={{ position: 'relative', zIndex: 60 }}
               />
            </div>
            <div className="border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-6 relative">
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Check Out</label>
               <input 
                  type="date" 
                  min={checkIn}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full outline-none font-serif text-xl text-slate-800 bg-transparent cursor-pointer" 
                  style={{ position: 'relative', zIndex: 60 }}
               />
            </div>
            <div className="pb-4 md:pb-0">
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Guests</label>
               <select 
                  value={guests}
                  onChange={e => setGuests(parseInt(e.target.value))}
                  className="w-full outline-none font-serif text-xl text-slate-800 bg-transparent border-none p-0 focus:ring-0 cursor-pointer"
               >
                 <option value={2}>2 Adults</option>
                 <option value={1}>1 Adult</option>
                 <option value={3}>3 Adults</option>
                 <option value={4}>4 Adults</option>
               </select>
            </div>
          </div>
          <Link 
            to={`/booking?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
            className="w-full lg:w-auto bg-slate-900 text-gold-500 px-12 py-5 hover:bg-slate-800 transition-colors text-center font-bold uppercase tracking-widest text-sm whitespace-nowrap shadow-lg"
          >
            Check Availability
          </Link>
        </div>
      </div>

      {/* About / Founders Section */}
      <section className="py-20 bg-white">
         <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
               <div>
                  <span className="text-gold-600 font-bold tracking-[0.2em] uppercase text-xs">Our Story</span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mt-3 mb-6">Born from a Vision</h2>
                  <p className="text-slate-600 leading-relaxed text-lg mb-6">
                    Manthan Resort isn't just a hotel; it's a culmination of a lifelong dream shared by two friends, 
                    Arjun and Vikram. Their journey began twenty years ago with a simple promise: to build a sanctuary 
                    that blends the warmth of Indian hospitality with the grandeur of world-class luxury.
                  </p>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Nestled on the pristine coasts of Goa, Manthan stands as a testament to their dedication to perfection.
                    Every stone, every fabric, and every flavor has been handpicked to ensure your stay is nothing short of magical.
                  </p>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="mt-8">
                     <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800" className="w-full h-64 object-cover rounded-sm shadow-lg" alt="Interior"/>
                  </div>
                  <div>
                     <img src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800" className="w-full h-64 object-cover rounded-sm shadow-lg" alt="Exterior"/>
                  </div>
               </div>
            </div>

            <h3 className="text-center text-3xl font-serif font-bold text-slate-900 mb-12">Meet the Visionaries</h3>
            <div className="grid md:grid-cols-2 gap-12">
               {FOUNDERS.map((founder, i) => (
                 <div key={i} className="flex flex-col md:flex-row gap-6 items-center bg-slate-50 p-8 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <img src={founder.image} alt={founder.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
                    <div className="text-center md:text-left">
                       <h4 className="text-xl font-bold text-slate-900">{founder.name}</h4>
                       <span className="text-xs text-gold-600 font-bold uppercase tracking-wider block mb-3">{founder.role}</span>
                       <p className="text-slate-500 italic text-sm">"{founder.quote}"</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Why Choose Us - Amenities */}
      <section className="py-20 bg-slate-900 text-white">
         <div className="max-w-7xl mx-auto px-4">
             <div className="text-center mb-16">
                <span className="text-gold-500 font-bold tracking-[0.2em] uppercase text-xs">Experience More</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3">Unmatched Amenities</h2>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                 <div className="p-6 border border-slate-800 rounded-lg hover:border-gold-500 transition-colors group">
                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gold-500 group-hover:bg-gold-500 group-hover:text-slate-900 transition-colors">
                       <Palmtree size={24} />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Private Beach</h4>
                    <p className="text-slate-400 text-xs">Exclusive access to pristine sands.</p>
                 </div>
                 <div className="p-6 border border-slate-800 rounded-lg hover:border-gold-500 transition-colors group">
                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gold-500 group-hover:bg-gold-500 group-hover:text-slate-900 transition-colors">
                       <UserCheck size={24} />
                    </div>
                    <h4 className="font-bold text-lg mb-2">24/7 Butler</h4>
                    <p className="text-slate-400 text-xs">Personalized service at any hour.</p>
                 </div>
                 <div className="p-6 border border-slate-800 rounded-lg hover:border-gold-500 transition-colors group">
                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gold-500 group-hover:bg-gold-500 group-hover:text-slate-900 transition-colors">
                       <Coffee size={24} />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Gourmet Dining</h4>
                    <p className="text-slate-400 text-xs">Award-winning culinary experiences.</p>
                 </div>
                 <div className="p-6 border border-slate-800 rounded-lg hover:border-gold-500 transition-colors group">
                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gold-500 group-hover:bg-gold-500 group-hover:text-slate-900 transition-colors">
                       <ShieldCheck size={24} />
                    </div>
                    <h4 className="font-bold text-lg mb-2">Top Security</h4>
                    <p className="text-slate-400 text-xs">Your safety is our priority.</p>
                 </div>
             </div>
         </div>
      </section>
      
      {/* Video Parallax Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
         <video 
           autoPlay 
           loop 
           muted 
           playsInline 
           className="absolute inset-0 w-full h-full object-cover"
           poster="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000"
         >
             <source src="https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-black/40" />
         <div className="relative z-10 text-center px-4">
             <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Reconnect with Nature</h2>
             <Link to="/gallery" className="inline-block border-2 border-white text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-colors">
                 View Gallery
             </Link>
         </div>
      </section>

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
                className="group relative h-[500px] overflow-hidden cursor-pointer rounded-lg shadow-xl"
              >
                {/* Background Image */}
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                   <img src={room.images[0]} alt={room.title} className="w-full h-full object-cover" />
                </div>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 transition-opacity" />

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