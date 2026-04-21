import { useState, useEffect } from 'react';
import { Apple, Milk, Cookie, CupSoda, Bath, Tag, ArrowRight, Zap } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import apiClient from '../services/apiClient';

const ICON_MAP: Record<string, any> = {
  'Fruits': <Apple className="w-8 h-8 text-cyan-400" />,
  'Dairy': <Milk className="w-8 h-8 text-blue-300" />,
  'Snacks': <Cookie className="w-8 h-8 text-cyan-300" />,
  'Beverages': <CupSoda className="w-8 h-8 text-blue-400" />,
  'Personal Care': <Bath className="w-8 h-8 text-cyan-400" />,
  'Vegetables': <Tag className="w-8 h-8 text-cyan-300" />,
  'Household': <Bath className="w-8 h-8 text-blue-300" />
};

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          apiClient.get('/products'),
          apiClient.get('/products/categories')
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen pb-20 bg-neutral-bg text-text-primary">

      {/* Hero Section */}
      <div className="px-4 py-10 sm:py-16 mb-10 bg-gradient-to-br from-neutral-bg via-white to-brand-50 border-b border-neutral-border">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

          {/* Left */}
          <div className="flex-1 space-y-6">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest bg-accent-50 text-accent-600 border border-accent-200">
              <Zap className="w-4 h-4" />
              Superfast Delivery
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1]">
              Groceries delivered{' '}
              <span className="text-brand-500">in minutes.</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl max-w-lg text-text-secondary">
              Fresh vegetables, fruits, daily essentials, and more at your doorstep before you even finish brewing your coffee.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-accent-500 hover:bg-accent-600 text-white transition">
                Start Shopping <ArrowRight className="w-5 h-5" />
              </button>

              <button className="flex items-center gap-2 px-6 py-4 rounded-xl font-bold border border-neutral-border text-text-primary hover:bg-neutral-bg transition">
                Explore deals
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8">
              {[
                { value: '10 min', label: 'Avg. delivery' },
                { value: '5000+', label: 'Products' },
                { value: '4.9★', label: 'Rated' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-xl font-black text-brand-500">{stat.value}</div>
                  <div className="text-xs text-text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full max-w-lg">
            <div className="aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden relative bg-gradient-to-br from-brand-500 to-accent-500 shadow-xl">

              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800"
                className="w-full h-full object-cover opacity-40"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-6 rounded-3xl bg-white/90 backdrop-blur shadow-lg">
                  <span className="text-4xl font-black text-accent-500">10 Min</span>
                  <p className="text-xs text-text-secondary text-center uppercase tracking-wide mt-2">
                    Delivery
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 space-y-16">

        {/* Categories */}
        <section>
          <div className="flex justify-between mb-8">
            <h2 className="text-3xl font-black">Shop by Category</h2>
            <button className="flex items-center gap-1 text-brand-500 hover:underline">
              See All <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <CategoryCard
                key={cat}
                title={cat}
                icon={ICON_MAP[cat]}
                color="bg-white border border-neutral-border"
              />
            ))}
          </div>
        </section>

        {/* Promo */}
        <div className="rounded-2xl px-8 py-6 flex justify-between items-center bg-gradient-to-r from-accent-500 to-accent-600 text-white">
          <div>
            <p className="text-xs uppercase">Limited time</p>
            <p className="text-xl font-bold">Get 20% off your first order</p>
          </div>
          <button className="bg-white text-accent-500 px-6 py-3 rounded-xl font-bold">
            Claim now
          </button>
        </div>

        {/* Products */}
        <section>
          <h2 className="text-3xl font-black mb-8">Bestsellers</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
