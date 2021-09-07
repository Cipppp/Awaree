module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'media', // or false or 'class'
    theme: {
        extend: {
            fontFamily: {
                josefin: ['"Josefin Sans"'],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
