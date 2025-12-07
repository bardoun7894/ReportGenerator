// Template Configuration for Report Preview
// Professional Infographic Templates

export type TemplateId =
          | 'exchange-visit'
          | 'shahed'
          | 'modern-cards'
          | 'professional-grid'
          | 'minimal-clean'
          | 'bold-header'
          | 'classic-report'
          | 'teal-frame'
          | 'navy-executive'
          | 'forest-green'
          | 'royal-purple'
          | 'sunset-orange'
          | 'corporate-blue'
          | 'modern-minimal'
          | 'academic-excellence'
          | 'creative-studio'
          | 'official-gov'
          | 'shahed-exact'
          | 'shahed-modern'
          | 'shahed-compact'
          | 'shahed-dark'
          | 'shahed-elegant'
          | 'shahed-new';


export interface TemplateConfig {
          id: TemplateId;
          name: string;
          nameAr: string;
          description: string;
          icon: string;
          featured?: boolean; // NEW: Mark as featured template
          colorScheme: {
                    primary: string;
                    secondary: string;
                    accent: string;
                    background: string;
          };
}

export const TEMPLATES: TemplateConfig[] = [
          // Featured Templates (Top 5)
          {
                    id: 'exchange-visit',
                    name: 'Exchange Visit',
                    nameAr: 'الزيارة التبادلية',
                    description: 'Template for exchange visit reports between schools',
                    icon: '🔄',
                    featured: true,
                    colorScheme: {
                              primary: '#006C35',
                              secondary: '#008542',
                              accent: '#C8A051',
                              background: '#ffffff',
                    },
          },
          {
                    id: 'shahed',
                    name: 'Shahed Report',
                    nameAr: 'تقرير شاهد',
                    description: 'Official standard report style',
                    icon: '🇸🇦',
                    featured: true,
                    colorScheme: {
                              primary: '#006C35',
                              secondary: '#C8A051',
                              accent: '#F9FAFB',
                              background: '#FFFFFF',
                    },
          },
          {
                    id: 'modern-cards',
                    name: 'Modern Cards',
                    nameAr: 'البطاقات الحديثة',
                    description: 'Two-column layout with data cards and photo gallery',
                    icon: '🎴',
                    featured: true,
                    colorScheme: {
                              primary: '#0C8662',
                              secondary: '#006747',
                              accent: '#C9A050',
                              background: '#FAFAFA',
                    },
          },
          {
                    id: 'shahed-elegant',
                    name: 'Shahed Elegant',
                    nameAr: 'شاهد الأنيق',
                    description: 'Premium elegant design with gold borders and refined typography',
                    icon: '👑',
                    featured: true,
                    colorScheme: {
                              primary: '#006C35',
                              secondary: '#C8A051',
                              accent: '#E5C76B',
                              background: '#FFFEF8',
                    },
          },
          {
                    id: 'official-gov',
                    name: 'Official Government',
                    nameAr: 'الحكومي الرسمي',
                    description: 'Official Saudi green theme with watermarks',
                    icon: '🇸🇦',
                    featured: true,
                    colorScheme: {
                              primary: '#006C35',
                              secondary: '#C8A051',
                              accent: '#f3f4f6',
                              background: '#ffffff',
                    },
          },
          // Other Templates
          {
                    id: 'professional-grid',
                    name: 'Professional Grid',
                    nameAr: 'الشبكة الاحترافية',
                    description: 'Balanced symmetric grid layout',
                    icon: '📊',
                    colorScheme: {
                              primary: '#1E40AF',
                              secondary: '#3B82F6',
                              accent: '#059669',
                              background: '#F0F9FF',
                    },
          },
          {
                    id: 'minimal-clean',
                    name: 'Minimal Clean',
                    nameAr: 'التصميم البسيط',
                    description: 'Single column with elegant spacing',
                    icon: '✨',
                    colorScheme: {
                              primary: '#374151',
                              secondary: '#6B7280',
                              accent: '#10B981',
                              background: '#FFFFFF',
                    },
          },
          {
                    id: 'bold-header',
                    name: 'Bold Header',
                    nameAr: 'الرأس العريض',
                    description: 'Large hero title with compact details',
                    icon: '🎯',
                    colorScheme: {
                              primary: '#7C3AED',
                              secondary: '#A78BFA',
                              accent: '#F59E0B',
                              background: '#F5F3FF',
                    },
          },
          {
                    id: 'classic-report',
                    name: 'Classic Report',
                    nameAr: 'التقرير الرسمي',
                    description: 'Traditional Saudi ministry document style',
                    icon: '📋',
                    colorScheme: {
                              primary: '#006747',
                              secondary: '#0C8662',
                              accent: '#C9A050',
                              background: '#FFFEF7',
                    },
          },
          {
                    id: 'teal-frame',
                    name: 'Teal Frame',
                    nameAr: 'الإطار الفيروزي',
                    description: 'Dark teal frame with flat icons and 55/45 layout',
                    icon: '🖼️',
                    colorScheme: {
                              primary: '#0F3A3F',
                              secondary: '#00A88F',
                              accent: '#FFC857',
                              background: '#F5F7FA',
                    },
          },
          {
                    id: 'navy-executive',
                    name: 'Navy Executive',
                    nameAr: 'الأزرق التنفيذي',
                    description: 'Professional navy blue with gold accents',
                    icon: '🏢',
                    colorScheme: {
                              primary: '#1A2744',
                              secondary: '#2563EB',
                              accent: '#F59E0B',
                              background: '#F8FAFC',
                    },
          },
          {
                    id: 'forest-green',
                    name: 'Forest Green',
                    nameAr: 'الأخضر الطبيعي',
                    description: 'Nature-inspired green with soft accents',
                    icon: '🌿',
                    colorScheme: {
                              primary: '#1B4332',
                              secondary: '#40916C',
                              accent: '#95D5B2',
                              background: '#F0FDF4',
                    },
          },
          {
                    id: 'royal-purple',
                    name: 'Royal Purple',
                    nameAr: 'البنفسجي الملكي',
                    description: 'Luxury purple with gradient effects',
                    icon: '👑',
                    colorScheme: {
                              primary: '#2D1B4E',
                              secondary: '#7C3AED',
                              accent: '#C4B5FD',
                              background: '#FAF5FF',
                    },
          },
          {
                    id: 'sunset-orange',
                    name: 'Sunset Orange',
                    nameAr: 'برتقال الغروب',
                    description: 'Warm sunset gradient with hover effects',
                    icon: '🌅',
                    colorScheme: {
                              primary: '#7C2D12',
                              secondary: '#EA580C',
                              accent: '#FED7AA',
                              background: '#FFFBEB',
                    },
          },
          {
                    id: 'corporate-blue',
                    name: 'Corporate Blue',
                    nameAr: 'الأزرق المؤسسي',
                    description: 'Formal corporate style with sharp layout',
                    icon: '👔',
                    colorScheme: {
                              primary: '#1e293b',
                              secondary: '#3b82f6',
                              accent: '#64748b',
                              background: '#ffffff',
                    },
          },
          {
                    id: 'modern-minimal',
                    name: 'Modern Minimal',
                    nameAr: 'العصري البسيط',
                    description: 'High contrast black and white with large type',
                    icon: '⚫',
                    colorScheme: {
                              primary: '#000000',
                              secondary: '#333333',
                              accent: '#e5e7eb',
                              background: '#ffffff',
                    },
          },
          {
                    id: 'academic-excellence',
                    name: 'Academic Excellence',
                    nameAr: 'التميز الأكاديمي',
                    description: 'Traditional academic style with burgundy theme',
                    icon: '🎓',
                    colorScheme: {
                              primary: '#881337',
                              secondary: '#9f1239',
                              accent: '#fdfbf7',
                              background: '#fdfbf7',
                    },
          },
          {
                    id: 'creative-studio',
                    name: 'Creative Studio',
                    nameAr: 'الاستوديو الإبداعي',
                    description: 'Dark mode with neon gradients and glassmorphism',
                    icon: '🎨',
                    colorScheme: {
                              primary: '#0f172a',
                              secondary: '#8b5cf6',
                              accent: '#06b6d4',
                              background: '#0f172a',
                    },
          },
          // Shahed Series
          {
                    id: 'shahed-exact',
                    name: 'Shahed Exact',
                    nameAr: 'شاهد الأصلي',
                    description: '100% accurate replica of the original Shahed PDF template',
                    icon: '🎯',
                    colorScheme: {
                              primary: '#006C35',
                              secondary: '#C8A051',
                              accent: '#F9FAFB',
                              background: '#FFFFFF',
                    },
          },
          {
                    id: 'shahed-modern',
                    name: 'Shahed Modern',
                    nameAr: 'شاهد العصري',
                    description: 'Modern glassmorphism version with smooth animations',
                    icon: '✨',
                    colorScheme: {
                              primary: '#059669',
                              secondary: '#10B981',
                              accent: '#F59E0B',
                              background: '#ECFDF5',
                    },
          },
          {
                    id: 'shahed-compact',
                    name: 'Shahed Compact',
                    nameAr: 'شاهد المختصر',
                    description: 'Single-column compact layout for simpler reports',
                    icon: '📝',
                    colorScheme: {
                              primary: '#006C35',
                              secondary: '#C8A051',
                              accent: '#F3F4F6',
                              background: '#FFFFFF',
                    },
          },
          {
                    id: 'shahed-dark',
                    name: 'Shahed Dark',
                    nameAr: 'شاهد الداكن',
                    description: 'Dark mode version with emerald green accents',
                    icon: '🌙',
                    colorScheme: {
                              primary: '#10B981',
                              secondary: '#059669',
                              accent: '#F59E0B',
                              background: '#0F172A',
                    },
          },
          {
                    id: 'shahed-new',
                    name: 'Shahed New',
                    nameAr: 'شاهد الجديد',
                    description: 'Gradient version of the Shahed template with premium styling',
                    icon: '🆕',
                    colorScheme: {
                              primary: '#006C35',
                              secondary: '#C8A051',
                              accent: '#F9FAFB',
                              background: '#FFFFFF',
                    },
          },
];

export function getTemplateConfig(id: TemplateId): TemplateConfig | undefined {
          return TEMPLATES.find(t => t.id === id);
}

export function getDefaultTemplate(): TemplateConfig {
          return TEMPLATES[0];
}

export function getFeaturedTemplates(): TemplateConfig[] {
          return TEMPLATES.filter(t => t.featured);
}

export function getOtherTemplates(): TemplateConfig[] {
          return TEMPLATES.filter(t => !t.featured);
}
