import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

interface ProductCardProps {
  _id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  weight: string;
  image: string;
  time: string;
}

export default function ProductCard({ _id, name, price, originalPrice, weight, image, time }: ProductCardProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product: { _id, name, price, image }, quantity: 1, price }));
  };

  return (
    <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm relative hover:shadow-md hover:border-brand-500 transition-all flex flex-col justify-between group">
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-gray-800 flex items-center gap-1 shadow-sm z-10">
        ⏱ {time}
      </div>
      <div className="relative aspect-square w-full mb-3 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center group-hover:bg-gray-100 transition-colors">
        <img src={image} alt={name} className="w-3/4 h-3/4 object-contain group-hover:scale-105 transition-transform" />
      </div>
      <div className="space-y-1 flex-1 flex flex-col">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px] leading-snug flex-1">{name}</h3>
        <p className="text-xs text-gray-500 font-medium">{weight}</p>
        <div className="flex items-center justify-between pt-3">
          <div className="flex flex-col">
            <span className="text-[15px] font-bold text-gray-900 leading-none">₹{price}</span>
            {originalPrice && (
              <span className="text-xs text-gray-400 line-through mt-0.5">₹{originalPrice}</span>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            className="bg-brand-50 text-brand-600 border border-brand-500 rounded-lg px-4 py-1.5 font-bold text-sm hover:bg-brand-500 hover:text-white transition-colors uppercase tracking-wide shadow-sm"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
