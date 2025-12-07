// Report Type Configuration
// Following Architecture section and PRD Report Types

export type ReportType = 'activity' | 'program' | 'discipline' | 'admin' | 'general';

export interface ReportTypeConfig {
  id: ReportType;
  title: string;
  subtitle: string;
  icon: string;
  enabled: boolean;
  fields: ReportField[];
}

export interface ReportField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'date' | 'number' | 'select' | 'multiselect' | 'file';
  required: boolean;
  aiEnhance?: boolean;
  options?: string[];
  placeholder?: string;
  step?: number; // Which wizard step this field belongs to
}

export const REPORT_TYPES: ReportTypeConfig[] = [
  {
    id: 'activity',
    title: 'تقرير فعالية مدرسية',
    subtitle: 'للفعاليات والمناسبات المدرسية',
    icon: '🎉',
    enabled: true,
    fields: [
      // Step 1: Organization
      { name: 'schoolName', label: 'اسم المدرسة', type: 'text', required: true, step: 1 },
      { name: 'department', label: 'القسم / الإدارة', type: 'text', required: true, step: 1 },
      { name: 'schoolLogo', label: 'شعار المدرسة', type: 'file', required: false, step: 1 },
      // Step 2: Activity
      { name: 'title', label: 'عنوان التقرير', type: 'text', required: true, step: 2 },
      { name: 'date', label: 'التاريخ', type: 'date', required: true, step: 2 },
      { name: 'targetAudience', label: 'الفئة المستهدفة', type: 'multiselect', required: true, step: 2, options: ['الطلاب', 'المعلمين', 'أولياء الأمور', 'الإدارة', 'المجتمع'] },
      { name: 'participantsCount', label: 'عدد المشاركين', type: 'number', required: true, step: 2 },
      { name: 'location', label: 'المكان', type: 'text', required: false, step: 2 },
      // Step 3: Objectives
      { name: 'objectives', label: 'أهداف الفعالية', type: 'textarea', required: true, aiEnhance: true, step: 3 },
      // Step 4: Results
      { name: 'results', label: 'نتائج الفعالية', type: 'textarea', required: true, aiEnhance: true, step: 4 },
      // Step 5: Recommendations
      { name: 'recommendations', label: 'التوصيات', type: 'textarea', required: false, aiEnhance: true, step: 5 },
      // Step 6: Media
      { name: 'photos', label: 'صور الفعالية', type: 'file', required: false, step: 6 },
    ],
  },
  {
    id: 'program',
    title: 'تقرير برنامج أو ورشة',
    subtitle: 'للدورات والورش التدريبية',
    icon: '📚',
    enabled: true,
    fields: [
      // Step 1: Organization
      { name: 'schoolName', label: 'اسم المدرسة', type: 'text', required: true, step: 1 },
      { name: 'department', label: 'القسم / الإدارة', type: 'text', required: true, step: 1 },
      // Step 2: Program Details
      { name: 'title', label: 'عنوان البرنامج', type: 'text', required: true, step: 2 },
      { name: 'programType', label: 'نوع البرنامج', type: 'select', required: true, step: 2, options: ['ورشة عمل', 'دورة تدريبية', 'مبادرة'] },
      { name: 'date', label: 'التاريخ', type: 'date', required: true, step: 2 },
      { name: 'duration', label: 'المدة', type: 'text', required: true, step: 2, placeholder: 'مثال: ساعتان' },
      { name: 'trainerName', label: 'اسم المدرب', type: 'text', required: true, step: 2 },
      { name: 'participantsCount', label: 'عدد المشاركين', type: 'number', required: true, step: 2 },
      // Step 3: Objectives
      { name: 'objectives', label: 'أهداف البرنامج', type: 'textarea', required: true, aiEnhance: true, step: 3 },
      // Step 4: Topics
      { name: 'topicsCovered', label: 'المحاور المطروحة', type: 'textarea', required: true, aiEnhance: true, step: 4 },
      // Step 5: Recommendations
      { name: 'recommendations', label: 'التوصيات', type: 'textarea', required: false, aiEnhance: true, step: 5 },
      // Step 6: Media
      { name: 'photos', label: 'صور البرنامج', type: 'file', required: false, step: 6 },
    ],
  },
  {
    id: 'discipline',
    title: 'تقرير انضباط / توجيه',
    subtitle: 'للتوجيه والإرشاد الطلابي',
    icon: '📋',
    enabled: false, // v1.1
    fields: [],
  },
  {
    id: 'admin',
    title: 'تقرير إدارة مدرسية',
    subtitle: 'للشؤون الإدارية',
    icon: '🏫',
    enabled: false, // v1.1
    fields: [],
  },
  {
    id: 'general',
    title: 'تقارير عامة',
    subtitle: 'قالب مرن لأي غرض',
    icon: '📄',
    enabled: true,
    fields: [
      // Step 1: Organization
      { name: 'schoolName', label: 'اسم المدرسة', type: 'text', required: true, step: 1 },
      { name: 'department', label: 'القسم / الإدارة', type: 'text', required: false, step: 1 },
      // Step 2: Report Info
      { name: 'title', label: 'عنوان التقرير', type: 'text', required: true, step: 2 },
      { name: 'date', label: 'التاريخ', type: 'date', required: true, step: 2 },
      // Step 3: Content
      { name: 'content', label: 'محتوى التقرير', type: 'textarea', required: true, aiEnhance: true, step: 3 },
      // Step 4: Results
      { name: 'results', label: 'النتائج', type: 'textarea', required: false, aiEnhance: true, step: 4 },
      // Step 5: Recommendations
      { name: 'recommendations', label: 'التوصيات', type: 'textarea', required: false, aiEnhance: true, step: 5 },
      // Step 6: Media
      { name: 'photos', label: 'الصور', type: 'file', required: false, step: 6 },
    ],
  },
];

export function getReportTypeConfig(type: ReportType): ReportTypeConfig | undefined {
  return REPORT_TYPES.find(rt => rt.id === type);
}

export function getEnabledReportTypes(): ReportTypeConfig[] {
  return REPORT_TYPES.filter(rt => rt.enabled);
}

export function getFieldsByStep(type: ReportType, step: number): ReportField[] {
  const config = getReportTypeConfig(type);
  if (!config) return [];
  return config.fields.filter(f => f.step === step);
}
