import { ShoppingBag, Plus, Minus, ArrowRight, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { addToCart, removeFromCart, clearCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-sm">
          <ShoppingBag className="w-16 h-16 text-gray-300" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500">Looks like you haven't added anything yet.</p>
        </div>
        <button onClick={() => navigate('/')} className="bg-brand-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-brand-500 transition-colors shadow-md shadow-brand-500/30">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-brand-500" /> My Cart
        </h1>
        <button onClick={() => dispatch(clearCart())} className="text-red-500 hover:text-red-600 font-bold flex items-center gap-2 text-sm bg-red-50 px-4 py-2 rounded-lg">
          <Trash2 className="w-4 h-4" /> Empty Cart
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="p-4 bg-brand-50 border-b border-brand-100 flex items-center gap-3">
              <span className="text-2xl">⏱</span>
              <div>
                <p className="text-sm font-bold text-brand-700 uppercase tracking-wide">Delivery in 10 mins</p>
                <p className="text-xs font-medium text-brand-600">Shipment of {cartItems.length} items</p>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <div key={item.product._id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-contain" />
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-gray-900">{item.product.name}</h4>
                      <span className="text-lg font-black text-gray-900">₹{item.price * item.quantity}</span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium mb-4">₹{item.price} per item</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-4 bg-brand-50 px-3 py-1.5 rounded-xl border border-brand-200">
                        <button onClick={() => dispatch(removeFromCart(item.product._id))} className="text-brand-600 hover:text-brand-700 p-1">
                          <Minus className="w-4 h-4 font-bold" />
                        </button>
                        <span className="text-sm font-bold text-brand-700 min-w-[20px] text-center">{item.quantity}</span>
                        <button onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))} className="text-brand-600 hover:text-brand-700 p-1">
                          <Plus className="w-4 h-4 font-bold" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[400px]">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
            <h3 className="text-xl font-black text-gray-900 mb-6">Bill Details</h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Item Total</span>
                <span className="font-medium text-gray-900">₹{total}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-bold text-brand-600">FREE</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Handling Charge</span>
                <span className="font-medium text-gray-900">₹4</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-sm font-bold text-gray-600">To Pay</p>
                  <p className="text-xs text-gray-400 mt-1">Incl. of all taxes</p>
                </div>
                <span className="text-2xl font-black text-gray-900">₹{total + 4}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-brand-600 text-white font-bold py-4 rounded-xl hover:bg-brand-500 transition-all shadow-md shadow-brand-500/30 flex items-center justify-between px-6 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
