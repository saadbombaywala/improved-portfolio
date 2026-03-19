/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'os-bg': 'var(--os-bg)',
        'os-desktop': 'var(--os-desktop)',
        'os-taskbar': 'var(--os-taskbar)',
        'os-window': 'var(--os-window)',
        'os-window-title': 'var(--os-window-title)',
        'os-border': 'var(--os-border)',
        'os-border-glow': 'var(--os-border-glow)',
        'os-accent': 'var(--os-accent)',
        'os-accent2': 'var(--os-accent2)',
        'os-accent3': 'var(--os-accent3)',
        'os-green': 'var(--os-green)',
        'os-red': 'var(--os-red)',
        'os-yellow': 'var(--os-yellow)',
        'os-text': 'var(--os-text)',
        'os-muted': 'var(--os-muted)',
      },
      fontFamily: {
        mono: ['var(--font-mono)'],
        display: ['var(--font-display)'],
      }
    },
  },
  plugins: [],
}
