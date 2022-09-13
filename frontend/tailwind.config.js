/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/flowbite/**/*.js'
    ],
    theme: {
        extend: {
            colors: colors,
            translate: {
            },
        }
    },
    plugins: [
        require('flowbite/plugin')
    ]
}
