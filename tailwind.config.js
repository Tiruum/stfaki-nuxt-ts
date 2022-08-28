module.exports = {
  content: [
    "./components/**/*.js",
    "./components/**/*.vue",
    "./components/**/*.ts",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.js",
    "./plugins/**/*.ts",
    "./nuxt.config.js",
    "./nuxt.config.ts",
  ],
  theme: {
    extend: {
      gridRowSpan: {
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12',
        '13': '13',
      }
    },
  },
  plugins: [],
  safelist: [
    'row-span-1',
    'row-span-2',
    'row-span-3',
    'row-span-4',
    'row-span-5',
    'row-span-6',
    {
      pattern: /bg-(blue|sky|purple|fuchsia|pink|indigo)-(400|600)/,
      variants: ['dark'],
    },
    {
      pattern: /text-(blue|sky|purple|fuchsia|pink|indigo)-(100|600)/,
      variants: ['dark'],
    },
    {
      pattern: /border-(blue|sky|purple|fuchsia|pink|indigo)-(500|700)/,
      variants: ['dark'],
    },
  ]
}