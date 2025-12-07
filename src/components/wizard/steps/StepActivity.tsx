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
import ArabicDatePicker from "@/components/ui/ArabicDatePicker";

const TARGET_AUDIENCES = [
          { id: "students", label: "الطلاب" },
          { id: "teachers", label: "المعلمين" },
          { id: "parents", label: "أولياء الأمور" },
          { id: "admin", label: "الإدارة" },
          { id: "community", label: "المجتمع" },
];

export default function StepActivity() {
          const { formData, updateFormData } = useWizardStore();
          const [isGeneratingSteps, setIsGeneratingSteps] = useState(false);
          const [generationError, setGenerationError] = useState<string | null>(null);

          const toggleAudience = (id: string) => {
                    const current = formData.targetAudience || [];
                    const updated = current.includes(id)
                              ? current.filter((a) => a !== id)
                              : [...current, id];
                    updateFormData({ targetAudience: updated });
          };

          const handleGenerateSteps = async () => {
                    setIsGeneratingSteps(true);
                    setGenerationError(null);

                    try {
                              const response = await fetch('/api/generate', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({
                                                  title: formData.title,
                                                  domain: formData.domain,
                                                  targetAudience: formData.targetAudience,
                                                  location: formData.location,
                                                  participantsCount: formData.participantsCount,
                                                  executors: formData.executors,
                                                  duration: formData.duration,
                                                  schoolName: formData.schoolName,
                                        }),
                              });

                              if (!response.ok) {
                                        throw new Error('فشل في توليد المحتوى');
                              }

                              const data = await response.json();

                              // Combine description and steps
                              const content = data.description
                                        ? `${data.description}\n\n${data.executionSteps}`
                                        : data.executionSteps;

                              updateFormData({ executionSteps: content });
                    } catch (error) {
                              console.error('Generation error:', error);
                              setGenerationError('حدث خطأ أثناء توليد المحتوى. حاول مرة أخرى.');
                    } finally {
                              setIsGeneratingSteps(false);
                    }
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
                                                            <ArabicDatePicker
                                                                      value={formData.date || ""}
                                                                      onChange={(date) => updateFormData({ date })}
                                                                      placeholder="اختر تاريخ التنفيذ"
                                                            />
                                                  </div>
                                                  <div>
                                                            <label className="block text-sm font-medium mb-2 flex items-center gap-2 text-slate-700 dark:text-white">
                                                                      <ClockIcon className="w-4 h-4 text-slate-400 dark:text-white/50" />
                                                                      مدة التنفيذ <span className="text-accent">*</span>
                                                            </label>
                                                            <select
                                                                      value={formData.duration || ""}
                                                                      onChange={(e) => updateFormData({ duration: e.target.value })}
                                                                      className="form-input"
                                                            >
                                                                      <option value="">اختر المدة</option>
                                                                      <option value="ساعة واحدة">ساعة واحدة</option>
                                                                      <option value="ساعتان">ساعتان</option>
                                                                      <option value="نصف يوم">نصف يوم</option>
                                                                      <option value="يوم واحد">يوم واحد</option>
                                                                      <option value="يومان">يومان</option>
                                                                      <option value="ثلاثة أيام">ثلاثة أيام</option>
                                                                      <option value="أسبوع">أسبوع</option>
                                                                      <option value="أسبوعان">أسبوعان</option>
                                                                      <option value="شهر">شهر</option>
                                                                      <option value="فصل دراسي">فصل دراسي</option>
                                                            </select>
                                                  </div>
                                        </div>

                                        {/* Executors */}
                                        <div>
                                                  <label className="block text-sm font-medium mb-2 flex items-center gap-2 text-slate-700 dark:text-white">
                                                            <UserIcon className="w-4 h-4 text-slate-400 dark:text-white/50" />
                                                            المنفذ/ون <span className="text-accent">*</span>
                                                  </label>
                                                  <select
                                                            value={formData.executors || ""}
                                                            onChange={(e) => updateFormData({ executors: e.target.value })}
                                                            className="form-input"
                                                  >
                                                            <option value="">اختر المنفذ</option>
                                                            <option value="جميع منسوبي المدرسة">جميع منسوبي المدرسة</option>
                                                            <option value="رائد النشاط">رائد النشاط</option>
                                                            <option value="الموجه الطلابي">الموجه الطلابي</option>
                                                            <option value="معلم المادة">معلم المادة</option>
                                                            <option value="لجنة النشاط">لجنة النشاط</option>
                                                            <option value="فريق العمل التطوعي">فريق العمل التطوعي</option>
                                                            <option value="الإدارة المدرسية">الإدارة المدرسية</option>
                                                            <option value="مجموعة من المعلمين">مجموعة من المعلمين</option>
                                                            <option value="الطلاب المتميزين">الطلاب المتميزين</option>
                                                            <option value="اللجنة الثقافية">اللجنة الثقافية</option>
                                                            <option value="اللجنة الرياضية">اللجنة الرياضية</option>
                                                            <option value="اللجنة الاجتماعية">اللجنة الاجتماعية</option>
                                                  </select>
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
                                                            <select
                                                                      value={formData.location || ""}
                                                                      onChange={(e) => updateFormData({ location: e.target.value })}
                                                                      className="form-input"
                                                            >
                                                                      <option value="">اختر المكان</option>
                                                                      <option value="ساحة المدرسة">ساحة المدرسة</option>
                                                                      <option value="الملعب الرياضي">الملعب الرياضي</option>
                                                                      <option value="المسرح المدرسي">المسرح المدرسي</option>
                                                                      <option value="قاعة الاجتماعات">قاعة الاجتماعات</option>
                                                                      <option value="المختبر">المختبر</option>
                                                                      <option value="المكتبة">المكتبة</option>
                                                                      <option value="الفصول الدراسية">الفصول الدراسية</option>
                                                                      <option value="غرفة مصادر التعلم">غرفة مصادر التعلم</option>
                                                                      <option value="المصلى">المصلى</option>
                                                                      <option value="ساحة المدرسة">ساحة المدرسة</option>
                                                                      <option value="قاعة النشاط">قاعة النشاط</option>
                                                            </select>
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
                                                  <select
                                                            value={formData.participantsCount || ""}
                                                            onChange={(e) => updateFormData({ participantsCount: parseInt(e.target.value) || undefined })}
                                                            className="form-input"
                                                  >
                                                            <option value="">اختر عدد المستفيدين</option>
                                                            {/* Filter options based on school type */}
                                                            {formData.schoolType === 'ابتدائي' && (
                                                                      <>
                                                                                <option value="100">100 طالب</option>
                                                                                <option value="150">150 طالب</option>
                                                                                <option value="200">200 طالب</option>
                                                                                <option value="250">250 طالب</option>
                                                                                <option value="300">300 طالب</option>
                                                                                <option value="350">350 طالب</option>
                                                                                <option value="400">400 طالب</option>
                                                                                <option value="450">450 طالب</option>
                                                                      </>
                                                            )}
                                                            {formData.schoolType === 'متوسط' && (
                                                                      <>
                                                                                <option value="75">75 طالب</option>
                                                                                <option value="100">100 طالب</option>
                                                                                <option value="150">150 طالب</option>
                                                                                <option value="200">200 طالب</option>
                                                                                <option value="250">250 طالب</option>
                                                                                <option value="300">300 طالب</option>
                                                                                <option value="350">350 طالب</option>
                                                                      </>
                                                            )}
                                                            {formData.schoolType === 'ثانوي' && (
                                                                      <>
                                                                                <option value="100">100 طالب</option>
                                                                                <option value="150">150 طالب</option>
                                                                                <option value="200">200 طالب</option>
                                                                                <option value="250">250 طالب</option>
                                                                                <option value="300">300 طالب</option>
                                                                                <option value="400">400 طالب</option>
                                                                                <option value="500">500 طالب</option>
                                                                                <option value="600">600 طالب</option>
                                                                      </>
                                                            )}
                                                            {/* Default options if no school type selected */}
                                                            {!formData.schoolType && (
                                                                      <>
                                                                                <option value="50">50</option>
                                                                                <option value="100">100</option>
                                                                                <option value="150">150</option>
                                                                                <option value="200">200</option>
                                                                                <option value="250">250</option>
                                                                                <option value="300">300</option>
                                                                                <option value="400">400</option>
                                                                                <option value="500">500</option>
                                                                      </>
                                                            )}
                                                  </select>
                                                  {!formData.schoolType && (
                                                            <p className="text-amber-600 dark:text-amber-400 text-xs mt-1">
                                                                      💡 اختر نوع المدرسة في الخطوة السابقة لعرض الأعداد المناسبة
                                                            </p>
                                                  )}
                                        </div>

                                        {/* Execution Steps with AI Generation */}
                                        <div>
                                                  <div className="flex items-center justify-between mb-2">
                                                            <label className="text-sm font-medium flex items-center gap-2 text-slate-700 dark:text-white">
                                                                      <ListBulletIcon className="w-4 h-4 text-slate-400 dark:text-white/50" />
                                                                      الوصف / خطوات التنفيذ
                                                                      <span className="text-accent">*</span>
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
