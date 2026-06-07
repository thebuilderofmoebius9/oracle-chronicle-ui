/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cat-black': '#000000',
        'cat-dark': '#18181B',
        'cat-eye': '#D9F99D', // Neon lime/yellow
        'cat-gray': '#27272A',
        'cat-text': '#FAFAFA',
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Playfair Display', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
