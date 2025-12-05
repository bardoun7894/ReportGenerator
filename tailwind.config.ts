import type { Config } from 'tailwindcss'

const config: Config = {
          darkMode: 'class',
          content: [
                    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
                    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
                    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
          ],
          theme: {
                    extend: {
                              colors: {
                                        // Dark Theme - Premium Navy
                                        background: {
                                                  DEFAULT: '#0F172A',
                                                  secondary: '#1E293B',
                                        },
                                        // Accent Colors
                                        primary: {
                                                  DEFAULT: '#10B981', // Green
                                                  hover: '#059669',
                                        },
                                        accent: {
                                                  DEFAULT: '#FFB300', // Golden
                                                  hover: '#FF9800',
                                        },
                                        ai: {
                                                  DEFAULT: '#8B5CF6', // Purple
                                                  hover: '#7C3AED',
                                        },
                                        // Glass Effect
                                        glass: {
                                                  bg: 'rgba(255, 255, 255, 0.1)',
                                                  border: 'rgba(255, 255, 255, 0.2)',
                                        },
                              },
                              fontFamily: {
                                        cairo: ['Cairo', 'sans-serif'],
                                        tajawal: ['Tajawal', 'sans-serif'],
                              },
                              backdropBlur: {
                                        glass: '10px',
                              },
                              boxShadow: {
                                        'glow-green': '0 0 20px rgba(16, 185, 129, 0.3)',
                                        'glow-golden': '0 0 20px rgba(255, 179, 0, 0.3)',
                                        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
                              },
                              animation: {
                                        'float': 'float 6s ease-in-out infinite',
                                        'glow': 'glow 2s ease-in-out infinite',
                                        'slide-up': 'slideUp 0.3s ease-out',
                              },
                              keyframes: {
                                        float: {
                                                  '0%, 100%': { transform: 'translateY(0) scale(1)' },
                                                  '50%': { transform: 'translateY(-20px) scale(1.1)' },
                                        },
                                        glow: {
                                                  '0%, 100%': { opacity: '1' },
                                                  '50%': { opacity: '0.7' },
                                        },
                                        slideUp: {
                                                  from: { opacity: '0', transform: 'translateY(10px)' },
                                                  to: { opacity: '1', transform: 'translateY(0)' },
                                        },
                              },
                    },
          },
          plugins: [],
}

export default config
