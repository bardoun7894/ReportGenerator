"use client";

import Link from "next/link";
import Image from "next/image";
import {
          DocumentTextIcon,
          ArrowLeftIcon,
          EyeIcon,
          ArrowDownTrayIcon,
          SparklesIcon,
} from "@heroicons/react/24/outline";
import { ThemeToggle } from "@/components/theme-toggle";
import TemplateExchangeVisit from "@/components/templates/TemplateExchangeVisit";
import { WizardFormData } from "@/stores/wizard-store";

const mockFormData: WizardFormData = {
          title: "زيارة تبادلية لمدرسة الملك فهد",
          educationRegion: "المنطقة الشرقية",
          schoolName: "مدرسة اليرموك الثانوية",
          schoolType: "ثانوية",
          date: "2024-12-08",
          executors: "أحمد العتيبي",
          duration: "يوم واحد",
          domain: "النمو المهني",
          executionSteps: "1. استقبال المعلمين\n2. حضور الحصة الدراسية\n3. مناقشة استراتيجيات التدريس",
          objectives: [
                    { original: "تحسين الأداء", enhanced: "تبادل الخبرات التربوية والتعليمية بين المعلمين", isAIEnhanced: true },
                    { original: "تطوير المهارات", enhanced: "الاطلاع على أساليب تدريس حديثة ومبتكرة", isAIEnhanced: true },
          ],
          results: [
                    { original: "نجاح الزيارة", enhanced: "اكتساب مهارات جديدة في إدارة الصف", isAIEnhanced: true },
          ],
          recommendations: [
                    { original: "تكرار الزيارة", enhanced: "تطبيق الاستراتيجيات المكتسبة في الغرفة الصفية", isAIEnhanced: true },
          ],
          activityLeaderName: "محمد الصالح",
          principalName: "علي الدوسري",
};

export default function DemoPage() {
          return (
                    <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
                              {/* Animated Gradient Background */}
                              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 dark:bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
                                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-100/40 dark:bg-amber-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
                                        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-100/40 dark:bg-purple-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '4s' }} />
                              </div>

                              {/* Header */}
                              <header className="relative z-10 flex justify-between items-center px-6 lg:px-12 py-5">
                                        <Link href="/" className="flex items-center gap-3">
                                                  <Image
                                                            src="/logo.svg"
                                                            alt="Logo"
                                                            width={44}
                                                            height={44}
                                                            className="w-11 h-11 hover:scale-105 transition-transform duration-300"
                                                  />
                                                  <div>
                                                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">نماذج تعليمية</span>
                                                            <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1">منصة تقاريرك</p>
                                                  </div>
                                        </Link>
                                        <div className="flex items-center gap-4">
                                                  <ThemeToggle />
                                                  <Link
                                                            href="/select"
                                                            className="flex items-center gap-2 bg-gradient-to-l from-accent to-amber-500 text-white font-bold py-2.5 px-5 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-amber-200 dark:hover:shadow-glow-golden"
                                                  >
                                                            <span>ابدأ الآن</span>
                                                            <ArrowLeftIcon className="w-4 h-4" />
                                                  </Link>
                                        </div>
                              </header>

                              {/* Main Content */}
                              <main className="relative z-10 px-6 lg:px-12 py-12">
                                        <div className="max-w-6xl mx-auto">
                                                  {/* Title Section */}
                                                  <div className="text-center mb-12">
                                                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                                                                      <EyeIcon className="w-4 h-4" />
                                                                      <span>معاينة نموذج تقرير</span>
                                                            </div>
                                                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                                                                      شاهد كيف يبدو التقرير النهائي
                                                            </h1>
                                                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                                                                      هذا نموذج توضيحي لتقرير تم إنشاؤه باستخدام منصة نماذج تعليمية
                                                            </p>
                                                  </div>

                                                  {/* Demo Report Preview */}
                                                  <div className="mb-8">
                                                            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-1 max-w-4xl mx-auto overflow-hidden border border-slate-200 dark:border-slate-700" dir="rtl">
                                                                      <div className="scale-[0.85] origin-top transform-gpu">
                                                                                <TemplateExchangeVisit formData={mockFormData} reportTypeTitle="تقرير زيارة تبادلية" />
                                                                      </div>
                                                            </div>
                                                            <p className="text-center text-slate-500 dark:text-slate-400 mt-4 text-sm">
                                                                      * هذا مجرد مثال، هناك المزيد من النماذج الأخرى المتاحة عند استخدام المنصة
                                                            </p>
                                                  </div>

                                                  {/* Features Section */}
                                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                                            <div className="glass-card p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-center">
                                                                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                                                                <SparklesIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                                                      </div>
                                                                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">توليد ذكي</h3>
                                                                      <p className="text-sm text-slate-600 dark:text-slate-400">
                                                                                الذكاء الاصطناعي يصيغ المحتوى بشكل احترافي
                                                                      </p>
                                                            </div>
                                                            <div className="glass-card p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-center">
                                                                      <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                                                                <EyeIcon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                                                      </div>
                                                                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">قوالب متعددة</h3>
                                                                      <p className="text-sm text-slate-600 dark:text-slate-400">
                                                                                اختر من بين عدة قوالب احترافية
                                                                      </p>
                                                            </div>
                                                            <div className="glass-card p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-center">
                                                                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                                                                <ArrowDownTrayIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                                                      </div>
                                                                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">تصدير سهل</h3>
                                                                      <p className="text-sm text-slate-600 dark:text-slate-400">
                                                                                حمّل التقرير كملف PDF جاهز للطباعة
                                                                      </p>
                                                            </div>
                                                  </div>

                                                  {/* CTA */}
                                                  <div className="text-center">
                                                            <Link
                                                                      href="/select"
                                                                      className="inline-flex items-center gap-3 bg-gradient-to-l from-accent to-amber-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-amber-200 dark:hover:shadow-glow-golden hover:-translate-y-0.5"
                                                            >
                                                                      <span className="text-lg">أنشئ تقريرك الآن</span>
                                                                      <ArrowLeftIcon className="w-5 h-5" />
                                                            </Link>
                                                  </div>
                                        </div>
                              </main>
                    </div>
          );
}
