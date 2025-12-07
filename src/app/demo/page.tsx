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
                                                  <div className="w-11 h-11 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 dark:shadow-none">
                                                            <DocumentTextIcon className="w-6 h-6 text-white" />
                                                  </div>
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
                                                  <div className="glass-card p-6 md:p-8 border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 mb-8">
                                                            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 max-w-3xl mx-auto" dir="rtl">
                                                                      {/* Report Header */}
                                                                      <div className="text-center border-b-2 border-primary pb-6 mb-6">
                                                                                <h2 className="text-2xl font-bold text-primary mb-2">تقرير فعالية</h2>
                                                                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                                                                                          الاحتفاء باليوم الوطني السعودي ٩٤
                                                                                </h3>
                                                                                <p className="text-slate-500 dark:text-slate-400 mt-2">مدرسة الملك فهد الثانوية</p>
                                                                      </div>

                                                                      {/* Report Details */}
                                                                      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                                                                <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                                                                                          <span className="text-slate-500 dark:text-slate-400">التاريخ:</span>
                                                                                          <span className="font-medium text-slate-900 dark:text-white mr-2">٢٣/٠٩/١٤٤٦</span>
                                                                                </div>
                                                                                <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                                                                                          <span className="text-slate-500 dark:text-slate-400">المدة:</span>
                                                                                          <span className="font-medium text-slate-900 dark:text-white mr-2">يوم واحد</span>
                                                                                </div>
                                                                                <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                                                                                          <span className="text-slate-500 dark:text-slate-400">المكان:</span>
                                                                                          <span className="font-medium text-slate-900 dark:text-white mr-2">ساحة المدرسة</span>
                                                                                </div>
                                                                                <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                                                                                          <span className="text-slate-500 dark:text-slate-400">المستفيدون:</span>
                                                                                          <span className="font-medium text-slate-900 dark:text-white mr-2">٣٥٠ طالب</span>
                                                                                </div>
                                                                      </div>

                                                                      {/* Report Content */}
                                                                      <div className="space-y-4 text-slate-700 dark:text-slate-300">
                                                                                <div>
                                                                                          <h4 className="font-bold text-slate-900 dark:text-white mb-2">الأهداف:</h4>
                                                                                          <ul className="list-disc list-inside space-y-1 pr-4">
                                                                                                    <li>تعزيز قيم الانتماء والولاء للوطن</li>
                                                                                                    <li>إبراز منجزات المملكة العربية السعودية</li>
                                                                                                    <li>غرس حب الوطن في نفوس الطلاب</li>
                                                                                          </ul>
                                                                                </div>
                                                                                <div>
                                                                                          <h4 className="font-bold text-slate-900 dark:text-white mb-2">خطوات التنفيذ:</h4>
                                                                                          <ol className="list-decimal list-inside space-y-1 pr-4">
                                                                                                    <li>إذاعة صباحية عن اليوم الوطني</li>
                                                                                                    <li>عروض وطنية من الطلاب</li>
                                                                                                    <li>مسابقات ثقافية عن تاريخ المملكة</li>
                                                                                                    <li>تكريم المشاركين وتوزيع الهدايا</li>
                                                                                          </ol>
                                                                                </div>
                                                                      </div>

                                                                      {/* Signatures */}
                                                                      <div className="grid grid-cols-2 gap-8 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                                                                                <div className="text-center">
                                                                                          <p className="text-slate-500 dark:text-slate-400 text-sm">رائد النشاط</p>
                                                                                          <p className="font-medium text-slate-900 dark:text-white">أحمد محمد العتيبي</p>
                                                                                </div>
                                                                                <div className="text-center">
                                                                                          <p className="text-slate-500 dark:text-slate-400 text-sm">مدير المدرسة</p>
                                                                                          <p className="font-medium text-slate-900 dark:text-white">خالد عبدالله السعيد</p>
                                                                                </div>
                                                                      </div>
                                                            </div>
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
