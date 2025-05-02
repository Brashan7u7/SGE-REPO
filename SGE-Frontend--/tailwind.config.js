/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",     // Azul elegante
        secondary: "#F43F5E",   // Rojo/rosado vibrante
        neutral: "#F3F4F6",     // Fondo claro
        muted: "#6B7280",       // Texto suave
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Ligera, moderna
      },
     
      spacing: {
        18: "4.5rem",           // Espaciado adicional útil
      },
      height: {
        "screen-80": "80vh",
      },
    },
  },
  plugins: [],
};
