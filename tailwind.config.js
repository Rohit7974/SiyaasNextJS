/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',       // White
        black: '#000000',       // Black
        primary: '#1f2937',      // Dark gray - main brand color
        secondary: '#6b7280',    // Medium gray
        accent: '#f59e0b',       // Amber - accent color
        success: '#10b981',      // Green
        error: '#ef4444',        // Red
        warning: '#f59e0b',      // Amber
        info: '#3b82f6',         // Blue
      },
    },
  },
  plugins: [],
};
