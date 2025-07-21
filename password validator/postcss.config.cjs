// This file must be CommonJS because Vite expects postcss.config in CJS when using type: module
module.exports = {
    plugins: {
        '@tailwindcss/postcss': {},
        autoprefixer: {},
    },
}; 