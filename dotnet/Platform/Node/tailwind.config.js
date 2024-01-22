/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "../Views/**/*.{cshtml,js,ts}",
      "../wwwroot/js/*.js"
    ],
    theme: {
      extend: {
        backdropBlur: {
          xxs: '1px',
        },
        keyframes: {
          wiggle: {
            '0%, 100%': { transform: 'rotate(-1deg)' },
            '50%': { transform: 'rotate(1deg)' },
          }
        },
        animation: {
          'wiggle-once': 'wiggle 1s ease-in-out 0.8',
          'ping-once': 'ping 0.25s ease-in-out 1',
          'ping-twice': 'ping 0.25s ease-in-out 2',
          'pulse-once': 'pulse 1s ease-in-out 1',
          'pulse-twice': 'pulse 1s ease-in-out 2',
          'bounce-once': 'bounce 0.75s ease-in-out 1',
          'bounce-short': 'bounce 1s ease-in-out 5'
        }
      },
    },
    plugins: [],
    variants: {
      extend: {
       borderColor: ['active'],
      }
    }
  }
  
  