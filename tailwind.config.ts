import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: '#0A0E27',
          900: '#070A1C',
          800: '#0A0E27',
          700: '#141935',
          600: '#1C2247',
          500: '#232149',
          400: '#2E2E5C',
        },
        moon: {
          DEFAULT: '#EBCB6B',
          light: '#F4E4B8',
          deep: '#C9A84A',
        },
        aurora: '#7FDBCA',
        lavender: {
          DEFAULT: '#C4BFF0',
          muted: '#9A96C4',
          deep: '#6E6AA0',
        },
        dawn: '#F5F4FB',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Apple SD Gothic Neo"',
          '"Malgun Gothic"',
          '"맑은 고딕"',
          '"Segoe UI"',
          'system-ui',
          'Roboto',
          'sans-serif',
        ],
        serif: [
          'Georgia',
          '"Apple SD Gothic Neo"',
          '"Nanum Myeongjo"',
          '"Times New Roman"',
          'serif',
        ],
        mono: [
          'ui-monospace',
          '"SF Mono"',
          '"Cascadia Mono"',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(235, 203, 107, 0.35)',
        'glow-soft': '0 0 24px -6px rgba(196, 191, 240, 0.25)',
        card: '0 8px 30px -12px rgba(4, 6, 20, 0.6)',
      },
      backgroundImage: {
        'night-gradient':
          'radial-gradient(120% 80% at 50% -10%, #232149 0%, #0A0E27 55%, #070A1C 100%)',
        'moon-text': 'linear-gradient(180deg, #F4E4B8 0%, #EBCB6B 60%, #C9A84A 100%)',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.25', transform: 'scale(0.9)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        twinkle: 'twinkle 4s ease-in-out infinite',
        floatY: 'floatY 6s ease-in-out infinite',
        fadeUp: 'fadeUp 0.6s ease-out both',
      },
      typography: {},
    },
  },
  plugins: [],
};

export default config;
