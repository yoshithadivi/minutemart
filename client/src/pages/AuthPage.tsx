import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../store/authSlice';
import type { AppDispatch, RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const res = await dispatch(login({ email, password }));
      if (res.meta.requestStatus === 'fulfilled') navigate('/');
    } else {
      const res = await dispatch(register({ name, email, password }));
      if (res.meta.requestStatus === 'fulfilled') navigate('/');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm shadow-brand-500/40">
            <span className="text-white font-black text-2xl">M</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-gray-500 text-sm mt-2 font-medium">{isLogin ? 'Login to access your orders and cart' : 'Sign up to get groceries in minutes'}</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 font-bold text-center border border-red-100">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all font-medium" placeholder="John Doe" />
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all font-medium" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all font-medium" placeholder="••••••••" />
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-brand-600 text-white font-bold py-3.5 rounded-xl hover:bg-brand-500 transition-all shadow-md shadow-brand-500/30 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 uppercase tracking-wide mt-2">
            {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button onClick={() => setIsLogin(!isLogin)} className="text-brand-600 font-bold hover:text-brand-700 transition-colors">
              {isLogin ? 'Create one now' : 'Log in instead'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
