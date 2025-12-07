import Link from "next/link";
import { DocumentTextIcon, ScaleIcon } from "@heroicons/react/24/outline";
import { ThemeToggle } from "@/components/theme-toggle";

export default function TermsPage() {
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
                                                  <div className="w-11 h-11 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 dark:shadow-none">
                                                            <DocumentTextIcon className="w-6 h-6 text-white" />
                                                  </div>
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
                                                                      <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-2xl mb-4">
                                                                                <ScaleIcon className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                                                                      </div>
                                                                      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                                                                الشروط والأحكام
                                                                      </h1>
                                                                      <p className="text-slate-600 dark:text-slate-400">
                                                                                آخر تحديث: ديسمبر ٢٠٢٤
                                                                      </p>
                                                            </div>

                                                            {/* Content */}
                                                            <div className="prose prose-slate dark:prose-invert max-w-none text-right">
                                                                      <section className="mb-8">
                                                                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">قبول الشروط</h2>
                                                                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                                                                          باستخدامك لمنصة نماذج تعليمية، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام المنصة.
                                                                                </p>
                                                                      </section>

                                                                      <section className="mb-8">
                                                                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">وصف الخدمة</h2>
                                                                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                                                                          نماذج تعليمية هي منصة إلكترونية تتيح للمستخدمين إنشاء تقارير احترافية للفعاليات والبرامج المدرسية. تستخدم المنصة تقنيات الذكاء الاصطناعي لتوليد المحتوى وتقديم نماذج جاهزة للاستخدام.
                                                                                </p>
                                                                      </section>

                                                                      <section className="mb-8">
                                                                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">الاستخدام المقبول</h2>
                                                                                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 pr-4">
                                                                                          <li>استخدام المنصة للأغراض التعليمية المشروعة فقط</li>
                                                                                          <li>عدم استخدام المنصة لنشر محتوى مخالف أو ضار</li>
                                                                                          <li>عدم محاولة اختراق أو تعطيل الخدمة</li>
                                                                                          <li>احترام حقوق الملكية الفكرية للآخرين</li>
                                                                                </ul>
                                                                      </section>

                                                                      <section className="mb-8">
                                                                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">حقوق الملكية الفكرية</h2>
                                                                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                                                                          جميع المحتويات والتصاميم والشعارات والرموز في المنصة هي ملك لنماذج تعليمية ومحمية بموجب قوانين حقوق الملكية الفكرية. يحتفظ المستخدم بحقوق المحتوى الذي يقوم بإنشائه باستخدام المنصة.
                                                                                </p>
                                                                      </section>

                                                                      <section className="mb-8">
                                                                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">إخلاء المسؤولية</h2>
                                                                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                                                                          تُقدَّم الخدمة &quot;كما هي&quot; دون أي ضمانات صريحة أو ضمنية. لا نتحمل المسؤولية عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام المنصة.
                                                                                </p>
                                                                      </section>

                                                                      <section className="mb-8">
                                                                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">التعديلات</h2>
                                                                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                                                                          نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطار المستخدمين بأي تغييرات جوهرية. استمرارك في استخدام المنصة بعد التعديلات يعني موافقتك على الشروط المحدثة.
                                                                                </p>
                                                                      </section>

                                                                      <section className="mb-8">
                                                                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">القانون المطبق</h2>
                                                                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                                                                          تخضع هذه الشروط لقوانين المملكة العربية السعودية. أي نزاع ينشأ عن استخدام المنصة يخضع لاختصاص المحاكم السعودية.
                                                                                </p>
                                                                      </section>

                                                                      <section>
                                                                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">تواصل معنا</h2>
                                                                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                                                                          لأي استفسارات حول هذه الشروط، يرجى التواصل معنا عبر صفحة{" "}
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
