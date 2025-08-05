/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fc8019',
        secondary: '#686b78',
        success: '#60b246',
        danger: '#e23744'
      }
    },
  },
  plugins: [],
}