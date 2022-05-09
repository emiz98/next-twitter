module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        twitter: '#03A9F4',
        twitterHover: '#34bbed',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('tailwind-scrollbar-hide')],
}
