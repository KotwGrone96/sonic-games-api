/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html'],
  theme: {
    extend: {
      backgroundImage: {
        'sonic-bg': 'url(/sonic-games-api/bg.jpg)',
      },
    },
  },
  plugins: [],
};
