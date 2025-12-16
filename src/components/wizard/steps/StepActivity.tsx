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
          AcademicCapIcon,
          BuildingLibraryIcon,
          BriefcaseIcon,
          GlobeAsiaAustraliaIcon,
} from "@heroicons/react/24/outline";
import ArabicDatePicker from "@/components/ui/ArabicDatePicker";
import {
          Select,
          SelectContent,
          SelectItem,
          SelectTrigger,
          SelectValue,
} from "@/components/ui/select";

const TARGET_AUDIENCES = [
          { id: "students", label: "الطلاب", icon: AcademicCapIcon },
          { id: "teachers", label: "المعلمين", icon: UserIcon },
          { id: "female_teachers", label: "المعلمات", icon: UserIcon },
          { id: "parents", label: "أولياء الأمور", icon: UserGroupIcon },
          { id: "admin", label: "الإدارة", icon: BriefcaseIcon },
          { id: "community", label: "المجتمع", icon: GlobeAsiaAustraliaIcon },
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
                                                            <Select
                                                                      value={formData.duration}
                                                                      onValueChange={(value) => updateFormData({ duration: value })}
                                                            >
                                                                      <SelectTrigger>
                                                                                <SelectValue placeholder="اختر المدة" />
                                                                      </SelectTrigger>
                                                                      <SelectContent>
                                                                                <SelectItem value="ساعة واحدة">ساعة واحدة</SelectItem>
                                                                                <SelectItem value="ساعتان">ساعتان</SelectItem>
                                                                                <SelectItem value="نصف يوم">نصف يوم</SelectItem>
                                                                                <SelectItem value="يوم واحد">يوم واحد</SelectItem>
                                                                                <SelectItem value="يومان">يومان</SelectItem>
                                                                                <SelectItem value="ثلاثة أيام">ثلاثة أيام</SelectItem>
                                                                                <SelectItem value="أسبوع">أسبوع</SelectItem>
                                                                                <SelectItem value="أسبوعان">أسبوعان</SelectItem>
                                                                                <SelectItem value="شهر">شهر</SelectItem>
                                                                                <SelectItem value="فصل دراسي">فصل دراسي</SelectItem>
                                                                      </SelectContent>
                                                            </Select>
                                                  </div>
                                        </div>

                                        {/* Executors */}
                                        <div>
                                                  <label className="block text-sm font-medium mb-2 flex items-center gap-2 text-slate-700 dark:text-white">
                                                            <UserIcon className="w-4 h-4 text-slate-400 dark:text-white/50" />
                                                            المنفذ/ون <span className="text-accent">*</span>
                                                  </label>
                                                  <Select
                                                            value={formData.executors}
                                                            onValueChange={(value) => updateFormData({ executors: value })}
                                                  >
                                                            <SelectTrigger>
                                                                      <SelectValue placeholder="اختر المنفذ/ة" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                      <SelectItem value="جميع منسوبي/ات المدرسة">جميع منسوبي/ات المدرسة</SelectItem>
                                                                      <SelectItem value="رائد/ة النشاط">رائد/ة النشاط</SelectItem>
                                                                      <SelectItem value="منسق/ة موهبة">منسق/ة موهبة</SelectItem>
                                                                      <SelectItem value="وكيل/ة المدرسة">وكيل/ة المدرسة</SelectItem>
                                                                      <SelectItem value="مدير/ة المدرسة">مدير/ة المدرسة</SelectItem>
                                                                      <SelectItem value="الموجه/ة الطلابي/ة">الموجه/ة الطلابي/ة</SelectItem>
                                                                      <SelectItem value="معلم/ة المادة">معلم/ة المادة</SelectItem>
                                                                      <SelectItem value="لجنة النشاط">لجنة النشاط</SelectItem>
                                                                      <SelectItem value="فريق العمل التطوعي">فريق العمل التطوعي</SelectItem>
                                                                      <SelectItem value="الإدارة المدرسية">الإدارة المدرسية</SelectItem>
                                                                      <SelectItem value="مجموعة من المعلمين/ات">مجموعة من المعلمين/ات</SelectItem>
                                                                      <SelectItem value="الطلاب/الطالبات المتميزين/ات">الطلاب/الطالبات المتميزين/ات</SelectItem>
                                                                      <SelectItem value="اللجنة الثقافية">اللجنة الثقافية</SelectItem>
                                                                      <SelectItem value="اللجنة الرياضية">اللجنة الرياضية</SelectItem>
                                                                      <SelectItem value="اللجنة الاجتماعية">اللجنة الاجتماعية</SelectItem>
                                                            </SelectContent>
                                                  </Select>
                                        </div>

                                        {/* Domain & Location Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                  <div>
                                                            <label className="block text-sm font-medium mb-2 flex items-center gap-2 text-slate-700 dark:text-white">
                                                                      <TagIcon className="w-4 h-4 text-slate-400 dark:text-white/50" />
                                                                      المجال <span className="text-accent">*</span>
                                                            </label>
                                                            <Select
                                                                      value={formData.domain}
                                                                      onValueChange={(value) => updateFormData({ domain: value })}
                                                            >
                                                                      <SelectTrigger>
                                                                                <SelectValue placeholder="اختر المجال" />
                                                                      </SelectTrigger>
                                                                      <SelectContent>
                                                                                {DOMAIN_OPTIONS.map((domain) => (
                                                                                          <SelectItem key={domain} value={domain}>
                                                                                                    {domain}
                                                                                          </SelectItem>
                                                                                ))}
                                                                      </SelectContent>
                                                            </Select>
                                                  </div>
                                                  <div>
                                                            <label className="block text-sm font-medium mb-2 flex items-center gap-2 text-slate-700 dark:text-white">
                                                                      <MapPinIcon className="w-4 h-4 text-slate-400 dark:text-white/50" />
                                                                      مكان التنفيذ <span className="text-accent">*</span>
                                                            </label>
                                                            <Select
                                                                      value={formData.location}
                                                                      onValueChange={(value) => updateFormData({ location: value })}
                                                            >
                                                                      <SelectTrigger>
                                                                                <SelectValue placeholder="اختر المكان" />
                                                                      </SelectTrigger>
                                                                      <SelectContent>
                                                                                <SelectItem value="ساحة المدرسة">ساحة المدرسة</SelectItem>
                                                                                <SelectItem value="الملعب الرياضي">الملعب الرياضي</SelectItem>
                                                                                <SelectItem value="المسرح المدرسي">المسرح المدرسي</SelectItem>
                                                                                <SelectItem value="قاعة الاجتماعات">قاعة الاجتماعات</SelectItem>
                                                                                <SelectItem value="المختبر">المختبر</SelectItem>
                                                                                <SelectItem value="المكتبة">المكتبة</SelectItem>
                                                                                <SelectItem value="الفصول الدراسية">الفصول الدراسية</SelectItem>
                                                                                <SelectItem value="غرفة مصادر التعلم">غرفة مصادر التعلم</SelectItem>
                                                                                <SelectItem value="المصلى">المصلى</SelectItem>
                                                                                <SelectItem value="قاعة النشاط">قاعة النشاط</SelectItem>
                                                                      </SelectContent>
                                                            </Select>
                                                  </div>
                                        </div>

                                        {/* Target Audience */}
                                        <div>
                                                  <label className="block text-sm font-medium mb-3 flex items-center gap-2 text-slate-700 dark:text-white">
                                                            <UserGroupIcon className="w-4 h-4 text-slate-400 dark:text-white/50" />
                                                            المستفيدون
                                                  </label>
                                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                            {TARGET_AUDIENCES.map((audience) => {
                                                                      const isSelected = formData.targetAudience?.includes(audience.id);
                                                                      const Icon = audience.icon;
                                                                      return (
                                                                                <button
                                                                                          key={audience.id}
                                                                                          type="button"
                                                                                          onClick={() => toggleAudience(audience.id)}
                                                                                          className={`
                                                                                                    relative group p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-3
                                                                                                    ${isSelected
                                                                                                              ? "border-primary bg-primary/5 text-primary ring-1 ring-primary/50"
                                                                                                              : "border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-600 dark:text-white/70 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-white/10"
                                                                                                    }
                                                                                          `}
                                                                                >
                                                                                          {/* Checkbox Indicator */}
                                                                                          <div className={`
                                                                                                    absolute top-3 right-3 w-5 h-5 rounded-md border flex items-center justify-center transition-colors
                                                                                                    ${isSelected
                                                                                                              ? "bg-primary border-primary text-white"
                                                                                                              : "border-slate-300 dark:border-white/30 group-hover:border-primary/50"
                                                                                                    }
                                                                                          `}>
                                                                                                    {isSelected && <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                                                                          </div>

                                                                                          <Icon className={`w-8 h-8 ${isSelected ? 'text-primary' : 'text-slate-400 dark:text-white/40 group-hover:text-primary/70'}`} />
                                                                                          <span className="font-medium">{audience.label}</span>
                                                                                </button>
                                                                      );
                                                            })}
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
                                                            onChange={(e) => updateFormData({ participantsCount: parseInt(e.target.value) || undefined })}
                                                            className="form-input"
                                                            placeholder="أدخل عدد المستفيدين"
                                                  />
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
                                                                      <span>استخدام الذكاء الاصطناعي</span>
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
                                                            اضغط "استخدام الذكاء الاصطناعي" لإنشاء الخطوات بناءً على بيانات الفعالية
                                                  </p>
                                        </div>
                              </div>
                    </div>
          );
}
