"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useWizardStore } from "@/stores/wizard-store";
import Link from "next/link";

interface WizardNavigationProps {
  onNext?: () => void;
  onPrev?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
  showPreview?: boolean;
}

export default function WizardNavigation({
  onNext,
  onPrev,
  nextDisabled = false,
  nextLabel = "التالي",
  showPreview = false,
}: WizardNavigationProps) {
  const { currentStep, nextStep, prevStep, reportType } = useWizardStore();

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      nextStep();
    }
  };

  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    } else {
      prevStep();
    }
  };

  return (
    <div className="flex justify-between items-center pt-6 mt-6 border-t border-slate-200 dark:border-white/10">
      {/* Previous Button */}
      {currentStep > 1 ? (
        <button
          onClick={handlePrev}
          className="flex items-center gap-2 text-slate-500 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors px-6 py-3"
        >
          <ArrowRight className="w-5 h-5" />
          <span>السابق</span>
        </button>
      ) : (
        <div /> // Spacer
      )}

      {/* Next / Preview Button */}
      {showPreview ? (
        <Link
          href={`/preview/draft`}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-primary/20"
        >
          <span>معاينة التقرير</span>
          <ArrowLeft className="w-5 h-5" />
        </Link>
      ) : (
        <button
          onClick={handleNext}
          disabled={nextDisabled}
          className={`
            flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-medium transition-colors hover:bg-slate-800 dark:hover:bg-slate-100
            ${nextDisabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <span>{nextLabel}</span>
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
