import Link from "next/link";
import {
          DocumentTextIcon,
          SparklesIcon,
          AcademicCapIcon,
          ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { ThemeToggle } from "@/components/theme-toggle";

const REPORT_TYPES = [
          {
                    id: "activity",
                    title: "تقرير نشاط مدرسي",
                    description: "توثيق الفعاليات والأنشطة المدرسية والرحلات والزيارات",
                    icon: SparklesIcon,
                    color: "bg-purple-500",
          },
          {
                    id: "visit",
                    title: "تقرير زيارة صفية",
                    description: "نموذج زيارة المشرف التربوي أو مدير المدرسة للمعلم",
                    icon: AcademicCapIcon,
                    color: "bg-blue-500",
          },
          {
                    id: "administrative",
                    title: "تقرير إداري",
                    description: "تقارير الاجتماعات والمجالس واللجان المدرسية",
                    icon: DocumentTextIcon,
                    color: "bg-emerald-500",
          }
];

export default function SelectReportType() {
          return (
                    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 p-6">
                              {/* Header */}
                              <header className="max-w-6xl mx-auto flex justify-between items-center mb-12">
                                        <Link href="/" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                                                  <ArrowLeftIcon className="w-5 h-5 rotate-180" />
                                                  <span>الرئيسية</span>
                                        </Link>
                                        <div className="flex items-center gap-4">
                                                  <ThemeToggle />
                                                  <div className="w-10 h-10 bg-white dark:bg-white/10 rounded-full flex items-center justify-center shadow-sm">
                                                            <span className="font-bold text-primary">RC</span>
                                                  </div>
                                        </div>
                              </header>

                              <main className="max-w-6xl mx-auto">
                                        <div className="text-center mb-16">
                                                  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                                                            اختر نوع التقرير
                                                  </h1>
                                                  <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                                                            نوفر لك نماذج احترافية مصممة خصيصاً لتلبية احتياجات الميدان التربوي
                                                  </p>
                                        </div>

                                        {/* Report Types Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                  {REPORT_TYPES.map((type) => (
                                                            <Link
                                                                      key={type.id}
                                                                      href={`/create/${type.id}`}
                                                                      className="group relative"
                                                            >
                                                                      <div className="relative glass-card h-full p-8 hover:-translate-y-2 transition-all duration-300 border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-primary/50 dark:hover:border-primary/50">
                                                                                <div className={`w-16 h-16 rounded-2xl ${type.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                                                                          <type.icon className={`w-8 h-8 ${type.color.replace('bg-', 'text-')}`} />
                                                                                </div>

                                                                                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                                                                          {type.title}
                                                                                </h3>

                                                                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                                                                          {type.description}
                                                                                </p>

                                                                                <div className="flex items-center text-primary font-medium group/link">
                                                                                          <span>ابدأ التقرير</span>
                                                                                          <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover/link:-translate-x-1 transition-transform" />
                                                                                </div>
                                                                      </div>
                                                            </Link>
                                                  ))}
                                        </div>
                              </main>
                    </div>
          );
}
