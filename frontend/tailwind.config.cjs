/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#f97316', // Orange-500
                    hover: '#ea580c',   // Orange-600
                },
                dark: {
                    DEFAULT: '#1f2937', // Gray-800
                    lighter: '#374151', // Gray-700
                    darker: '#111827',  // Gray-900
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
