import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss(), // ✅ wrap as a function call
    autoprefixer(),
  ],
};
