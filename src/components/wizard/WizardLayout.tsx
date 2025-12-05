"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  BookmarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import {
  BuildingOffice2Icon,
  CalendarDaysIcon,
  FlagIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import { useWizardStore } from "@/stores/wizard-store";
import { ThemeToggle } from "@/components/theme-toggle";

// Step configurations with icons
const STEPS = [
  { number: 1, label: "الجهة", icon: BuildingOffice2Icon },
  { number: 2, label: "التفاصيل", icon: CalendarDaysIcon },
  { number: 3, label: "الأهداف", icon: FlagIcon },
  { number: 4, label: "الصور", icon: PhotoIcon },
];

interface WizardLayoutProps {
  children: React.ReactNode;
  reportTypeTitle: string;
}

export default function WizardLayout({ children, reportTypeTitle }: WizardLayoutProps) {
  const { currentStep } = useWizardStore();
  const totalSteps = 4;
  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Floating Orbs (Subtler for light mode) */}
      <div className="floating-orb orb-green w-64 h-64 -top-32 right-0 opacity-10 dark:opacity-20" />
      <div className="floating-orb orb-purple w-48 h-48 bottom-20 -left-24 opacity-10 dark:opacity-20" style={{ animationDelay: '3s' }} />

      {/* Header */}
      <header className="relative z-10 glass-card mx-4 mt-4 p-4 flex items-center justify-between bg-white/80 dark:bg-white/5">
        <Link href="/select" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors group">
          <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span>رجوع</span>
        </Link>

        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">{reportTypeTitle}</h1>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
            <BookmarkIcon className="w-5 h-5" />
            <span className="hidden sm:inline">حفظ مسودة</span>
          </button>
        </div>
      </header>

      {/* Progress Section */}
      <div className="relative z-10 px-4 py-6">
        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-500 dark:text-slate-400 text-sm">الخطوة {currentStep} من {totalSteps}</span>
            <span className="text-primary text-sm">{Math.round(progressPercent)}%</span>
          </div>
          <div className="progress-bar bg-slate-200 dark:bg-white/10">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center">
            {STEPS.map((step, index) => (
              <StepIndicator
                key={step.number}
                number={step.number}
                label={step.label}
                Icon={step.icon}
                isActive={currentStep === step.number}
                isCompleted={currentStep > step.number}
                isLast={index === STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-8 bg-white/80 dark:bg-white/5 shadow-sm dark:shadow-none">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

function StepIndicator({
  number,
  label,
  Icon,
  isActive,
  isCompleted,
  isLast,
}: {
  number: number;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  isCompleted: boolean;
  isLast: boolean;
}) {
  return (
    <div className="flex items-center">
      {/* Step Circle */}
      <div className="flex flex-col items-center">
        <div
          className={`
            w-12 h-12 rounded-full flex items-center justify-center
            transition-all duration-300
            ${isCompleted
              ? 'bg-primary text-white shadow-md shadow-emerald-200 dark:shadow-glow-green'
              : isActive
                ? 'bg-accent text-white ring-4 ring-accent/20 shadow-md shadow-amber-200 dark:shadow-glow-golden'
                : 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-white/10'
            }
          `}
        >
          {isCompleted ? (
            <CheckIcon className="w-6 h-6" />
          ) : (
            <Icon className="w-5 h-5" />
          )}
        </div>
        <span
          className={`
            mt-2 text-xs hidden md:block font-medium
            ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}
          `}
        >
          {label}
        </span>
      </div>

      {/* Connector Line */}
      {!isLast && (
        <div
          className={`
            w-12 md:w-24 h-0.5 mx-2
            ${isCompleted ? 'bg-primary' : 'bg-slate-200 dark:bg-white/10'}
          `}
        />
      )}
    </div>
  );
}
