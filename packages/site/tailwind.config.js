module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["roboto"],
      poppins: ["poppins"],
    },
    extend: {
      fontSize: {
        xxs: ".60rem",
      },
      colors: {
        primary: "rgba(8,126,164, 0.8)",
      },
      margin: {
        17: "4.25rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
