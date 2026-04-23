import { useState } from "react";
import {
  Eye,
  EyeOff,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { login, register } from "../store/authSlice";
import type { RootState, AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const handleToggle = (mode: boolean) => {
    setIsLogin(mode);
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const res = await dispatch(
        login({ email, password })
      );

      if (res.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    } else {
      const res = await dispatch(
        register({ name, email, password })
      );

      if (res.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    }
  };
  return (
    <div className="min-h-screen bg-hero-gradient px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl border border-neutral-border bg-white shadow-card">
        {/* LEFT PANEL */}
        <div className="hidden lg:flex relative flex-col justify-between p-10 bg-gradient-to-br from-brand-50 via-white to-accent-50 text-text-primary">
          {/* glow effects */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-brand-500/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-500/20 blur-3xl rounded-full" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 backdrop-blur flex items-center justify-center">
                <ShoppingBag size={22} />
              </div>

              <div>
                <h1 className="text-2xl font-black">MinuteMart</h1>
                <p className="text-sm text-black/70">
                  Groceries delivered fast
                </p>
              </div>
            </div>

            <div className="mt-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/15 border border-accent-400/20 text-accent-900 text-xs font-bold tracking-wide uppercase">
                <Sparkles size={14} />
                New users save today
              </span>

              <h2 className="mt-6 text-5xl font-black leading-tight tracking-tight">
                Shop smarter.
                <br />
                Live easier.
              </h2>

              <p className="mt-5 text-accent-800 text-base leading-7 max-w-md">
                Fresh groceries, snacks, drinks and essentials delivered in
                minutes with a smooth shopping experience built for busy lives.
              </p>
            </div>
          </div>

          <div className="relative z-10 grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center">
                <Zap size={18} />
              </div>
              <div>
                <p className="font-bold">10 Minute Delivery</p>
                <p className="text-xs text-black/65">
                  Fastest doorstep convenience
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="font-bold">Trusted Payments</p>
                <p className="text-xs text-black/65">
                  Secure checkout every time
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white p-6 sm:p-10 flex items-center justify-center">
          <div className="w-full max-w-md">
            {/* mobile logo */}
            <div className="lg:hidden flex justify-center items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-2xl bg-brand-gradient text-white flex items-center justify-center shadow-brand">
                <ShoppingBag size={20} />
              </div>
              <div>
                <h2 className="text-xl font-black text-text-primary">
                  MinuteMart
                </h2>
                <p className="text-xs text-text-secondary">
                  Delivered in minutes
                </p>
              </div>
            </div>

            {/* Toggle */}
            <div className="mb-8 p-1 rounded-2xl bg-neutral-surface border border-neutral-border flex">
              <button
                onClick={() => handleToggle(true)}
                className={`w-1/2 py-3 rounded-xl text-sm font-bold transition-all ${isLogin
                  ? "bg-brand-600 text-white shadow-brand"
                  : "text-text-secondary hover:text-text-primary"
                  }`}
              >
                Login
              </button>

              <button
                onClick={() => handleToggle(false)}
                className={`w-1/2 py-3 rounded-xl text-sm font-bold transition-all ${!isLogin
                  ? "bg-brand-600 text-white shadow-brand"
                  : "text-text-secondary hover:text-text-primary"
                  }`}
              >
                Register
              </button>
            </div>

            {/* Heading */}
            <div className="mb-7">
              <h2 className="text-3xl font-black text-text-primary">
                {isLogin ? "Welcome back 👋" : "Create account"}
              </h2>

              <p className="text-sm text-text-secondary mt-2">
                {isLogin
                  ? "Login to continue shopping with MinuteMart."
                  : "Join now and get essentials delivered quickly."}
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-2xl bg-danger-50 px-4 py-3 text-sm font-semibold text-danger-600">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block mb-2 text-sm font-semibold text-text-primary">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl border border-neutral-border px-4 py-3 outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>
              )}

              <div>
                <label className="block mb-2 text-sm font-semibold text-text-primary">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-neutral-border px-4 py-3 outline-none focus:ring-2 focus:ring-brand-300"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-text-primary">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-neutral-border px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-brand-300"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm font-semibold text-accent-600 hover:text-accent-700"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-2xl py-3.5 font-bold text-white bg-brand-gradient shadow-brand hover:scale-[1.01] transition-all"
              >
                {isLoading
                  ? "Please wait..."
                  : isLogin
                    ? "Login to MinuteMart"
                    : "Create Account"}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-text-secondary mt-7">
              {isLogin
                ? "New to MinuteMart?"
                : "Already have an account?"}{" "}
              <button
                onClick={() => handleToggle(!isLogin)}
                className="font-bold text-brand-600 hover:text-brand-700"
              >
                {isLogin ? "Register now" : "Login now"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}