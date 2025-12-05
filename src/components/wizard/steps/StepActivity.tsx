"use client";

import { useState } from "react";
import {
          SparklesIcon,
          ArrowPathIcon,
          ListBulletIcon,
} from "@heroicons/react/24/outline";
import { useWizardStore, DOMAIN_OPTIONS } from "@/stores/wizard-store";
import {
          CalendarDaysIcon,
          MapPinIcon,
          UserGroupIcon,
          ClockIcon,
          UserIcon,
          TagIcon,
} from "@heroicons/react/24/solid";

const TARGET_AUDIENCES = [
          { id: "students", label: "الطلاب" },
          { id: "teachers", label: "المعلمين" },
          { id: "parents", label: "أولياء الأمور" },
          { id: "admin", label: "الإدارة" },
          { id: "community", label: "المجتمع" },
];

// Generate execution steps based on activity data
const generateExecutionSteps = (data: any): string => {
          const title = data.title || "الفعالية";
          const audience = data.targetAudience || [];

          const steps: string[] = [];

          // Opening step
          steps.push("١. إذاعة صباحية متنوعة عن " + title + ".");

          // Activities based on audience
          if (audience.includes("students")) {
                    steps.push("٢. تنظيم مسابقات ثقافية وفنية للطلاب.");
          } else {
                    steps.push("٢. تنظيم أنشطة تفاعلية متنوعة.");
          }

          if (audience.includes("teachers")) {
                    steps.push("٣. مشاركة المعلمين في تقديم العروض والفقرات.");
          }

          if (audience.includes("parents")) {
                    steps.push("٤. دعوة أولياء الأمور للمشاركة والحضور.");
          }

          // Closing step
          steps.push(`${steps.length + 1}. تكريم المشاركين وتوزيع شهادات الشكر.`);

          return steps.join("\n");
};

