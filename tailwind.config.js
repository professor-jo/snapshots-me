export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        display: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        logo: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
      },
      // Lab Notebook palette. Values live as CSS variables in src/index.css.
      colors: {
        lab: Object.fromEntries(
          ['paper', 'surface', 'cell', 'line', 'ink', 'muted', 'blue', 'out', 'hl', 'onhl', 'green', 'purple', 'teal', 'btn', 'onbtn', 'btnicon', 'btnhover']
            .map((name) => [name, `rgb(var(--lab-${name}) / <alpha-value>)`])
        ),
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25px)' },
          '100%': { transform: 'translateY(0)' },
        },
        float2: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
          '100%': { transform: 'translateY(0)' },
        },
        float3: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 3s infinite ease-in-out',
        float2: 'float2 4s infinite ease-in-out',
        float3: 'float3 2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};