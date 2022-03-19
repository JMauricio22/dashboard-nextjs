module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradiente-skeleton':
          'linear-gradient(to right, rgba(255,255,255,0),rgba(255,255,255,0.5) 50% ,rgba(255,255,255,0) 80%)',
      },
      backgroundSize: {
        '50-200': '25px 200px',
      },
      animation: {
        shink: 'shink 1s infinite',
      },
      keyframes: {
        shink: {
          to: {
            backgroundPosition: '120% 0',
          },
        },
      },
      gridTemplateRows: {
        // Complex site-specific row configuration
        'dashboard-layout': '180px 220px 220px',
        'dashboard-layout-sm': '160px 160px 160px 350px 350px 350px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