export default function StepActivity() {
          const { formData, updateFormData } = useWizardStore();
          const [isGeneratingSteps, setIsGeneratingSteps] = useState(false);

          const toggleAudience = (id: string) => {
                    const current = formData.targetAudience || [];
                    const updated = current.includes(id)
                              ? current.filter((a) => a !== id)
                              : [...current, id];
                    updateFormData({ targetAudience: updated });
          };

          const handleGenerateSteps = async () => {
                    setIsGeneratingSteps(true);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    const generatedSteps = generateExecutionSteps(formData);
                    updateFormData({ executionSteps: generatedSteps });
                    setIsGeneratingSteps(false);
          };

          return (
                    <div>
                              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-slate-900 dark:text-white">
                                        <CalendarDaysIcon className="w-7 h-7 text-primary" />
                                        <span>تفاصيل الفعالية</span>
                              </h2>
                              <p className="text-slate-600 dark:text-white/60 mb-8">أدخل معلومات الفعالية أو البرنامج</p>

                              <div className="space-y-6">
                                        {/* Title */}
                                        <div>
                                                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-white">
                                                            اسم البرنامج / الفعالية <span className="text-accent">*</span>
                                                  </label>
                                                  <input
                                                            type="text"
                                                            value={formData.title || ""}
                                                            onChange={(e) => updateFormData({ title: e.target.value })}
                                                            placeholder="مثال: الاحتفاء باليوم الوطني ٩٥"
                                                            className="form-input"
                                                  />
                                        </div>

                                        {/* Date & Duration Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                  <div>
                                                            <label className="block text-sm font-medium mb-2 flex items-center gap-2 text-slate-700 dark:text-white">
                                                                      <CalendarDaysIcon className="w-4 h-4 text-slate-400 dark:text-white/50" />
                                                                      تاريخ التنفيذ <span className="text-accent">*</span>
                                                            </label>
                                                            <input
                                                                      type="date"
                                                                      value={formData.date || ""}
                                                                      onChange={(e) => updateFormData({ date: e.target.value })}
                                                                      className="form-input"
                                                            />
                                                  </div>
                                                  <div>
                                                            <label className="block text-sm font-medium mb-2 flex items-center gap-2 text-slate-700 dark:text-white">
                                                                      <ClockIcon className="w-4 h-4 text-slate-400 dark:text-white/50" />
                                                                      مدة التنفيذ <span className="text-accent">*</span>
                                                            </label>
                                                            <input
                                                                      type="text"
                                                                      value={formData.duration || ""}
                                                                      onChange={(e) => updateFormData({ duration: e.target.value })}
                                                                      placeholder="مثال: يوم واحد"
                                                                      className="form-input"
                                                            />
                                                  </div>
                                        </div>

                                        {/* Executors */}
                                        <div>
                                                  <label className="block text-sm font-medium mb-2 flex items-center gap-2 text-slate-700 dark:text-white">
                                                            <UserIcon className="w-4 h-4 text-slate-400 dark:text-white/50" />
                                                            المنفذ/ون <span className="text-accent">*</span>
                                                  </label>
                                                  <input
                                                            type="text"
                                                            value={formData.executors || ""}
                                                            onChange={(e) => updateFormData({ executors: e.target.value })}
                                                            placeholder="مثال: جميع منسوبي المدرسة"
                                                            className="form-input"
                                                  />
                                        </div>

                                        {/* Domain & Location Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                  <div>
                                                            <label className="block text-sm font-medium mb-2 flex items-center gap-2 text-slate-700 dark:text-white">
                                                                      <TagIcon className="w-4 h-4 text-slate-400 dark:text-white/50" />
                                                                      المجال <span className="text-accent">*</span>
                                                            </label>
                                                            <select
                                                                      value={formData.domain || ""}
                                                                      onChange={(e) => updateFormData({ domain: e.target.value })}
                                                                      className="form-input"
                                                            >
                                                                      <option value="">اختر المجال</option>
                                                                      {DOMAIN_OPTIONS.map((domain) => (
                                                                                <option key={domain} value={domain}>
                                                                                          {domain}
                                                                                </option>
                                                                      ))}
                                                            </select>
                                                  </div>
                                                  <div>
                                                            <label className="block text-sm font-medium mb-2 flex items-center gap-2 text-slate-700 dark:text-white">
                                                                      <MapPinIcon className="w-4 h-4 text-slate-400 dark:text-white/50" />
                                                                      مكان التنفيذ <span className="text-accent">*</span>
                                                            </label>
                                                            <input
                                                                      type="text"
                                                                      value={formData.location || ""}
                                                                      onChange={(e) => updateFormData({ location: e.target.value })}
                                                                      placeholder="مثال: فناء المدرسة"
                                                                      className="form-input"
                                                            />
                                                  </div>
                                        </div>

                                        {/* Target Audience */}
                                        <div>
                                                  <label className="block text-sm font-medium mb-3 flex items-center gap-2 text-slate-700 dark:text-white">
                                                            <UserGroupIcon className="w-4 h-4 text-slate-400 dark:text-white/50" />
                                                            المستفيدون <span className="text-accent">*</span>
                                                  </label>
                                                  <div className="flex flex-wrap gap-3">
                                                            {TARGET_AUDIENCES.map((audience) => (
                                                                      <button
                                                                                key={audience.id}
                                                                                type="button"
                                                                                onClick={() => toggleAudience(audience.id)}
                                                                                className={`
                  px-4 py-2 rounded-xl border transition-all
                  ${formData.targetAudience?.includes(audience.id)
                                                                                                    ? "bg-primary/20 border-primary text-primary"
                                                                                                    : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/20 text-slate-600 dark:text-white/70 hover:border-slate-300 dark:hover:border-white/40"
                                                                                          }
                `}
                                                                      >
                                                                                {formData.targetAudience?.includes(audience.id) && (
                                                                                          <span className="ml-2">✓</span>
                                                                                )}
                                                                                {audience.label}
                                                                      </button>
                                                            ))}
                                                  </div>
                                        </div>

                                        {/* Participants Count */}
                                        <div>
                                                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-white">
                                                            عدد المستفيدين <span className="text-accent">*</span>
                                                  </label>
                                                  <input
                                                            type="number"
                                                            min="1"
                                                            value={formData.participantsCount || ""}
                                                            onChange={(e) =>
                                                                      updateFormData({ participantsCount: parseInt(e.target.value) || undefined })
                                                            }
                                                            placeholder="مثال: 150"
                                                            className="form-input"
                                                  />
                                        </div>

                                        {/* Execution Steps with AI Generation */}
                                        <div>
                                                  <div className="flex items-center justify-between mb-2">
                                                            <label className="text-sm font-medium flex items-center gap-2 text-slate-700 dark:text-white">
                                                                      <ListBulletIcon className="w-4 h-4 text-slate-400 dark:text-white/50" />
                                                                      خطوات التنفيذ / الوصف <span className="text-accent">*</span>
                                                            </label>
                                                            <button
                                                                      type="button"
                                                                      onClick={handleGenerateSteps}
                                                                      disabled={isGeneratingSteps || !formData.title}
                                                                      className="flex items-center gap-2 px-3 py-1.5 bg-ai/10 hover:bg-ai/20 text-ai rounded-lg text-sm transition-colors disabled:opacity-50"
                                                            >
                                                                      {isGeneratingSteps ? (
                                                                                <ArrowPathIcon className="w-4 h-4 animate-spin" />
                                                                      ) : (
                                                                                <SparklesIcon className="w-4 h-4" />
                                                                      )}
                                                                      <span>توليد تلقائي</span>
                                                            </button>
                                                  </div>
                                                  <textarea
                                                            value={formData.executionSteps || ""}
                                                            onChange={(e) => updateFormData({ executionSteps: e.target.value })}
                                                            placeholder="١. إذاعة صباحية متنوعة عن الفعالية.&#10;٢. عمل مسابقات متنوعة.&#10;٣. تكريم المشاركين وتوزيع شهادات الشكر."
                                                            rows={5}
                                                            className="form-input resize-none"
                                                  />
                                                  <p className="text-slate-500 dark:text-white/40 text-sm mt-2 flex items-center gap-2">
                                                            <SparklesIcon className="w-4 h-4 text-ai" />
                                                            اضغط "توليد تلقائي" لإنشاء الخطوات بناءً على بيانات الفعالية
                                                  </p>
                                        </div>
                              </div>
                    </div>
          );
}
