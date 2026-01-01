/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Azul Principal - Lightness
        sky: {
          50: '#E0F4FF',   // Azul muy claro
          100: '#B3E5FC',  // Azul claro
          200: '#4FC3F7',  // Azul medio claro
          300: '#0288D1',  // Azul medio (PRIMARY)
          400: '#01579B',  // Azul oscuro
          500: '#003D5C',  // Azul muy oscuro
          600: '#002838',  // Azul casi negro
        },
        
        // Aliases para uso común
        primary: {
          DEFAULT: '#0288D1',
          light: '#4FC3F7',
          dark: '#01579B',
          darker: '#003D5C',
        },
        
        // Colores de estado (mantener para alertas, etc.)
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },
        
        // Grises neutros (para complementar)
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
      
      // Gradientes personalizados
      backgroundImage: {
        'gradient-blue-primary': 'linear-gradient(135deg, #4FC3F7 0%, #0288D1 100%)',
        'gradient-blue-dark': 'linear-gradient(135deg, #0288D1 0%, #01579B 100%)',
        'gradient-blue-full': 'linear-gradient(135deg, #B3E5FC 0%, #01579B 100%)',
        'gradient-blue-light': 'linear-gradient(135deg, #E0F4FF 0%, #4FC3F7 100%)',
        'gradient-blue-radial': 'radial-gradient(circle, #4FC3F7 0%, #0288D1 100%)',
      },
      
      // Sombras personalizadas con azul
      boxShadow: {
        'sm-blue': '0 1px 2px 0 rgba(1, 87, 155, 0.05)',
        'md-blue': '0 4px 6px -1px rgba(1, 87, 155, 0.1), 0 2px 4px -1px rgba(1, 87, 155, 0.06)',
        'lg-blue': '0 10px 15px -3px rgba(1, 87, 155, 0.1), 0 4px 6px -2px rgba(1, 87, 155, 0.05)',
        'xl-blue': '0 20px 25px -5px rgba(1, 87, 155, 0.1), 0 10px 10px -5px rgba(1, 87, 155, 0.04)',
        '2xl-blue': '0 25px 50px -12px rgba(1, 87, 155, 0.25)',
        'glow-blue': '0 0 20px rgba(79, 195, 247, 0.5)',
      },
      
      // Animaciones personalizadas
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-slow': 'bounce-slow 2s infinite',
        'pulse-blue': 'pulse-blue 2s infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
      
      keyframes: {
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          'from': { transform: 'translateX(100%)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-blue': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(79, 195, 247, 0.7)' },
          '50%': { boxShadow: '0 0 0 10px rgba(79, 195, 247, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      
      // Espaciado personalizado
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      
      // Border radius personalizado
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      
      // Fuentes personalizadas (opcional)
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      
      // Z-index layers
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
  
  // Configuración de variantes
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
};