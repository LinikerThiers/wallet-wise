/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul-face': '#3d5a98',
        'azul-face-claro': '#6081c7',
      },
      backgroundImage: {
        'imagem-fundo': "url('./src/assets/img/background-image-1.svg')",
      }
    },
  },
  plugins: [],
}

