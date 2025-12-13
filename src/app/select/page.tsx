import Link from "next/link";
import Image from "next/image";
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
                    title: "تقارير الحالات التربوية",
                    description: "قريبا - دراسة الحالات التربوية",
                    icon: AcademicCapIcon,
                    color: "bg-blue-500",
                    disabled: true,
          },
          {
                    id: "administrative",
                    title: "تقرير إداري",
                    description: "تقرير الاجتماعات والمجالس واللجان المدرسية",
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
                                                  <Image
                                                            src="/logo.svg"
                                                            alt="Logo"
                                                            width={40}
                                                            height={40}
                                                            className="w-10 h-10 rounded-xl"
                                                  />
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
                                                  {REPORT_TYPES.map((type) => {
                                                            const isDisabled = 'disabled' in type && type.disabled;

                                                            const CardContent = (
                                                                      <div className={`relative glass-card h-full p-8 transition-all duration-300 border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 
                                                                                ${isDisabled ? '' : 'hover:-translate-y-2 hover:border-primary/50 dark:hover:border-primary/50'}
                                                                      `}>
                                                                                <div className={`w-16 h-16 rounded-2xl ${type.color} bg-opacity-10 flex items-center justify-center mb-6 ${isDisabled ? 'grayscale opacity-50' : 'group-hover:scale-110'} transition-transform duration-300`}>
                                                                                          <type.icon className={`w-8 h-8 ${type.color.replace('bg-', 'text-')}`} />
                                                                                </div>

                                                                                <h3 className={`text-xl font-bold mb-3 dark:text-white transition-colors ${isDisabled ? 'text-slate-400' : 'text-slate-900 group-hover:text-primary'}`}>
                                                                                          {type.title}
                                                                                </h3>

                                                                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                                                                                          {type.description}
                                                                                </p>

                                                                                <div className={`flex items-center font-medium group/link ${isDisabled ? 'text-slate-400' : 'text-primary'}`}>
                                                                                          <span>{isDisabled ? 'قريباً' : 'ابدأ التقرير'}</span>
                                                                                          {!isDisabled && <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover/link:-translate-x-1 transition-transform" />}
                                                                                </div>
                                                                      </div>
                                                            );

                                                            if (isDisabled) {
                                                                      return (
                                                                                <div key={type.id} className="relative cursor-not-allowed opacity-80">
                                                                                          {CardContent}
                                                                                </div>
                                                                      );
                                                            }

                                                            return (
                                                                      <Link
                                                                                key={type.id}
                                                                                href={`/create/${type.id}`}
                                                                                className="group relative"
                                                                      >
                                                                                {CardContent}
                                                                      </Link>
                                                            );
                                                  })}
                                        </div>
                              </main>
                    </div>
          );
}
