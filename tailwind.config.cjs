module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#2C3E50',      // Dark blue-gray (replacing black)
        gold: '#F39C12',      // Golden yellow (brand color)
        royal: '#3498DB',     // Royal blue (accent)
        light: '#ECF0F1',     // Light gray (text)
        dark: '#34495E',      // Dark gray (mid tone)
        darker: '#1A252F'     // Darker navy (backgrounds)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(-5px)' },
          '50%': { transform: 'translateY(0)' },
        }
      }
    }
  },
  plugins: []
}