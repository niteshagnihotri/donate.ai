/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient_green':"linear-gradient(to right bottom,#e6ffef, #e3ffed, #e0ffea, #deffe8, #dbffe5, #cdfbda, #bff6ce, #b1f2c3, #94e8ab, #76dd94, #54d27c, #23c763)",
      },
    },
    fontFamily: {
      'Dongle': "'Dongle', sans-serif",
      'RedHat': "'Red Hat Text', sans-serif",
      'Ubuntu': "'Ubuntu', sans-serif",
      'Work': "'Work Sans', sans-serif",
      'Algreya': "'Alegreya Sans', sans-serif",
      'Manrope': "'Manrope', sans-serif",
      'Poppins': " 'Poppins', sans-serif",
      'Roboto': "'Roboto', sans-serif",
      'Source-Sans-Pro': "'Source Sans Pro', sans-serif"
    }
  },
  plugins: [],
}

// background-image: linear-gradient(to right bottom, #e6ffef, #e3ffed, #e0ffea, #deffe8, #dbffe5, #cdfbda, #bff6ce, #b1f2c3, #94e8ab, #76dd94, #54d27c, #23c763);
