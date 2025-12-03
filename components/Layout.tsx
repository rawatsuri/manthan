import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Shield, MessageSquare, Send, Hotel, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';

interface LayoutProps {
  children: React.ReactNode;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([
    { role: 'ai', text: 'Namaste! I am Aurelius, your virtual concierge. How may I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const reply = await sendMessageToGemini(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 mb-4 overflow-hidden flex flex-col border border-slate-200"
            style={{ height: '500px' }}
          >
            <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-serif font-semibold text-lg">Aurelius</h3>
                <p className="text-xs text-slate-400">Virtual Concierge</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50" ref={scrollRef}>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    m.role === 'user' 
                      ? 'bg-gold-500 text-white rounded-br-none' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 p-3 rounded-lg rounded-bl-none shadow-sm text-xs text-slate-500 italic">
                    Thinking...
                  </div>
                </div>
              )}
            </div>
            <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask about rooms, dining..."
                className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-gold-400 outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="bg-slate-900 text-white p-2 rounded-full hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gold-500 text-white p-4 rounded-full shadow-lg hover:bg-gold-600 transition-all hover:scale-110 flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      <nav className="fixed w-full z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-slate-900 p-2.5 rounded text-gold-500 group-hover:bg-gold-500 group-hover:text-slate-900 transition-colors">
                <Hotel size={28} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold tracking-tight text-slate-900 leading-none">LuxeHaven</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Resort & Spa</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/" className="text-slate-600 hover:text-gold-600 font-medium transition-colors text-sm uppercase tracking-wider">Home</Link>
              <Link to="/rooms" className="text-slate-600 hover:text-gold-600 font-medium transition-colors text-sm uppercase tracking-wider">Rooms</Link>
              <Link to="/dining" className="text-slate-600 hover:text-gold-600 font-medium transition-colors text-sm uppercase tracking-wider">Dining</Link>
              <Link to="/services" className="text-slate-600 hover:text-gold-600 font-medium transition-colors text-sm uppercase tracking-wider">Services</Link>
              <Link to="/gallery" className="text-slate-600 hover:text-gold-600 font-medium transition-colors text-sm uppercase tracking-wider">Gallery</Link>
              <Link to="/admin" className="text-xs text-slate-400 hover:text-slate-900 flex items-center gap-1">
                 <Shield size={12} /> Admin
              </Link>
              <Link to="/booking" className="bg-slate-900 text-gold-500 px-8 py-3 rounded-none font-bold hover:bg-gold-500 hover:text-slate-900 transition-colors shadow-lg shadow-slate-900/10 uppercase tracking-widest text-xs">
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-900">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-4 pt-4 pb-8 space-y-2 flex flex-col">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-bold text-slate-700 border-b border-slate-50 hover:bg-slate-50">Home</Link>
                <Link to="/rooms" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-bold text-slate-700 border-b border-slate-50 hover:bg-slate-50">Rooms</Link>
                <Link to="/dining" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-bold text-slate-700 border-b border-slate-50 hover:bg-slate-50">Dining</Link>
                <Link to="/services" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-bold text-slate-700 border-b border-slate-50 hover:bg-slate-50">Services</Link>
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-bold text-slate-700 border-b border-slate-50 hover:bg-slate-50">Admin Portal</Link>
                <Link to="/booking" onClick={() => setIsMenuOpen(false)} className="mt-4 block text-center bg-gold-500 text-white px-3 py-4 rounded-sm font-bold uppercase tracking-widest">Book Your Stay</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow pt-24">
        {children}
      </main>

      <footer className="bg-slate-950 text-slate-400 py-16 border-t-4 border-gold-500">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-white font-serif text-2xl mb-6">LuxeHaven</h3>
            <p className="text-sm leading-relaxed mb-6">Experience the pinnacle of Indian hospitality where modern luxury meets timeless tradition. Your sanctuary awaits.</p>
            <div className="flex gap-4">
               {/* Social placeholders */}
               <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-gold-500 hover:text-white transition-colors cursor-pointer">FB</div>
               <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-gold-500 hover:text-white transition-colors cursor-pointer">IG</div>
               <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-gold-500 hover:text-white transition-colors cursor-pointer">TW</div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/rooms" className="hover:text-gold-500 transition-colors">Accommodations</Link></li>
              <li><Link to="/dining" className="hover:text-gold-500 transition-colors">Fine Dining</Link></li>
              <li><Link to="/services" className="hover:text-gold-500 transition-colors">Spa & Wellness</Link></li>
              <li><Link to="/contact" className="hover:text-gold-500 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><div className="mt-1"><Hotel size={14}/></div> 123 Paradise Road, Goa, India</li>
              <li className="flex items-center gap-2"><div className=""><Utensils size={14}/></div> +91 98765 43210</li>
              <li className="flex items-center gap-2"><div className=""><Send size={14}/></div> reservations@luxehaven.in</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-xs">Newsletter</h4>
            <p className="text-xs mb-4">Subscribe for exclusive offers and seasonal discounts.</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="bg-slate-900 border-none text-white px-4 py-3 rounded-l-sm w-full focus:ring-1 focus:ring-gold-500 outline-none text-sm" />
              <button className="bg-gold-600 text-white px-4 rounded-r-sm hover:bg-gold-500 font-bold uppercase text-xs tracking-wider">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-900 text-center text-xs flex justify-between items-center text-slate-500">
          <span>© {new Date().getFullYear()} LuxeHaven Resort. All rights reserved.</span>
          <span>Made with ❤️ in India</span>
        </div>
      </footer>
      
      <ChatWidget />
    </div>
  );
};