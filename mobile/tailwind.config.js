/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        grayLight: "#E5E7EB",
        grayDark: "#4B5563",
      },

      fontSize: {
        h1: ["20px", { 
          lineHeight: "20px",
          fontWeight: 700,
          letterSpacing: -1,   
        }],
        h2: ["18px", { 
          lineHeight: "18px",
          fontWeight: 700,
          letterSpacing: -1,
        }],
        body1: ["16px", { 
          lineHeight: "16px",
          fontWeight: 700,
          letterSpacing: -1,
        }],
        body2: ["14px", { 
          lineHeight: "14px",
          fontWeight: 700,
          letterSpacing: -1,
        }],
        body3: ["12px", { 
          lineHeight: "12px",
          fontWeight: 300,
          letterSpacing: -1,
        }],
        caption: ["10px", { 
          lineHeight: "10px",
          fontWeight: 300,
          letterSpacing: -1,
        }],
      },

      fontFamily: {
        koreanRegular: ["Bookk-Myungjo", "serif"],
        koreanBold: ["Bookk-Myungjo-Bold", "serif"],
        english: ["Crimson Text", "serif"],
      },
    },
  },
  plugins: [],
};