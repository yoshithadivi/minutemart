import { X, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { addToCart, removeFromCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity" onClick={onClose} />
      )}
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-gray-50 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100 shadow-sm z-10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gray-900" />
            <h2 className="text-lg font-black text-gray-900">My Cart</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
                <ShoppingBag className="w-10 h-10 text-gray-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
                <p className="text-sm text-gray-500 mt-1">Add items to start your order</p>
              </div>
              <button onClick={onClose} className="bg-brand-50 text-brand-600 px-6 py-2 rounded-xl font-bold hover:bg-brand-100 transition-colors">
                Browse Products
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="p-3 bg-brand-50 border-b border-brand-100 flex items-center gap-2">
                <span className="text-xl">⏱</span>
                <div>
                  <p className="text-xs font-bold text-brand-700 uppercase tracking-wide">Delivery in 10 mins</p>
                  <p className="text-[10px] font-medium text-brand-600">Shipment of {cartItems.length} items</p>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.product._id} className="p-4 flex gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-contain" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800 line-clamp-2">{item.product.name}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-bold text-gray-900">₹{item.price}</span>
                        <div className="flex items-center gap-3 bg-brand-50 px-2 py-1 rounded-lg border border-brand-200">
                          <button onClick={() => dispatch(removeFromCart(item.product._id))} className="text-brand-600 hover:text-brand-700">
                            <Minus className="w-3.5 h-3.5 font-bold" />
                          </button>
                          <span className="text-xs font-bold text-brand-700 min-w-[12px] text-center">{item.quantity}</span>
                          <button onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))} className="text-brand-600 hover:text-brand-700">
                            <Plus className="w-3.5 h-3.5 font-bold" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="bg-white border-t border-gray-100 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-gray-600">Total Bill</span>
              <span className="text-lg font-black text-gray-900">₹{total}</span>
            </div>
            <button 
              onClick={() => { onClose(); navigate('/checkout'); }}
              className="w-full bg-brand-600 text-white font-bold py-3.5 rounded-xl hover:bg-brand-500 transition-all shadow-md shadow-brand-500/30 flex items-center justify-between px-6 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
