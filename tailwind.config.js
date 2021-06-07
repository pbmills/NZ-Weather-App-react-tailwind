module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
      extend: {
          fontFamily: {
              body: ['Noto Sans JP','Poppins']
          },
          colors: {
              'dark': '#232323'
          }
      },
  },
  variants: {
      extend: {},
  },
  plugins: [
      require('@tailwindcss/forms'),
  ],
};
