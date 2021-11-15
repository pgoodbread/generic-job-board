module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        xxs: ".60rem",
      },
      colors: {
        primary: "rgba(8,126,164, 0.8)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
