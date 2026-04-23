
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },

        accent: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },

        neutral: {
          bg: "#f9fafb",
          surface: "#f3f4f6",
          card: "#ffffff",
          border: "#e5e7eb",
          soft: "#eef2f7",
        },

        text: {
          primary: "#111827",
          secondary: "#6b7280",
          muted: "#9ca3af",
          inverse: "#ffffff",
        },

        premium: {
          dark: "#0f172a",
          soft: "#1e293b",
          border: "#334155",
        },

        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
        },

        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
        },

        info: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
        },

        success: {
          50: "#ecfdf5",
          100: "#d1fae5",
          500: "#10b981",
          600: "#059669",
        },
      },

      boxShadow: {
        soft: "0 4px 14px rgba(0,0,0,0.08)",
        card: "0 8px 30px rgba(0,0,0,0.08)",
        brand: "0 10px 25px rgba(34,197,94,0.25)",
        premium: "0 12px 30px rgba(15,23,42,0.18)",
      },

      borderRadius: {
        xl2: "1rem",
        xl3: "1.25rem",
      },

      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
        "accent-gradient":
          "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
        "hero-gradient":
          "linear-gradient(135deg, #f0fdf4 0%, #ffffff 55%, #fff7ed 100%)",
      },
    },
  },

  plugins: [],
} 