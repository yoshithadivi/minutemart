export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
        },
        accent: {
          50: '#ffedd5',
          500: '#f97316',
          600: '#ea580c',
        },
        neutral: {
          bg: '#f9fafb',
          card: '#ffffff',
          border: '#e5e7eb',
        },
        text: {
          primary: '#111827',
          secondary: '#6b7280',
          muted: '#9ca3af',
        },
        premium: {
          dark: '#0f172a',
        }
      },
    },
  },
  plugins: [],
}