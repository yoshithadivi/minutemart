import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { clearCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import AddressForm from '../components/AddressForm';
import apiClient from '../services/apiClient';

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [address, setAddress] = useState<any>(null);

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handlePlaceOrder = async () => {
    if (!address) return alert("Please save delivery address first");
    setIsProcessing(true);
    try {
      const response = await apiClient.post('/orders', {
        orderItems: cartItems,
        totalPrice: total,
      });
      dispatch(clearCart());
      navigate('/order-success', { state: { orderId: response.data._id } });
    } catch (error) {
      console.error(error);
      alert('Checkout failed. Please login first.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-black text-gray-900 mb-2">Checkout</h2>
        <p className="text-gray-500 mb-6">Your cart is empty.</p>
        <button onClick={() => navigate('/')} className="bg-brand-600 text-white px-6 py-3 rounded-xl font-bold">Return Home</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Address & Payment */}
        <div className="flex-1 space-y-8">
          <section>
            {!address ? (
              <AddressForm onSubmit={(data) => setAddress(data)} />
            ) : (
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <span className="bg-brand-100 text-brand-600 text-xs px-2 py-1 rounded-md">{address.type}</span>
                    Delivery Address
                  </h3>
                  <button onClick={() => setAddress(null)} className="text-brand-600 text-sm font-bold">Edit</button>
                </div>
                <p className="text-gray-800 font-medium">{address.name} • {address.phone}</p>
                <p className="text-sm text-gray-500 mt-1">{address.apartment}, {address.street}, {address.city}</p>
              </div>
            )}
          </section>

          <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 mb-4">Payment Method</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 border border-brand-500 bg-brand-50 rounded-xl cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-4 border-brand-500 bg-white" />
                  <span className="font-bold text-gray-900">Cash on Delivery</span>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* Right Column - Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
            <h3 className="text-lg font-black text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.product._id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-gray-500 min-w-[20px]">{item.quantity}x</span>
                    <span className="font-medium text-gray-800 truncate">{item.product.name}</span>
                  </div>
                  <span className="font-bold text-gray-900 ml-4">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Item Total</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery Fee</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-lg font-black text-gray-900 pt-3 border-t border-gray-100">
                <span>Grand Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing || !address}
              className="w-full mt-6 bg-brand-600 text-white font-bold py-4 rounded-xl hover:bg-brand-500 transition-all shadow-md disabled:opacity-50 disabled:hover:bg-brand-600"
            >
              {isProcessing ? 'Processing Order...' : 'Place Order • ₹' + total}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
