// Note: the Tailwind CLI scripts use tailwind.config.cjs.
// This TypeScript config is optional and kept for IDE type-safety and reference.
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/mainview/index.html",
    "./src/mainview/**/*.{html,js,jsx,ts,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {}
  },
  plugins: []
} satisfies Config;
