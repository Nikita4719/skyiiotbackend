// postcss.config.js
module.exports = {
  plugins: {
    'postcss-nesting': {}, // ✅ add this BEFORE tailwindcss
    tailwindcss: {},
    autoprefixer: {},
  },
}