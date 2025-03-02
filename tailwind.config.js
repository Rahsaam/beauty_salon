/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        direction: {
          rtl: "rtl",
          ltr: "ltr",
        },
        animation: {
          fadeIn: "fadeIn 0.5s ease-in-out",
        },
        keyframes: {
          fadeIn: {
            "0%": { opacity: "0" },
            "100%": { opacity: "1" },
          },
        },
        colors: {
        //   primary: "#2dd4bf",
        //   secondary: "#67e8f9",
        //   muted: "#d1d5db",
        //   black: "#000",
        //   gray: "#e5e7eb",
        //   accent: "#fb923c",
        //   neutral: "#f5f5f4",
        //   base: "#ffffff",
        //   info: "#38bdf8",
        //   success: "#22c55e",
        //   warning: "#fcd34d",
        //   error: "#f43f5e",
        //   blur: "rgba(255, 255, 255, 0.5)",
        },
        screens: {
          mdx: "992px",
          xs: "480px",
        },
        gridTemplateColumns: {
          24: "repeat(24, minmax(0, 1fr))",
        },
        backgroundImage: {
          "special-gradient":
            "linear-gradient(75deg, rgb(8, 151, 156), rgb(135, 232, 222))",
          "special2-gradient":
            "linear-gradient(125deg, rgb(56, 142, 60), rgb(112, 209, 199))",
        },
      },
    },
    plugins: [],
  };
  
  export default tailwindConfig;
  