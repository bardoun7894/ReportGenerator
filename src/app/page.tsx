import Link from "next/link";
import Image from "next/image";
import {
          DocumentTextIcon,
          SparklesIcon,
          EyeIcon,
          ArrowDownTrayIcon,
          CheckCircleIcon,
          ArrowLeftIcon,
          AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingPage() {
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
                                        <div className="flex items-center gap-3">
                                                  <div className="w-11 h-11 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 dark:shadow-none">
                                                            <DocumentTextIcon className="w-6 h-6 text-white" />
                                                  </div>
                                                  <div>
                                                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">نماذج تعليمية</span>
                                                            <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1">منصة التقارير الذكية</p>
                                                  </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                                  <Link
                                                            href="/about"
                                                            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors text-sm hidden md:block font-medium"
                                                  >
                                                            عن المنصة
                                                  </Link>
                                                  <ThemeToggle />
                                                  <Link
                                                            href="/login"
                                                            className="glass-card px-5 py-2 text-sm font-medium hover:bg-white dark:hover:bg-white/10 transition-all text-slate-700 dark:text-white"
                                                  >
                                                            تسجيل الدخول
                                                  </Link>
                                        </div>
                              </header>

                              {/* Hero Section */}
                              <main className="relative z-10 px-6 lg:px-12 py-8 lg:py-12">
                                        <div className="max-w-7xl mx-auto">
                                                  {/* Trust Badge */}
                                                  <div className="flex justify-center lg:justify-start mb-6">
                                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-sm shadow-sm dark:shadow-none">
                                                                      <AcademicCapIcon className="w-4 h-4 text-primary" />
                                                                      <span className="text-slate-700 dark:text-slate-200 font-medium">متوافق مع معايير وزارة التعليم</span>
                                                            </div>
                                                  </div>

                                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                                                            {/* Text Content */}
                                                            <div className="text-center lg:text-right order-2 lg:order-1">
                                                                      {/* Main Headline */}
                                                                      <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold mb-5 leading-[1.15] tracking-tight text-slate-900 dark:text-white">
                                                                                أنشئ تقاريرك
                                                                                <br />
                                                                                <span className="text-transparent bg-clip-text bg-gradient-to-l from-accent via-amber-500 to-primary">
                                                                                          بثواني معدودة
                                                                                </span>
                                                                      </h1>

                                                                      {/* Subheadline */}
                                                                      <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-lg mb-8 mx-auto lg:mx-0 lg:mr-0 leading-relaxed font-light">
                                                                                منصة ذكية تساعدك في توثيق الفعاليات والبرامج المدرسية
                                                                                بصياغة احترافية وتصدير فوري بصيغة PDF
                                                                      </p>

                                                                      {/* CTA Buttons */}
                                                                      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                                                                                <Link
                                                                                          href="/select"
                                                                                          className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-l from-accent to-amber-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-amber-200 dark:hover:shadow-glow-golden hover:-translate-y-0.5"
                                                                                >
                                                                                          <span className="text-lg">ابدأ الآن مجاناً</span>
                                                                                          <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                                                                </Link>
                                                                                <Link
                                                                                          href="/demo"
                                                                                          className="inline-flex items-center justify-center gap-2 glass-card text-slate-700 dark:text-white font-medium py-4 px-8 rounded-xl hover:bg-white dark:hover:bg-white/10 transition-all"
                                                                                >
                                                                                          <EyeIcon className="w-5 h-5" />
                                                                                          <span>شاهد نموذج</span>
                                                                                </Link>
                                                                      </div>

                                                                      {/* Social Proof (Simplified) */}
                                                                      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm">
                                                                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 bg-white/50 dark:bg-white/5 px-4 py-2 rounded-full border border-slate-100 dark:border-white/10">
                                                                                          <CheckCircleIcon className="w-4 h-4 text-primary" />
                                                                                          مجاني 100%
                                                                                </div>
                                                                      </div>
                                                            </div>

                                                            {/* Hero Image */}
                                                            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
                                                                      <div className="relative">
                                                                                {/* Glow Effect */}
                                                                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/50 to-amber-200/40 dark:from-primary/20 dark:to-accent/20 rounded-full blur-3xl scale-90" />

                                                                                {/* Teacher Image */}
                                                                                <div className="relative z-10 animate-float">
                                                                                          <Image
                                                                                                    src="/images/teacher.png"
                                                                                                    alt="معلم سعودي يستخدم منصة نماذج تعليمية"
                                                                                                    width={380}
                                                                                                    height={450}
                                                                                                    className="object-contain drop-shadow-2xl"
                                                                                                    priority
                                                                                          />
                                                                                </div>

                                                                                {/* Floating Elements */}
                                                                                <div className="absolute top-8 -right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur px-4 py-2 rounded-xl animate-float shadow-lg border border-slate-100 dark:border-white/10">
                                                                                          <div className="flex items-center gap-2">
                                                                                                    <div className="w-8 h-8 bg-emerald-100 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                                                                                                              <SparklesIcon className="w-4 h-4 text-emerald-600 dark:text-primary" />
                                                                                                    </div>
                                                                                                    <div>
                                                                                                              <p className="text-xs text-slate-500 dark:text-slate-400">صياغة بالذكاء</p>
                                                                                                              <p className="text-sm font-semibold text-slate-900 dark:text-white">الاصطناعي</p>
                                                                                                    </div>
                                                                                          </div>
                                                                                </div>

                                                                                <div className="absolute bottom-20 -left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur px-4 py-2 rounded-xl animate-float shadow-lg border border-slate-100 dark:border-white/10"
                                                                                          style={{ animationDelay: '1.5s' }}>
                                                                                          <div className="flex items-center gap-2">
                                                                                                    <div className="w-8 h-8 bg-amber-100 dark:bg-accent/20 rounded-lg flex items-center justify-center">
                                                                                                              <ArrowDownTrayIcon className="w-4 h-4 text-amber-600 dark:text-accent" />
                                                                                                    </div>
                                                                                                    <div>
                                                                                                              <p className="text-xs text-slate-500 dark:text-slate-400">تصدير فوري</p>
                                                                                                              <p className="text-sm font-semibold text-slate-900 dark:text-white">PDF جاهز</p>
                                                                                                    </div>
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>

                                                  {/* Feature Cards */}
                                                  <div className="mt-20 lg:mt-24">
                                                            <h2 className="text-center text-2xl font-bold mb-10 text-slate-900 dark:text-white">
                                                                      لماذا تختار <span className="text-primary">نماذج تعليمية</span>؟
                                                            </h2>
                                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                                                                      <FeatureCard
                                                                                icon={<DocumentTextIcon className="w-7 h-7" />}
                                                                                title="نماذج جاهزة"
                                                                                description="تقارير موحدة تناسب جميع الفعاليات"
                                                                                color="primary"
                                                                      />
                                                                      <FeatureCard
                                                                                icon={<SparklesIcon className="w-7 h-7" />}
                                                                                title="ذكاء اصطناعي"
                                                                                description="صياغة احترافية تلقائية للمحتوى"
                                                                                color="ai"
                                                                      />
                                                                      <FeatureCard
                                                                                icon={<EyeIcon className="w-7 h-7" />}
                                                                                title="معاينة مباشرة"
                                                                                description="شاهد التقرير قبل التصدير"
                                                                                color="accent"
                                                                      />
                                                                      <FeatureCard
                                                                                icon={<ArrowDownTrayIcon className="w-7 h-7" />}
                                                                                title="تصدير PDF"
                                                                                description="ملف جاهز للطباعة والمشاركة"
                                                                                color="primary"
                                                                      />
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

function FeatureCard({
          icon,
          title,
          description,
          color,
}: {
          icon: React.ReactNode;
          title: string;
          description: string;
          color: 'primary' | 'accent' | 'ai';
}) {
          const colorClasses = {
                    primary: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20 group-hover:border-emerald-300 dark:group-hover:border-emerald-500/50',
                    accent: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20 group-hover:border-amber-300 dark:group-hover:border-amber-500/50',
                    ai: 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-500/20 group-hover:border-purple-300 dark:group-hover:border-purple-500/50',
          };

          return (
                    <div className="group glass-card p-5 lg:p-6 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-white/5">
                              <div className={`w-12 h-12 mb-4 rounded-xl flex items-center justify-center border ${colorClasses[color]}`}>
                                        {icon}
                              </div>
                              <h3 className="text-base lg:text-lg font-bold mb-2 text-slate-900 dark:text-white">{title}</h3>
                              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
                    </div>
          );
}
