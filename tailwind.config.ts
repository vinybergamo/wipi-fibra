import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'dark-grey': '#202020',
      'dark-grey-2': '#585858',
      'grey': "#D2D2D2",
      'grey-2': '#FAFAFA',
      'grey-3': '#E6E8EC',
      'grey-4': '#D9D9D9',
      'green': '#09D35A',
      'dark-green': "#276300",
      'light-grey': '#D4D7DE',
      'lighter-grey': '#DBDBDB',
      'ascents': '#E77100',
      'ascents-dark': '#FF6F00',
      'ascents-darker': '#572000',
      'black': '#1F1D1D',
      'danger': "#E70000"
    },
    extend: {
      keyframes: {
        pulse: {
          '0%': {
            opacity: '0',
            transform: 'scale(0)'
          },
          '75%': {
            opacity: '0.8',
            transform: 'scale(1)'
          },
          '100%': {
            opacity: '0',
            transform: 'scale(1.4)'
          }
        }
      },
      animation: {
        pulse: 'pulse 2s infinite'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
    },
  },
  plugins: [],
};
export default config;