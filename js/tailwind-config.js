window.tailwind = window.tailwind || {};

window.tailwind.config = {
  safelist: [
    'bg-brand-50', 'bg-brand-100', 'bg-brand-500', 'bg-brand-600', 'bg-brand-700',
    'text-brand-600', 'text-brand-700', 'hover:bg-brand-700',
    'bg-blue-50', 'bg-blue-500', 'text-blue-600', 'text-blue-700',
    'bg-emerald-50', 'bg-emerald-100', 'bg-emerald-500', 'text-emerald-600', 'text-emerald-700',
    'bg-violet-50', 'bg-violet-500', 'text-violet-600',
    'bg-orange-50', 'text-orange-600',
    'bg-cyan-50', 'text-cyan-600',
    'bg-amber-50', 'text-amber-600', 'text-amber-700',
    'bg-red-50', 'text-red-600', 'text-red-700'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef5ff',
          100: '#d9e8ff',
          500: '#2f6df6',
          600: '#2357df',
          700: '#1c46b8'
        },
        ink: '#10142f'
      },
      boxShadow: {
        soft: '0 18px 60px rgba(31, 45, 74, 0.08)',
        card: '0 10px 30px rgba(31, 45, 74, 0.06)'
      }
    }
  }
};
