export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glass: '0 20px 60px rgba(0,0,0,0.18)'
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(96,165,250,0.16), transparent 35%), radial-gradient(circle at bottom right, rgba(167,139,250,0.18), transparent 28%)'
      }
    }
  },
  plugins: []
};
