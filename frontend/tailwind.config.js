/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
      {
        light: {
          primary: "#0B504F",
          secondary: "#10625f",
          neutral: "#222",
          "neutral-content": "#777",
          "base-100": "#ffffff",
        },
      },
      {
        dark: {
          neutral: "#eee",
          "neutral-content": "#b5aeae",
          "base-100": "#111",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
