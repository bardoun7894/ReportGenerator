import Link from "next/link";
import Image from "next/image";
import { DocumentTextIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { ThemeToggle } from "@/components/theme-toggle";

export default function PrivacyPage() {
          return (
                    <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
                              {/* Background */}
                              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 dark:bg-emerald-500/10 rounded-full blur-[120px]" />
                                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-100/40 dark:bg-amber-500/10 rounded-full blur-[100px]" />
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
                                        <ThemeToggle />
                              </header>

                              {/* Content */}
                              <main className="relative z-10 px-6 lg:px-12 py-12">
                                        <div className="max-w-4xl mx-auto">
                                                  <div className="glass-card p-8 md:p-12 border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5">
                                                            {/* Title */}
                                                            <div className="text-center mb-10">
                                                                      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                                                                                <ShieldCheckIcon className="w-8 h-8 text-primary" />
                                                                      </div>
                                                                      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                                                                سياسة الخصوصية
                                                                      </h1>
                                                                      <p className="text-slate-600 dark:text-slate-400">
                                                                                آخر تحديث: ديسمبر ٢٠٢٤
                                                                      </p>
                                                            </div>

                                                            {/* Content */}
                                                            <div className="prose prose-slate dark:prose-invert max-w-none text-right">
                                                                      <section className="mb-8">
                                                                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">مقدمة</h2>
                                                                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                                                                          نحن في منصة نماذج تعليمية نلتزم بحماية خصوصيتك وبياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات التي تقدمها عند استخدام منصتنا.
                                                                                </p>
                                                                      </section>

                                                                      <section className="mb-8">
                                                                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">المعلومات التي نجمعها</h2>
                                                                                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 pr-4">
                                                                                          <li>معلومات المدرسة والفعاليات التي تدخلها لإنشاء التقارير</li>
                                                                                          <li>معلومات تقنية مثل نوع المتصفح وعنوان IP</li>
                                                                                          <li>ملفات تعريف الارتباط (Cookies) لتحسين تجربة الاستخدام</li>
                                                                                </ul>
                                                                      </section>

                                                                      <section className="mb-8">
                                                                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">كيف نستخدم معلوماتك</h2>
                                                                                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 pr-4">
                                                                                          <li>إنشاء التقارير المطلوبة</li>
                                                                                          <li>تحسين خدماتنا وتطويرها</li>
                                                                                          <li>التواصل معك بخصوص تحديثات المنصة</li>
                                                                                          <li>ضمان أمان وسلامة المنصة</li>
                                                                                </ul>
                                                                      </section>

                                                                      <section className="mb-8">
                                                                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">حماية البيانات</h2>
                                                                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                                                                          نستخدم أحدث تقنيات الأمان لحماية بياناتك من الوصول غير المصرح به أو التعديل أو الكشف أو الإتلاف. جميع البيانات المنقولة مشفرة باستخدام بروتوكول SSL/TLS.
                                                                                </p>
                                                                      </section>

                                                                      <section className="mb-8">
                                                                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">حقوقك</h2>
                                                                                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 pr-4">
                                                                                          <li>الحق في الوصول إلى بياناتك الشخصية</li>
                                                                                          <li>الحق في تصحيح أي بيانات غير دقيقة</li>
                                                                                          <li>الحق في طلب حذف بياناتك</li>
                                                                                          <li>الحق في الاعتراض على معالجة بياناتك</li>
                                                                                </ul>
                                                                      </section>

                                                                      <section className="mb-8">
                                                                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">تواصل معنا</h2>
                                                                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                                                                          إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر صفحة{" "}
                                                                                          <Link href="/contact" className="text-primary hover:underline">تواصل معنا</Link>.
                                                                                </p>
                                                                      </section>
                                                            </div>
                                                  </div>
                                        </div>
                              </main>

                              {/* Footer */}
                              <footer className="relative z-10 border-t border-slate-200 dark:border-white/10 mt-16 bg-white/50 dark:bg-black/20">
                                        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
                                                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                                            <p className="text-slate-500 dark:text-slate-400 text-sm">© 2024 نماذج تعليمية - جميع الحقوق محفوظة</p>
                                                            <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
                                                                      <Link href="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link>
                                                                      <Link href="/terms" className="hover:text-primary transition-colors">الشروط والأحكام</Link>
                                                                      <Link href="/contact" className="hover:text-primary transition-colors">تواصل معنا</Link>
                                                            </div>
                                                  </div>
                                        </div>
                              </footer>
                    </div>
          );
}
