import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, MapPin, Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = useSelector((state: RootState) => state.cart.items.reduce((acc, item) => acc + item.quantity, 0));

  return (
    <>
      <nav className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-sm">
                  <span className="text-white font-black text-xl">M</span>
                </div>
                <span className="text-2xl font-black text-gray-900 tracking-tighter hidden sm:block">Minute<span className="text-brand-500">Mart</span></span>
              </Link>
              <div className="hidden lg:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                <MapPin className="w-4 h-4 text-brand-500" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Delivery to</span>
                  <span className="text-sm font-bold text-gray-900 leading-none">Select Location</span>
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for groceries, vegetables, meat..."
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all font-medium placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/login" className="hidden sm:flex items-center gap-2 text-gray-700 hover:text-brand-600 font-bold px-4 py-2 rounded-xl hover:bg-brand-50 transition-colors">
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>

              <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-2 bg-brand-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-brand-500 transition-colors shadow-md shadow-brand-500/30">
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">My Cart</span>
                {cartCount > 0 && (
                  <span className="bg-white text-brand-600 px-2 py-0.5 rounded-md text-xs font-black">
                    {cartCount}
                  </span>
                )}
              </button>

              <button className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
