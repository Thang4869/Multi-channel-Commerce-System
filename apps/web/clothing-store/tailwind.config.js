/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: 'var(--brand)',
        accent: 'var(--accent)',
        ink: 'var(--ink)',
        surface: 'var(--surface)',
        surface2: 'var(--surface-2)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      boxShadow: {
        glow: '0 24px 40px -26px rgba(91, 123, 122, 0.45)',
      },
    },
  },
  plugins: [],
};
