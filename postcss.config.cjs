const autoprefixer = require('autoprefixer');
const tailwindcss = require('@tailwindcss/postcss7-compat');

module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer,
  ],
};

