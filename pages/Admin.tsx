import React, { useState } from 'react';
import { Plus, Trash2, Upload, CheckCircle, XCircle, FileText, LogOut } from 'lucide-react';
import { AdminDashboard } from '../components/AdminDashboard';
import {
  getRooms, saveRoom, deleteRoom, getBookings, saveBooking,
  getAttractions, saveAttraction, deleteAttraction,
  getServices, saveService, deleteService,
  getPromoCodes, savePromoCode, deletePromoCode,
  getMenu, saveMenuItem, deleteMenuItem
} from '../services/mockDb';
import { Room, Booking, RoomType, Attraction, Service, PromoCode, MenuItem } from '../types';

// Helper for Image Upload
const ImageUpload = ({ onUpload }: { onUpload: (url: string) => void }) => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onUpload(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative border-2 border-dashed border-slate-300 rounded p-4 text-center hover:bg-slate-50 transition-colors">
      <input type="file" accept="image/*" onChange={handleFile} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
      <div className="flex flex-col items-center gap-2 text-slate-400">
        <Upload size={24} />
        <span className="text-xs font-bold uppercase">Upload Image</span>
      </div>
    </div>
  );
};

// Re-export Dashboard
export { AdminDashboard };

// --- Rooms Manager ---
export const RoomsManager = () => {
  const [rooms, setRooms] = useState<Room[]>(getRooms());
  const [editing, setEditing] = useState<Partial<Room> | null>(null);

  const handleSave = () => {
    if (!editing || !editing.title) return;
    const newRoom = {
      ...editing,
      id: editing.id || Math.random().toString(36).substr(2, 9),
      amenities: editing.amenities || ['wifi'],
      images: editing.images?.length ? editing.images : ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800'],
    } as Room;
    saveRoom(newRoom);
    setRooms(getRooms());
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if(confirm('Delete this room?')) {
      deleteRoom(id);
      setRooms(getRooms());
    }
  };

  const addImage = (url: string) => {
    setEditing(prev => prev ? ({...prev, images: [...(prev.images || []), url]}) : null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-slate-800">Rooms & Suites</h1>
        <button onClick={() => setEditing({ type: RoomType.STANDARD, images: [], amenities: [] })} className="bg-slate-900 text-white px-6 py-2 rounded-sm flex items-center gap-2 shadow-lg hover:bg-slate-800 transition-all uppercase text-xs font-bold tracking-wider">
          <Plus size={16} /> Add Room
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-2xl h-full overflow-y-auto p-8 shadow-2xl animate-slide-in">
            <h2 className="text-2xl font-bold mb-6 border-b pb-4 font-serif">{editing.id ? 'Edit Room' : 'New Room'}</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Title</label>
                  <input value={editing.title || ''} onChange={e => setEditing({...editing, title: e.target.value})} className="w-full border p-2 rounded-sm focus:border-slate-900 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Type</label>
                  <select value={editing.type} onChange={e => setEditing({...editing, type: e.target.value as RoomType})} className="w-full border p-2 rounded-sm focus:border-slate-900 outline-none bg-white">
                    {Object.values(RoomType).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Price / Night (₹)</label>
                  <input type="number" value={editing.price || ''} onChange={e => setEditing({...editing, price: Number(e.target.value)})} className="w-full border p-2 rounded-sm focus:border-slate-900 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Capacity</label>
                  <input type="number" value={editing.capacity || ''} onChange={e => setEditing({...editing, capacity: Number(e.target.value)})} className="w-full border p-2 rounded-sm focus:border-slate-900 outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Size (ft²)</label>
                  <input type="number" value={editing.size || ''} onChange={e => setEditing({...editing, size: Number(e.target.value)})} className="w-full border p-2 rounded-sm focus:border-slate-900 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Bed Type</label>
                <input value={editing.bedType || ''} onChange={e => setEditing({...editing, bedType: e.target.value})} className="w-full border p-2 rounded-sm focus:border-slate-900 outline-none" placeholder="e.g. King, 2 Queens" />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Description</label>
                <textarea rows={4} value={editing.description || ''} onChange={e => setEditing({...editing, description: e.target.value})} className="w-full border p-2 rounded-sm focus:border-slate-900 outline-none" />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-2">Images</label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {editing.images?.map((url, i) => (
                    <div key={i} className="relative aspect-square">
                      <img src={url} className="w-full h-full object-cover rounded-sm border" />
                      <button onClick={() => setEditing({...editing, images: editing.images?.filter((_, idx) => idx !== i)})} className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl"><Trash2 size={12}/></button>
                    </div>
                  ))}
                  <ImageUpload onUpload={addImage} />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Amenities (comma separated)</label>
                <input value={editing.amenities?.join(', ') || ''} onChange={e => setEditing({...editing, amenities: e.target.value.split(',').map(s=>s.trim())})} className="w-full border p-2 rounded-sm focus:border-slate-900 outline-none" placeholder="wifi, ac, pool..." />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8 pt-4 border-t">
              <button onClick={() => setEditing(null)} className="px-6 py-2 text-slate-500 font-bold uppercase text-xs tracking-wider">Cancel</button>
              <button onClick={handleSave} className="bg-slate-900 text-white px-8 py-2 rounded-sm shadow-lg hover:bg-slate-800 font-bold uppercase text-xs tracking-wider">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(r => (
          <div key={r.id} className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <img src={r.images[0]} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-sm">{r.type}</div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-lg font-serif">{r.title}</h4>
                <span className="font-bold text-gold-600">₹{r.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="text-xs text-slate-500 mb-4 flex gap-3 uppercase tracking-wide">
                <span>{r.capacity} Guests</span>
                <span>{r.size} ft²</span>
              </div>
              <div className="flex gap-2 border-t pt-4">
                <button onClick={() => setEditing(r)} className="flex-1 bg-slate-50 text-slate-700 py-2 rounded-sm hover:bg-slate-100 font-bold text-xs uppercase">Edit</button>
                <button onClick={() => handleDelete(r.id)} className="px-3 text-red-500 hover:bg-red-50 rounded-sm"><Trash2 size={16}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Bookings Manager ---
export const BookingsManager = () => {
  const [bookings, setBookings] = useState<Booking[]>(getBookings());
  const [filter, setFilter] = useState('all');

  const updateStatus = (id: string, status: Booking['status']) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    setBookings(updated);
    updated.forEach(b => saveBooking(b));
  };

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-slate-800">Bookings</h1>
        <div className="flex bg-white p-1 rounded border">
          {['all', 'confirmed', 'checked-in', 'cancelled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-sm capitalize text-sm font-medium ${filter === f ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              {f.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs">
            <tr>
              <th className="p-4">Guest</th>
              <th className="p-4">Room</th>
              <th className="p-4">Dates</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(b => (
              <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-slate-900">{b.customerName}</div>
                  <div className="text-xs text-slate-500">#{b.id}</div>
                </td>
                <td className="p-4">{b.roomTitle}</td>
                <td className="p-4">
                  <div className="flex flex-col text-xs text-slate-600">
                    <span>In: {b.checkIn}</span>
                    <span>Out: {b.checkOut}</span>
                  </div>
                </td>
                <td className="p-4 font-bold">₹{b.totalPrice.toLocaleString('en-IN')}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                    b.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' :
                    b.status === 'checked-in' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    b.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                    'bg-slate-50 text-slate-700 border-slate-200'
                  }`}>
                    {b.status.replace('-', ' ')}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    {b.status === 'confirmed' && (
                      <button onClick={() => updateStatus(b.id, 'checked-in')} className="p-2 text-green-600 hover:bg-green-50 rounded" title="Check In">
                        <CheckCircle size={18} />
                      </button>
                    )}
                    {b.status === 'checked-in' && (
                      <button onClick={() => updateStatus(b.id, 'checked-out')} className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="Check Out">
                        <LogOut size={18} />
                      </button>
                    )}
                    {b.status !== 'cancelled' && (
                      <button onClick={() => updateStatus(b.id, 'cancelled')} className="p-2 text-red-600 hover:bg-red-50 rounded" title="Cancel">
                        <XCircle size={18} />
                      </button>
                    )}
                    <button className="p-2 text-slate-400 hover:text-slate-900 rounded" title="Invoice">
                      <FileText size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={6} className="p-12 text-center text-slate-400">No bookings found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Menu Manager ---
export const MenuManager = () => {
  const [menu, setMenu] = useState<MenuItem[]>(getMenu());
  const [editing, setEditing] = useState<Partial<MenuItem> | null>(null);

  const handleSave = () => {
    if(!editing?.name) return;
    const newItem = {
      ...editing,
      id: editing.id || Math.random().toString(),
      price: Number(editing.price),
      image: editing.image || 'https://via.placeholder.com/150'
    } as MenuItem;
    saveMenuItem(newItem);
    setMenu(getMenu());
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if(confirm('Delete Item?')) {
      deleteMenuItem(id);
      setMenu(getMenu());
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-slate-800">Restaurant Menu</h1>
        <button onClick={() => setEditing({ category: 'Main Course', isVeg: true })} className="bg-slate-900 text-white px-6 py-2 rounded-sm flex items-center gap-2 font-bold uppercase text-xs tracking-wider">
          <Plus size={16} /> Add Item
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg p-8 rounded shadow-2xl">
            <h2 className="text-xl font-bold mb-6 font-serif">Edit Menu Item</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Name</label>
                <input value={editing.name || ''} onChange={e => setEditing({...editing, name: e.target.value})} className="w-full border p-2 rounded-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Category</label>
                  <select value={editing.category} onChange={e => setEditing({...editing, category: e.target.value as any})} className="w-full border p-2 rounded-sm bg-white">
                    <option>Starter</option>
                    <option>Main Course</option>
                    <option>Dessert</option>
                    <option>Beverage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Price (₹)</label>
                  <input type="number" value={editing.price} onChange={e => setEditing({...editing, price: Number(e.target.value)})} className="w-full border p-2 rounded-sm" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={editing.isVeg} onChange={e => setEditing({...editing, isVeg: e.target.checked})} className="w-4 h-4" />
                <label className="text-sm font-bold text-slate-700">Vegetarian</label>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Description</label>
                <textarea rows={2} value={editing.description || ''} onChange={e => setEditing({...editing, description: e.target.value})} className="w-full border p-2 rounded-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Image</label>
                <div className="flex gap-4 items-center">
                  {editing.image && <img src={editing.image} className="w-16 h-16 object-cover rounded" />}
                  <ImageUpload onUpload={(url) => setEditing({...editing, image: url})} />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                <button onClick={() => setEditing(null)} className="px-4 py-2 text-slate-500 text-sm font-bold uppercase">Cancel</button>
                <button onClick={handleSave} className="bg-slate-900 text-white px-6 py-2 rounded-sm text-sm font-bold uppercase">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menu.map(item => (
          <div key={item.id} className="bg-white p-4 rounded border flex gap-4 items-start">
            <img src={item.image} className="w-20 h-20 object-cover rounded-sm bg-slate-100" />
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-serif font-bold text-lg">{item.name}</h4>
                <span className="font-bold text-gold-600">₹{item.price}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded ${item.isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item.isVeg ? 'VEG' : 'NON-VEG'}</span>
              <p className="text-xs text-slate-500 mt-1">{item.description}</p>
            </div>
            <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Services Manager ---
export const ServicesManager = () => {
  const [services, setServices] = useState<Service[]>(getServices());
  const [attractions, setAttractions] = useState<Attraction[]>(getAttractions());
  const [activeTab, setActiveTab] = useState<'services' | 'attractions'>('services');

  const handleDeleteService = (id: string) => { deleteService(id); setServices(getServices()); };
  const handleDeleteAttraction = (id: string) => { deleteAttraction(id); setAttractions(getAttractions()); };

  return (
    <div className="space-y-8">
      <div className="flex gap-4 border-b border-slate-200">
        <button onClick={() => setActiveTab('services')} className={`pb-2 px-4 font-bold transition-colors uppercase text-xs tracking-wider ${activeTab === 'services' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400'}`}>Hotel Services</button>
        <button onClick={() => setActiveTab('attractions')} className={`pb-2 px-4 font-bold transition-colors uppercase text-xs tracking-wider ${activeTab === 'attractions' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400'}`}>Attractions</button>
      </div>

      {activeTab === 'services' ? (
        <div className="grid gap-4">
          {services.map(s => (
            <div key={s.id} className="bg-white p-4 rounded border flex gap-4 items-center">
              <img src={s.image || 'https://via.placeholder.com/100'} className="w-16 h-16 rounded object-cover bg-slate-100" />
              <div className="flex-1">
                <h4 className="font-bold">{s.name}</h4>
                <p className="text-sm text-slate-500">{s.description}</p>
              </div>
              <button onClick={() => handleDeleteService(s.id)} className="text-red-400 p-2"><Trash2 size={18}/></button>
            </div>
          ))}
          <button className="w-full py-4 border-2 border-dashed border-slate-300 rounded text-slate-400 font-bold hover:border-slate-400 hover:text-slate-600 uppercase text-xs tracking-wider">+ Add New Service</button>
        </div>
      ) : (
        <div className="grid gap-4">
          {attractions.map(a => (
            <div key={a.id} className="bg-white p-4 rounded border flex gap-4 items-center">
              <img src={a.image} className="w-16 h-16 rounded object-cover bg-slate-100" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold">{a.name}</h4>
                  <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">{a.category}</span>
                </div>
                <p className="text-sm text-slate-500">{a.distance} • {a.description}</p>
              </div>
              <button onClick={() => handleDeleteAttraction(a.id)} className="text-red-400 p-2"><Trash2 size={18}/></button>
            </div>
          ))}
          <button className="w-full py-4 border-2 border-dashed border-slate-300 rounded text-slate-400 font-bold hover:border-slate-400 hover:text-slate-600 uppercase text-xs tracking-wider">+ Add New Attraction</button>
        </div>
      )}
    </div>
  );
};

// --- Promos Manager ---
export const PromosManager = () => {
  const [promos, setPromos] = useState<PromoCode[]>(getPromoCodes());
  const [newCode, setNewCode] = useState({ code: '', discount: 10 });

  const handleAdd = () => {
    if(!newCode.code) return;
    savePromoCode({
      id: Math.random().toString(),
      code: newCode.code.toUpperCase(),
      discountPercent: newCode.discount,
      isActive: true
    });
    setPromos(getPromoCodes());
    setNewCode({ code: '', discount: 10 });
  };

  const handleDelete = (id: string) => {
    deletePromoCode(id);
    setPromos(getPromoCodes());
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-serif font-bold text-slate-800">Promo Codes</h1>

      <div className="bg-white p-6 rounded border shadow-sm flex gap-4 items-end">
        <div className="flex-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Code</label>
          <input value={newCode.code} onChange={e => setNewCode({...newCode, code: e.target.value})} className="w-full border p-2 rounded-sm" placeholder="SUMMER2024" />
        </div>
        <div className="w-32">
          <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Discount %</label>
          <input type="number" value={newCode.discount} onChange={e => setNewCode({...newCode, discount: Number(e.target.value)})} className="w-full border p-2 rounded-sm" />
        </div>
        <button onClick={handleAdd} className="bg-slate-900 text-white px-6 py-2.5 rounded-sm font-bold hover:bg-slate-800 uppercase text-xs tracking-wider">Create</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promos.map(p => (
          <div key={p.id} className="bg-white p-4 rounded border border-slate-200 flex justify-between items-center shadow-sm">
            <div>
              <div className="font-mono font-bold text-xl text-slate-800 tracking-wider">{p.code}</div>
              <div className="text-green-600 font-bold text-sm">{p.discountPercent}% Off</div>
            </div>
            <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Customers Placeholder ---
export const CustomersManager = () => (
  <div className="text-slate-500 text-center py-20">Customer Directory Coming Soon</div>
);
