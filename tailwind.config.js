module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    autoprefixer: false,
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                brand: {
                    blue: "#1fb6ff",
                    purple: "rgba(107, 37, 231, 1)",
                    pink: "rgb(250, 52, 243)",
                    yellow: "rgba(255, 250, 101, 1)",
                    teal: "rgba(29, 189, 194, 1)",
                    gradientLightBlue: "rgba(174, 249, 254, 1)",
                },
            },
        },
    },
    plugins: [],
};
