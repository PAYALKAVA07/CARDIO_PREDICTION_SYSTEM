/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        primary: "#3f3aa0",       // Indigo-600
        primaryLight: "#E0E7FF",  // Indigo-100

        // Neutrals
        bgMain: "#F8FAFC",        // Slate-50
        card: "#FFFFFF",
        textPrimary: "#020617",  // Slate-950
        textSecondary: "#64748B",// Slate-500
        borderSubtle: "#CBD5E1", // Slate-300

        // Risk / Status
        success: "#15803D",      // Green-700
        warning: "#CA8A04",      // Yellow-600
        danger: "#B91C1C",       // Red-700

        // Helpers
        info: "#475569",         // Slate-600
        muted: "#94A3B8"         // Slate-400
      }
    },
  },
  plugins: [],
}
