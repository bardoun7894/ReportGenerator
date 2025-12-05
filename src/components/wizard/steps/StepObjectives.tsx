"use client";

import { useState, useEffect } from "react";
import {
          SparklesIcon,
          ArrowPathIcon,
          PlusIcon,
          TrashIcon,
          CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { FlagIcon } from "@heroicons/react/24/solid";
import { useWizardStore, EnhancedText } from "@/stores/wizard-store";

// Generate objectives based on activity data
const generateObjectivesFromData = (data: any): string[] => {
          const objectives: string[] = [];
          const title = data.title || "";
          const audience = data.targetAudience || [];
          const domain = data.domain || "";

          // Base objectives pattern based on activity title
          if (title) {
                    objectives.push(`تعريف المشاركين بأهمية ${title} ودوره في تعزيز البيئة التعليمية.`);
                    objectives.push(`تنمية الوعي لدى الحضور بالجوانب المختلفة المتعلقة ب${title}.`);
          }

          // Domain-specific objectives
          if (domain === 'المواطنة') {
                    objectives.push("تعزيز الهوية الوطنية والانتماء والولاء للوطن.");
          } else if (domain === 'التطوعي') {
                    objectives.push("غرس قيم العمل التطوعي وخدمة المجتمع لدى المشاركين.");
          } else if (domain === 'الصحي') {
                    objectives.push("نشر الوعي الصحي وتعزيز السلوكيات الصحية السليمة.");
          }

          // Audience-specific objectives
          if (audience.includes("students")) {
                    objectives.push("إكساب الطلاب مهارات جديدة وتعزيز قدراتهم الإبداعية.");
          }
          if (audience.includes("teachers")) {
                    objectives.push("تبادل الخبرات بين المعلمين وتطوير الممارسات التربوية.");
          }
          if (audience.includes("parents")) {
                    objectives.push("تعزيز الشراكة بين المدرسة والأسرة في دعم العملية التعليمية.");
          }

          return objectives.slice(0, 4);
};

export default function StepObjectives() {
          const { formData, updateFormData } = useWizardStore();
          const [isGenerating, setIsGenerating] = useState(false);
          const [hasGenerated, setHasGenerated] = useState(false);

          const objectives = formData.objectives || [];

          useEffect(() => {
                    if (objectives.length === 0 && !hasGenerated) {
                              handleGenerateAll();
                    }
          }, []);

          const handleGenerateAll = async () => {
                    setIsGenerating(true);
                    await new Promise(resolve => setTimeout(resolve, 1500));

                    const generatedTexts = generateObjectivesFromData(formData);
                    const newObjectives: EnhancedText[] = generatedTexts.map(text => ({
                              original: text,
                              enhanced: text,
                              isAIEnhanced: true,
                              acceptedAt: new Date(),
                    }));

                    updateFormData({ objectives: newObjectives });
                    setIsGenerating(false);
                    setHasGenerated(true);
          };

          const addObjective = () => {
                    updateFormData({
                              objectives: [...objectives, { original: "", enhanced: "", isAIEnhanced: false }],
                    });
          };

          const removeObjective = (index: number) => {
                    if (objectives.length > 1) {
                              const updated = objectives.filter((_, i) => i !== index);
                              updateFormData({ objectives: updated });
                    }
          };

          const updateObjective = (index: number, value: string) => {
                    const updated = [...objectives];
                    updated[index] = { ...updated[index], original: value, enhanced: value, isAIEnhanced: false };
                    updateFormData({ objectives: updated });
          };

          return (
                    <div>
                              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-slate-900 dark:text-white">
                                        <FlagIcon className="w-7 h-7 text-primary" />
                                        <span>أهداف الفعالية</span>
                              </h2>

                              {/* AI Auto-Generation Banner */}
                              <div className="bg-ai/10 border border-ai/30 rounded-xl p-4 mb-6 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                                  <SparklesIcon className="w-6 h-6 text-ai" />
                                                  <div>
                                                            <p className="text-slate-900 dark:text-white font-medium">الذكاء الاصطناعي يقترح الأهداف</p>
                                                            <p className="text-slate-600 dark:text-white/60 text-sm">بناءً على بيانات الفعالية والمجال المحدد</p>
                                                  </div>
                                        </div>
                                        <button
                                                  onClick={handleGenerateAll}
                                                  disabled={isGenerating}
                                                  className="flex items-center gap-2 px-4 py-2 bg-ai/20 hover:bg-ai/30 text-ai rounded-xl transition-colors disabled:opacity-50"
                                        >
                                                  <ArrowPathIcon className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                                                  <span>إعادة توليد</span>
                                        </button>
                              </div>

                              {/* Loading State */}
                              {isGenerating && (
                                        <div className="text-center py-12">
                                                  <div className="inline-block animate-spin w-10 h-10 border-4 border-ai border-t-transparent rounded-full mb-4" />
                                                  <p className="text-ai">جاري توليد الأهداف بالذكاء الاصطناعي...</p>
                                        </div>
                              )}

                              {/* Objectives List */}
                              {!isGenerating && (
                                        <div className="space-y-4">
                                                  {objectives.map((objective, index) => (
                                                            <div key={index} className="flex items-start gap-3">
                                                                      {/* Number Badge */}
                                                                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold mt-2 flex-shrink-0">
                                                                                {index + 1}
                                                                      </div>

                                                                      {/* Objective Text */}
                                                                      <div className="flex-1">
                                                                                <div className="relative">
                                                                                          <input
                                                                                                    type="text"
                                                                                                    value={objective.enhanced || objective.original}
                                                                                                    onChange={(e) => updateObjective(index, e.target.value)}
                                                                                                    placeholder="هدف الفعالية..."
                                                                                                    className={`form-input ${objective.isAIEnhanced ? 'border-ai/50' : ''}`}
                                                                                          />
                                                                                          {objective.isAIEnhanced && (
                                                                                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-ai text-xs">
                                                                                                              <CheckCircleIcon className="w-4 h-4" />
                                                                                                    </div>
                                                                                          )}
                                                                                </div>
                                                                      </div>

                                                                      {/* Delete Button */}
                                                                      {objectives.length > 1 && (
                                                                                <button
                                                                                          type="button"
                                                                                          onClick={() => removeObjective(index)}
                                                                                          className="mt-2 text-slate-400 dark:text-white/30 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                                                                >
                                                                                          <TrashIcon className="w-5 h-5" />
                                                                                </button>
                                                                      )}
                                                            </div>
                                                  ))}

                                                  {/* Add Custom Objective */}
                                                  <button
                                                            type="button"
                                                            onClick={addObjective}
                                                            className="flex items-center gap-2 text-slate-600 dark:text-white/60 hover:text-primary transition-colors px-4 py-3 mr-11"
                                                  >
                                                            <PlusIcon className="w-5 h-5" />
                                                            <span>إضافة هدف يدوي</span>
                                                  </button>
                                        </div>
                              )}

                              {/* Tip */}
                              <div className="mt-6 flex items-start gap-3 text-slate-500 dark:text-white/50 text-sm mr-11">
                                        <SparklesIcon className="w-5 h-5 text-ai flex-shrink-0" />
                                        <p>يمكنك تعديل الأهداف المقترحة أو إضافة أهداف جديدة حسب حاجتك</p>
                              </div>
                    </div>
          );
}
