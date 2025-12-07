import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ReportType } from '@/config/report-types';

export interface EnhancedText {
          original: string;
          enhanced: string;
          isAIEnhanced: boolean;
          acceptedAt?: Date;
}

export interface WizardFormData {
          // Step 1: Organization
          educationRegion?: string;  // NEW: إدارة التعليم
          schoolName?: string;
          schoolType?: string;       // NEW: نوع المدرسة (ابتدائي، متوسط، ثانوي)
          department?: string;
          schoolLogo?: string;

          // Step 2: Activity Details
          title?: string;
          date?: string;
          targetAudience?: string[];
          participantsCount?: number;
          location?: string;
          executors?: string;         // NEW: المنفذ/ون
          duration?: string;          // NEW: مدة التنفيذ
          domain?: string;            // NEW: المجال
          executionSteps?: string;    // NEW: خطوات التنفيذ

          // Step 3: AI-Generated Objectives
          objectives?: EnhancedText[];
          results?: EnhancedText[];
          recommendations?: EnhancedText[];

          // Step 4: Media & Signatures
          photos?: string[];
          activityLeaderName?: string;  // NEW: اسم رائد النشاط
          activityLeaderTitle?: string; // NEW: مسمى رائد النشاط (اختياري)
          principalName?: string;       // NEW: اسم مدير المدرسة
          principalTitle?: string;      // NEW: مسمى مدير المدرسة (اختياري)
          evidenceLink?: string;        // NEW: رابط الشواهد
}

interface WizardState {
          // State
          currentStep: number;
          totalSteps: number;
          reportType: ReportType | null;
          formData: WizardFormData;
          isDirty: boolean;
          startedAt: Date | null;

          // Actions
          setReportType: (type: ReportType) => void;
          setStep: (step: number) => void;
          updateFormData: (data: Partial<WizardFormData>) => void;
          nextStep: () => void;
          prevStep: () => void;
          reset: () => void;
          markDirty: () => void;
}

const initialState = {
          currentStep: 1,
          totalSteps: 4,
          reportType: null as ReportType | null,
          formData: {} as WizardFormData,
          isDirty: false,
          startedAt: null as Date | null,
};

export const useWizardStore = create<WizardState>()(
          persist(
                    (set, get) => ({
                              ...initialState,

                              setReportType: (type) => set({
                                        reportType: type,
                                        startedAt: new Date(),
                                        currentStep: 1,
                                        formData: {},
                              }),

                              setStep: (step) => {
                                        const { totalSteps } = get();
                                        if (step >= 1 && step <= totalSteps) {
                                                  set({ currentStep: step });
                                        }
                              },

                              updateFormData: (data) => set({
                                        formData: { ...get().formData, ...data },
                                        isDirty: true,
                              }),

                              nextStep: () => {
                                        const { currentStep, totalSteps } = get();
                                        if (currentStep < totalSteps) {
                                                  set({ currentStep: currentStep + 1 });
                                        }
                              },

                              prevStep: () => {
                                        const { currentStep } = get();
                                        if (currentStep > 1) {
                                                  set({ currentStep: currentStep - 1 });
                                        }
                              },

                              reset: () => set(initialState),

                              markDirty: () => set({ isDirty: true }),
                    }),
                    {
                              name: 'reportcreator-wizard',
                              partialize: (state) => ({
                                        currentStep: state.currentStep,
                                        reportType: state.reportType,
                                        formData: state.formData,
                                        startedAt: state.startedAt,
                              }),
                    }
          )
);

// Selectors
export const useCurrentStep = () => useWizardStore((state) => state.currentStep);
export const useReportType = () => useWizardStore((state) => state.reportType);
export const useFormData = () => useWizardStore((state) => state.formData);

// Constants for dropdowns
export const EDUCATION_REGIONS = [
          'الإدارة العامة للتعليم بمنطقة الرياض',
          'الإدارة العامة للتعليم بمنطقة مكة المكرمة',
          'الإدارة العامة للتعليم بالمنطقة الشرقية',
          'الإدارة العامة للتعليم بمنطقة المدينة المنورة',
          'الإدارة العامة للتعليم بمنطقة القصيم',
          'الإدارة العامة للتعليم بمنطقة عسير',
          'الإدارة العامة للتعليم بمنطقة تبوك',
          'الإدارة العامة للتعليم بمنطقة حائل',
          'الإدارة العامة للتعليم بمنطقة الحدود الشمالية',
          'الإدارة العامة للتعليم بمنطقة جازان',
          'الإدارة العامة للتعليم بمنطقة نجران',
          'الإدارة العامة للتعليم بمنطقة الباحة',
          'الإدارة العامة للتعليم بمنطقة الجوف',
];

export const DOMAIN_OPTIONS = [
          'المواطنة',
          'التطوعي',
          'الصحي',
          'التربوي',
          'الثقافي',
          'الرياضي',
          'البيئي',
          'الاجتماعي',
          'الفني',
          'الديني',
          'المهني',
];

export const LOCATION_OPTIONS = [
          'ساحة المدرسة',
          'الملعب الرياضي',
          'المسرح المدرسي',
          'قاعة الاجتماعات',
          'المختبر',
          'المكتبة',
          'الفصول الدراسية',
          'غرفة مصادر التعلم',
          'المصلى',
          'ساحة المدرسة',
          'قاعة النشاط',
          'أخرى',
];

export const DURATION_OPTIONS = [
          'ساعة واحدة',
          'ساعتان',
          'نصف يوم',
          'يوم واحد',
          'يومان',
          'ثلاثة أيام',
          'أسبوع',
          'أسبوعان',
          'شهر',
          'فصل دراسي',
];

export const SCHOOL_TYPE_OPTIONS = [
          'ابتدائي',
          'متوسط',
          'ثانوي',
];

// Typical participant counts based on school type in Saudi Arabia
export const PARTICIPANTS_COUNT_OPTIONS: Record<string, number[]> = {
          'ابتدائي': [50, 100, 150, 200, 250, 300, 350, 400],
          'متوسط': [50, 100, 150, 200, 250, 300, 350],
          'ثانوي': [50, 100, 150, 200, 250, 300, 350, 400, 450, 500],
          'default': [25, 50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500],
};
