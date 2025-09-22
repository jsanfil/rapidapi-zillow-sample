/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'warm-beige': '#E4DDD7',
                'sage-green': '#BFD3CE',
                'teal-border': '#91B7BE',
                'blue-teal': '#6D98A5',
                'terracotta': '#CC7357',
            }
        },
    },
    plugins: [],
}
