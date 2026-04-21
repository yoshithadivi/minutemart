import { CheckCircle2, Package, MapPin } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OrderSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId || 'ORD-' + Math.floor(Math.random() * 100000);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100 text-center relative overflow-hidden">
        {/* Confetti Background decoration */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-50 to-transparent" />
        
        <div className="relative z-10">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm ring-8 ring-green-50">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 font-medium mb-8">Your order has been placed successfully and will be delivered in minutes.</p>

          <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-4 mb-8 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                <Package className="w-5 h-5 text-brand-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Order ID</p>
                <p className="font-bold text-gray-900">{orderId}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                <MapPin className="w-5 h-5 text-brand-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase">Estimated Delivery</p>
                <p className="font-bold text-gray-900 text-brand-600">10 Minutes</p>
              </div>
            </div>
          </div>

          <button onClick={() => navigate('/orders')} className="w-full bg-brand-600 text-white font-bold py-3.5 rounded-xl hover:bg-brand-500 transition-all shadow-md shadow-brand-500/30">
            Track Order
          </button>
          <button onClick={() => navigate('/')} className="w-full mt-3 text-gray-500 font-bold py-3.5 rounded-xl hover:bg-gray-50 transition-all">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
