import React, { useState } from 'react';
import { MapPin, Phone, User, Home, Building2 } from 'lucide-react';

export default function AddressForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    name: '', phone: '', street: '', apartment: '', city: '', type: 'Home'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-brand-500" /> Delivery Address
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-9 pr-3 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-500" placeholder="John Doe" />
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pl-9 pr-3 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-500" placeholder="+91 9876543210" />
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-bold text-gray-700 mb-1">Street / Area</label>
          <input type="text" required value={formData.street} onChange={(e) => setFormData({...formData, street: e.target.value})} className="w-full px-3 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-500" placeholder="123 Main Street" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-xs font-bold text-gray-700 mb-1">Flat / Apartment</label>
          <input type="text" required value={formData.apartment} onChange={(e) => setFormData({...formData, apartment: e.target.value})} className="w-full px-3 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-500" placeholder="Apt 4B" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-xs font-bold text-gray-700 mb-1">City</label>
          <input type="text" required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full px-3 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-500" placeholder="Mumbai" />
        </div>
      </div>

      <div className="pt-2">
        <label className="block text-xs font-bold text-gray-700 mb-2">Save address as</label>
        <div className="flex gap-3">
          <button type="button" onClick={() => setFormData({...formData, type: 'Home'})} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border text-sm font-bold transition-colors ${formData.type === 'Home' ? 'bg-brand-50 border-brand-500 text-brand-600' : 'bg-white border-gray-200 text-gray-600'}`}>
            <Home className="w-4 h-4" /> Home
          </button>
          <button type="button" onClick={() => setFormData({...formData, type: 'Work'})} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border text-sm font-bold transition-colors ${formData.type === 'Work' ? 'bg-brand-50 border-brand-500 text-brand-600' : 'bg-white border-gray-200 text-gray-600'}`}>
            <Building2 className="w-4 h-4" /> Work
          </button>
        </div>
      </div>

      <button type="submit" className="w-full mt-4 bg-brand-600 text-white font-bold py-3 rounded-xl hover:bg-brand-500 transition-colors shadow-md hover:shadow-lg">
        Save & Continue
      </button>
    </form>
  );
}
