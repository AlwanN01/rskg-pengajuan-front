const { '[data-theme=dark]': darkTheme } = require('daisyui/src/colors/themes')
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@themesberg/flowbite/**/*.js'],
  theme: {
    extend: {
      animation: {
        fade: 'fadeOut 5s ease-in-out',
      },
      keyframes: (theme) => ({
        fadeOut: {
          '0%': { backgroundColor: theme('colors.red.300') },
          '100%': { backgroundColor: theme('colors.transparent') },
        },
      }),
    },
  },
  darkMode: 'class',
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          'base-200': '#2AB76B',
        },
      },
      {
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=night]'],
          // ...darkTheme,
          // primary: '#ea5234',
          // 'primary-focus': '#d43616',
          // 'primary-content': '#ffffff',
          // secondary: '#f000b8',
          // 'secondary-focus': '#bd0091',
          // 'secondary-content': '#ffffff',
          // neutral: '#2A2E37',
          // 'neutral-focus': '#2A2E37',
          // 'neutral-content': '#ffffff',

          // // other colors
          // success: '#009485',
        },
      },

      // and some pre-defined theme
      'forest',
      'synthwave',
    ],
  },
}
