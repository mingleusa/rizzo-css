import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    postcssImport(),
    autoprefixer(),
    // cssnano only runs in production builds via postcss.prod.config.js
  ],
};
