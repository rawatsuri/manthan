import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Calendar, User, CreditCard, Printer, ShieldCheck, ArrowLeft, Building2, AlertCircle } from 'lucide-react';
import { getRooms, saveBooking, getPromoCodes } from '../services/mockDb';
import { Room, Booking, PromoCode } from '../types';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export const BookingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rooms = getRooms();
  const allPromos = getPromoCodes();
  
  const today = new Date().toISOString().split('T')[0];
  const getTomorrow = (dateStr: string) => {
      const d = new Date(dateStr);
      d.setDate(d.getDate() + 1);
      return d.toISOString().split('T')[0];
  };

  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  
  // Default dates
  const [dates, setDates] = useState({ checkIn: today, checkOut: getTomorrow(today) });
  const [guestDetails, setGuestDetails] = useState({ name: '', email: '', phone: '', guests: 1 });
  
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [bookingId, setBookingId] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'hotel' | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roomId = params.get('room');
    const paramCheckIn = params.get('checkIn');
    const paramCheckOut = params.get('checkOut');
    const paramGuests = params.get('guests');

    if (roomId) {
      const room = rooms.find(r => r.id === roomId);
      if (room) {
        setSelectedRoom(room);
        setStep(2); 
      }
    }

    if (paramCheckIn) {
        const validCheckIn = paramCheckIn >= today ? paramCheckIn : today;
        const validCheckOut = paramCheckOut && paramCheckOut > validCheckIn ? paramCheckOut : getTomorrow(validCheckIn);
        setDates({ checkIn: validCheckIn, checkOut: validCheckOut });
    }
    if (paramGuests) {
        setGuestDetails(prev => ({ ...prev, guests: parseInt(paramGuests) || 1 }));
    }
  }, [location, rooms]);

  const handleCheckInChange = (date: string) => {
      if (!date) return;
      const nextDayStr = getTomorrow(date);
      setDates({ checkIn: date, checkOut: nextDayStr });
      setErrors(prev => ({ ...prev, checkIn: '', checkOut: '' }));
  };

  const validateStep2 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!guestDetails.name.trim()) newErrors.name = "Name is required";
    if (!guestDetails.email.trim() || !guestDetails.email.includes('@')) newErrors.email = "Valid email is required";
    if (!guestDetails.phone.trim() || guestDetails.phone.length < 10) newErrors.phone = "Valid 10-digit phone required";
    
    if (!dates.checkIn) newErrors.checkIn = "Check-in required";
    if (!dates.checkOut) newErrors.checkOut = "Check-out required";
    
    if (selectedRoom && (guestDetails.guests > selectedRoom.capacity)) {
        newErrors.guests = `Max capacity is ${selectedRoom.capacity}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    console.log("Next Clicked. Current Step:", step);
    
    if (step === 2) {
        if (validateStep2()) {
            setStep(3);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Add a small delay for the alert to ensure render cycle is done
            setTimeout(() => alert("Please fix the errors marked in red."), 10);
        }
    } else {
        setStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const handleApplyPromo = () => {
    const code = allPromos.find(p => p.code === promoCode && p.isActive);
    if (code) {
      setAppliedPromo(code);
      setErrors(prev => ({...prev, promo: ''}));
    } else {
      setErrors(prev => ({...prev, promo: 'Invalid promo code'}));
    }
  };

  const calculateTotal = () => {
    if (!selectedRoom || !dates.checkIn || !dates.checkOut) return 0;
    const start = new Date(dates.checkIn);
    const end = new Date(dates.checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return Math.max(nights, 1) * selectedRoom.price;
  };

  const subtotal = calculateTotal();
  const discount = appliedPromo ? (subtotal * appliedPromo.discountPercent / 100) : 0;
  const total = subtotal - discount;

  const completeBooking = (method: 'razorpay' | 'other', status: 'paid' | 'unpaid') => {
      const newId = Math.random().toString(36).substr(2, 9).toUpperCase();
      const newBooking: Booking = {
        id: newId,
        roomId: selectedRoom!.id,
        roomTitle: selectedRoom!.title,
        customerName: guestDetails.name,
        customerEmail: guestDetails.email,
        customerPhone: guestDetails.phone,
        checkIn: dates.checkIn,
        checkOut: dates.checkOut,
        guests: guestDetails.guests,
        subtotal: subtotal,
        discount: discount,
        totalPrice: total,
        status: 'confirmed',
        paymentStatus: status,
        paymentMethod: method,
        createdAt: new Date().toISOString()
      };
      
      saveBooking(newBooking);
      setBookingId(newId);
      setStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleRazorpayPayment = () => {
    setPaymentMethod('razorpay');
    const confirmed = window.confirm(`[RAZORPAY GATEWAY SIMULATION]\n\nProcessing payment of ₹${total.toLocaleString('en-IN')}\n\nClick OK to simulate success.`);
    if (confirmed) completeBooking('razorpay', 'paid');
  };

  const handlePayAtHotel = () => {
      setPaymentMethod('hotel');
      completeBooking('other', 'unpaid');
  }

  const steps = [
    { id: 1, name: 'Room', icon: <User size={18}/> },
    { id: 2, name: 'Details', icon: <Calendar size={18}/> },
    { id: 3, name: 'Payment', icon: <CreditCard size={18}/> },
    { id: 4, name: 'Confirmed', icon: <Check size={18}/> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Progress Bar */}
        <div className="flex justify-between mb-12 relative max-w-2xl mx-auto">
          <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 -z-0 -translate-y-1/2"></div>
          {steps.map((s) => (
            <div key={s.id} className={`relative z-10 flex flex-col items-center gap-2 ${step >= s.id ? 'text-slate-900' : 'text-slate-400'}`}>
              <div className={`w-10 h-10 flex items-center justify-center transition-colors duration-300 rounded-full border-2 ${
                step >= s.id ? 'bg-slate-900 text-gold-500 border-slate-900' : 'bg-white border-slate-200'
              }`}>
                {s.icon}
              </div>
              <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest">{s.name}</span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white shadow-2xl rounded-sm min-h-[600px] flex flex-col border-t-4 border-gold-500 overflow-hidden">
          
          {/* Step 1: Room Selection */}
          {step === 1 && (
             <div className="p-6 md:p-10 animate-fade-in">
               <h2 className="text-3xl font-serif font-bold mb-8 text-center text-slate-900">Choose Your Accommodation</h2>
               <div className="grid gap-8">
                 {rooms.map(room => (
                   <motion.div 
                    key={room.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => { setSelectedRoom(room); setStep(2); window.scrollTo({top:0, behavior:'smooth'}); }}
                    className="flex flex-col lg:flex-row border border-slate-100 cursor-pointer shadow-sm hover:shadow-xl transition-all group rounded-lg overflow-hidden"
                   >
                     <div className="w-full lg:w-96 h-64 bg-slate-200 overflow-hidden">
                        <img 
                          src={room.images?.[0]} 
                          alt={room.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                     </div>
                     <div className="p-6 flex-1 flex flex-col justify-between">
                       <div>
                         <div className="flex justify-between items-start mb-2">
                           <h3 className="text-2xl font-serif font-bold group-hover:text-gold-600 transition-colors">{room.title}</h3>
                           <span className="text-gold-600 font-bold text-2xl">₹{room.price.toLocaleString('en-IN')}</span>
                         </div>
                         <p className="text-slate-500 text-sm leading-relaxed">{room.description}</p>
                       </div>
                       <div className="mt-6 flex justify-between items-center">
                          <div className="flex gap-2 flex-wrap">
                            {room.amenities.slice(0,4).map(a => (
                              <span key={a} className="bg-slate-50 text-slate-600 text-xs px-3 py-1 uppercase tracking-wider rounded-sm">{a}</span>
                            ))}
                          </div>
                          <button className="bg-slate-900 text-white px-6 py-2 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-gold-500 hover:text-slate-900 transition-colors">Select Room</button>
                       </div>
                     </div>
                   </motion.div>
                 ))}
               </div>
             </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="p-8 max-w-4xl mx-auto w-full animate-fade-in">
               <div className="flex items-center gap-4 mb-8">
                 <button onClick={() => setStep(1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><ArrowLeft size={20}/></button>
                 <h2 className="text-3xl font-serif font-bold text-slate-900">Guest Details</h2>
               </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Dates */}
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                    <h3 className="font-bold text-slate-700 uppercase text-xs tracking-wider mb-4 border-b pb-2">Stay Dates</h3>
                    <div className="space-y-4">
                        <div className="relative">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Check In</label>
                            <input 
                                type="date" 
                                min={today}
                                className={`w-full p-3 border rounded focus:border-gold-500 outline-none bg-white cursor-pointer ${errors.checkIn ? 'border-red-500' : 'border-slate-300'}`} 
                                value={dates.checkIn}
                                onChange={e => handleCheckInChange(e.target.value)}
                            />
                            {errors.checkIn && <span className="text-red-500 text-xs mt-1 block">{errors.checkIn}</span>}
                        </div>
                        <div className="relative">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Check Out</label>
                            <input 
                                type="date" 
                                min={getTomorrow(dates.checkIn || today)}
                                className={`w-full p-3 border rounded focus:border-gold-500 outline-none bg-white cursor-pointer ${errors.checkOut ? 'border-red-500' : 'border-slate-300'}`}
                                value={dates.checkOut}
                                onChange={e => {
                                    setDates({...dates, checkOut: e.target.value});
                                    setErrors({...errors, checkOut: ''});
                                }}
                            />
                            {errors.checkOut && <span className="text-red-500 text-xs mt-1 block">{errors.checkOut}</span>}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Guests</label>
                            <input 
                                type="number"
                                min="1"
                                max={selectedRoom?.capacity || 4}
                                className={`w-full p-3 border rounded focus:border-gold-500 outline-none bg-white ${errors.guests ? 'border-red-500' : 'border-slate-300'}`}
                                value={guestDetails.guests}
                                onChange={e => {
                                    const val = parseInt(e.target.value);
                                    setGuestDetails({...guestDetails, guests: isNaN(val) ? 1 : val});
                                    setErrors({...errors, guests: ''});
                                }}
                            />
                            {errors.guests && <span className="text-red-500 text-xs mt-1 block">{errors.guests}</span>}
                        </div>
                    </div>
                </div>

                {/* Personal */}
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
                    <h3 className="font-bold text-slate-700 uppercase text-xs tracking-wider mb-4 border-b pb-2">Personal Info</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Full Name</label>
                            <input 
                                type="text" 
                                className={`w-full p-3 border rounded focus:border-gold-500 outline-none bg-white ${errors.name ? 'border-red-500' : 'border-slate-300'}`}
                                value={guestDetails.name} 
                                onChange={e => {
                                    setGuestDetails({...guestDetails, name: e.target.value});
                                    setErrors({...errors, name: ''});
                                }}
                                placeholder="e.g. Aditya Kumar"
                            />
                            {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email</label>
                            <input 
                                type="email" 
                                className={`w-full p-3 border rounded focus:border-gold-500 outline-none bg-white ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                                value={guestDetails.email} 
                                onChange={e => {
                                    setGuestDetails({...guestDetails, email: e.target.value});
                                    setErrors({...errors, email: ''});
                                }}
                                placeholder="aditya@example.com"
                            />
                            {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Phone</label>
                            <input 
                                type="tel" 
                                className={`w-full p-3 border rounded focus:border-gold-500 outline-none bg-white ${errors.phone ? 'border-red-500' : 'border-slate-300'}`}
                                value={guestDetails.phone} 
                                onChange={e => {
                                    setGuestDetails({...guestDetails, phone: e.target.value});
                                    setErrors({...errors, phone: ''});
                                }}
                                placeholder="9876543210"
                                maxLength={10}
                            />
                            {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone}</span>}
                        </div>
                    </div>
                </div>
              </div>

              <div className="flex justify-end">
                 <button 
                  onClick={handleNextStep} 
                  className="bg-slate-900 text-white px-12 py-4 hover:bg-gold-500 hover:text-slate-900 transition-colors font-bold uppercase tracking-widest text-sm shadow-lg rounded-sm w-full md:w-auto"
                 >
                   Continue to Payment
                 </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="p-8 max-w-6xl mx-auto w-full animate-fade-in">
               <div className="flex items-center gap-4 mb-8">
                 <button onClick={() => setStep(2)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><ArrowLeft size={20}/></button>
                 <h2 className="text-3xl font-serif font-bold text-slate-900">Confirm & Pay</h2>
               </div>

               <div className="grid md:grid-cols-12 gap-12">
                   <div className="md:col-span-5 bg-slate-50 p-8 border border-slate-200 rounded-sm h-fit">
                        <h3 className="font-serif font-bold text-xl mb-6 border-b border-slate-200 pb-4">Booking Summary</h3>
                        
                        <div className="space-y-4 text-sm mb-6">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Guest</span>
                                <span className="font-bold text-slate-800">{guestDetails.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Room</span>
                                <span className="font-bold text-slate-800">{selectedRoom?.title}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Dates</span>
                                <span className="font-bold text-slate-800">{dates.checkIn} → {dates.checkOut}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-slate-600">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString('en-IN')}</span>
                            </div>
                            {appliedPromo && (
                                <div className="flex justify-between text-green-600 font-medium">
                                    <span>Discount ({appliedPromo.code})</span>
                                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-2xl font-bold text-slate-900 pt-4 border-t border-slate-300">
                                <span>Total</span>
                                <span>₹{total.toLocaleString('en-IN')}</span>
                            </div>
                        </div>

                        <div className="mt-8">
                           <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    placeholder="Promo Code" 
                                    className="flex-1 p-3 border border-slate-300 rounded-sm focus:border-gold-500 outline-none uppercase"
                                    value={promoCode}
                                    onChange={e => setPromoCode(e.target.value)}
                                />
                                <button onClick={handleApplyPromo} className="bg-slate-800 text-white px-4 font-bold text-xs uppercase tracking-wider hover:bg-slate-900 rounded-sm">Apply</button>
                           </div>
                           {errors.promo && <p className="text-red-500 text-xs mt-1">{errors.promo}</p>}
                        </div>
                   </div>

                   <div className="md:col-span-7 space-y-6">
                        <div 
                            onClick={handleRazorpayPayment}
                            className="border-2 border-slate-100 p-6 rounded-lg hover:border-blue-500 cursor-pointer transition-all hover:shadow-lg group bg-white"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <ShieldCheck size={28} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900 mb-1">Pay Online (Razorpay)</h4>
                                    <p className="text-sm text-slate-500 mb-2">Secure payment via Credit/Debit Card, UPI, or Netbanking.</p>
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">Instant Confirmation</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center text-slate-400 text-sm font-bold uppercase tracking-widest">OR</div>

                        <div 
                            onClick={handlePayAtHotel}
                            className="border-2 border-slate-100 p-6 rounded-lg hover:border-gold-500 cursor-pointer transition-all hover:shadow-lg group bg-white"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gold-50 text-gold-600 rounded-full group-hover:bg-gold-500 group-hover:text-white transition-colors">
                                    <Building2 size={28} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900 mb-1">Pay at Hotel</h4>
                                    <p className="text-sm text-slate-500 mb-2">Reserve your room now and pay upon arrival.</p>
                                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">No Pre-payment Required</span>
                                </div>
                            </div>
                        </div>
                   </div>
               </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="p-12 flex flex-col items-center justify-center text-center h-full animate-scale-up">
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"
              >
                <Check size={48} />
              </motion.div>
              <h2 className="text-4xl font-serif font-bold mb-4 text-slate-900">Booking Confirmed!</h2>
              <p className="text-slate-500 mb-8 max-w-md text-lg">
                Namaste {guestDetails.name}, we are thrilled to welcome you. 
                {paymentMethod === 'hotel' ? ' Payment is due upon arrival.' : ' Your payment was successful.'}
              </p>
              
              <div className="bg-white p-8 border border-slate-200 shadow-xl w-full max-w-lg mb-8 text-left relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gold-500" />
                 <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-serif font-bold">INVOICE</h3>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Booking ID</p>
                      <p className="font-mono font-bold text-slate-900">{bookingId}</p>
                    </div>
                 </div>
                 
                 <div className="space-y-4 text-sm border-b border-slate-100 pb-8 mb-8">
                   <div className="flex justify-between">
                     <span className="text-slate-500">Guest</span>
                     <span className="font-bold">{guestDetails.name}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-slate-500">Room</span>
                     <span className="font-bold">{selectedRoom?.title}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-slate-500">Dates</span>
                     <span className="font-bold">{dates.checkIn} — {dates.checkOut}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-slate-500">Payment Method</span>
                     <span className="font-bold capitalize">{paymentMethod === 'razorpay' ? 'Online (Paid)' : 'At Hotel (Due)'}</span>
                   </div>
                 </div>

                 <div className="space-y-2">
                   <div className="flex justify-between">
                     <span className="text-slate-600">Subtotal</span>
                     <span>₹{subtotal.toLocaleString('en-IN')}</span>
                   </div>
                   {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                   )}
                   <div className="flex justify-between text-xl font-bold text-slate-900 pt-4 border-t border-slate-100 mt-4">
                     <span>Total Amount</span>
                     <span>₹{total.toLocaleString('en-IN')}</span>
                   </div>
                 </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => window.print()} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 px-6 py-3 border border-slate-300 rounded-sm uppercase text-xs font-bold tracking-wider hover:bg-slate-50 transition-colors">
                  <Printer size={16}/> Print Receipt
                </button>
                <button onClick={() => navigate('/')} className="bg-slate-900 text-white px-8 py-3 rounded-sm font-bold uppercase text-xs tracking-wider hover:bg-gold-500 hover:text-slate-900 transition-colors">
                  Return Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};