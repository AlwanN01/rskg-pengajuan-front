const { '[data-theme=dark]': darkTheme } = require('daisyui/colors/themes')
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@themesberg/flowbite/**/*.js'],
  theme: {
    extend: {},
  },
  darkMode: 'media',
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      {
        light: {
          // custom theme
          primary: '#ea5234',
          'primary-focus': '#d43616',
          'primary-content': '#ffffff',
          secondary: '#f000b8',
          'secondary-focus': '#bd0091',
          'secondary-content': '#ffffff',
          accent: '#37cdbe',
          'accent-focus': '#2aa79b',
          'accent-content': '#ffffff',
          neutral: '#ffffff',
          'neutral-focus': '#16181D',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#d1d5db',
          'base-content': '#1f2937',
          // other colors
          info: '#66C7FF',
          success: '#009485',
          warning: '#E2D562',
          error: '#FF6F6F',
        },
      },
      {
        dark: {
          ...darkTheme,
          primary: '#ea5234',
          'primary-focus': '#d43616',
          'primary-content': '#ffffff',
          secondary: '#f000b8',
          'secondary-focus': '#bd0091',
          'secondary-content': '#ffffff',
          neutral: '#2A2E37',
          'neutral-focus': '#2A2E37',
          'neutral-content': '#ffffff',

          // other colors
          success: '#009485',
        },
      },

      // and some pre-defined theme
      'forest',
      'synthwave',
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
}
