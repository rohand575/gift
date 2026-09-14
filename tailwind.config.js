/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Premium romantic-fantasy palette (PRD §4)
        ivory: '#FBF9F5',
        cream: '#F5F0E8',
        champagne: '#E6D3A3',
        gold: '#C9A24B',
        'gold-soft': '#D9C58A',
        blush: '#F4E3E3',
        'blush-deep': '#E9C9CB',
        beige: '#E8E0D4',
        ink: '#2B2723',
        'ink-soft': '#6B6259',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Cormorant Garamond', '"Playfair Display"', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(43, 39, 35, 0.18)',
        card: '0 20px 60px -20px rgba(43, 39, 35, 0.25)',
        glow: '0 0 40px -6px rgba(201, 162, 75, 0.45)',
        'glow-strong': '0 0 60px -4px rgba(201, 162, 75, 0.6)',
      },
      backgroundImage: {
        'ivory-radial':
          'radial-gradient(ellipse at 50% 0%, #FFFFFF 0%, #FBF9F5 45%, #F5F0E8 100%)',
        'gold-sheen':
          'linear-gradient(135deg, #E6D3A3 0%, #C9A24B 50%, #E6D3A3 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
