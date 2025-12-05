"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWizardStore } from "@/stores/wizard-store";
import { getReportTypeConfig } from "@/config/report-types";
import { TEMPLATES, TemplateId } from "@/config/templates";
import {
          ArrowRightIcon,
          ArrowDownTrayIcon,
          PencilSquareIcon,
          DocumentTextIcon,
          Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { ThemeToggle } from "@/components/theme-toggle";

// Import all templates
import {
          TemplateShahed,
          TemplateModernCards,
          TemplateProfessionalGrid,
          TemplateMinimalClean,
          TemplateBoldHeader,
          TemplateClassicReport,
          TemplateTealFrame,
          TemplateNavyExecutive,
          TemplateForestGreen,
          TemplateRoyalPurple,
          TemplateSunsetOrange,
          TemplateCorporateBlue,
          TemplateModernMinimal,
          TemplateAcademicExcellence,
          TemplateCreativeStudio,
          TemplateOfficialGov,
} from "@/components/templates";

export default function PreviewDraftPage() {
          const router = useRouter();
          const { formData, reportType, reset } = useWizardStore();
          const [isClient, setIsClient] = useState(false);
          const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('shahed');
          const [showTemplateSelector, setShowTemplateSelector] = useState(true);

          useEffect(() => {
                    setIsClient(true);
          }, []);

          // Get report config
          const config = reportType ? getReportTypeConfig(reportType) : null;

          // Redirect if no data
          useEffect(() => {
                    if (isClient && (!formData.title || !reportType)) {
                              router.push("/select");
                    }
          }, [isClient, formData, reportType, router]);

          if (!isClient || !formData.title || !reportType || !config) {
                    return (
                              <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                              </div>
                    );
          }

          const handleDownload = () => {
                    // TODO: Implement PDF download
                    alert("سيتم تحميل التقرير كملف PDF قريباً");
          };

          const handleNewReport = () => {
                    reset();
                    router.push("/select");
          };

          // Render selected template
          const renderTemplate = () => {
                    const templateProps = {
                              formData,
                              reportTypeTitle: config.title,
                    };

                    switch (selectedTemplate) {
                              case 'shahed':
                                        return <TemplateShahed {...templateProps} />;
                              case 'modern-cards':
                                        return <TemplateModernCards {...templateProps} />;
                              case 'professional-grid':
                                        return <TemplateProfessionalGrid {...templateProps} />;
                              case 'minimal-clean':
                                        return <TemplateMinimalClean {...templateProps} />;
                              case 'bold-header':
                                        return <TemplateBoldHeader {...templateProps} />;
                              case 'classic-report':
                                        return <TemplateClassicReport {...templateProps} />;
                              case 'teal-frame':
                                        return <TemplateTealFrame {...templateProps} />;
                              case 'navy-executive':
                                        return <TemplateNavyExecutive {...templateProps} />;
                              case 'forest-green':
                                        return <TemplateForestGreen {...templateProps} />;
                              case 'royal-purple':
                                        return <TemplateRoyalPurple {...templateProps} />;
                              case 'sunset-orange':
                                        return <TemplateSunsetOrange {...templateProps} />;
                              case 'corporate-blue':
                                        return <TemplateCorporateBlue {...templateProps} />;
                              case 'modern-minimal':
                                        return <TemplateModernMinimal {...templateProps} />;
                              case 'academic-excellence':
                                        return <TemplateAcademicExcellence {...templateProps} />;
                              case 'creative-studio':
                                        return <TemplateCreativeStudio {...templateProps} />;
                              case 'official-gov':
                                        return <TemplateOfficialGov {...templateProps} />;
                              default:
                                        return <TemplateModernCards {...templateProps} />;
                    }
          };

          return (
                    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
                              {/* Header */}
                              <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-50">
                                        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                                                  <Link
                                                            href={`/create/${reportType}`}
                                                            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                                                  >
                                                            <ArrowRightIcon className="w-5 h-5" />
                                                            <span>العودة للتعديل</span>
                                                  </Link>

                                                  <div className="flex items-center gap-2">
                                                            <button
                                                                      onClick={() => setShowTemplateSelector(!showTemplateSelector)}
                                                                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${showTemplateSelector
                                                                                ? 'bg-primary text-white'
                                                                                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                                                                }`}
                                                            >
                                                                      <Squares2X2Icon className="w-5 h-5" />
                                                                      <span>القوالب</span>
                                                            </button>
                                                  </div>

                                                  <div className="flex items-center gap-4">
                                                            <ThemeToggle />
                                                            <div className="w-10 h-10 bg-slate-100 dark:bg-white/10 rounded-full flex items-center justify-center shadow-sm">
                                                                      <span className="font-bold text-primary">RC</span>
                                                            </div>
                                                  </div>
                                        </div>
                              </header>

                              <div className="flex">
                                        {/* Template Selector Sidebar */}
                                        {showTemplateSelector && (
                                                  <aside className="w-64 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 p-4 h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto">
                                                            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                                                                      اختر القالب
                                                            </h3>
                                                            <div className="space-y-3">
                                                                      {TEMPLATES.map((template) => (
                                                                                <button
                                                                                          key={template.id}
                                                                                          onClick={() => setSelectedTemplate(template.id)}
                                                                                          className={`w-full text-right p-3 rounded-xl transition-all ${selectedTemplate === template.id
                                                                                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                                                                                    : 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
                                                                                                    }`}
                                                                                >
                                                                                          <div className="flex items-center gap-3">
                                                                                                    <span className="text-2xl">{template.icon}</span>
                                                                                                    <div>
                                                                                                              <p className="font-medium text-sm">{template.nameAr}</p>
                                                                                                              <p className={`text-xs ${selectedTemplate === template.id
                                                                                                                        ? 'text-white/70'
                                                                                                                        : 'text-slate-500 dark:text-slate-400'
                                                                                                                        }`}>
                                                                                                                        {template.name}
                                                                                                              </p>
                                                                                                    </div>
                                                                                          </div>
                                                                                </button>
                                                                      ))}
                                                            </div>

                                                            {/* Preview Info */}
                                                            <div className="mt-6 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                                                                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">القالب المحدد</p>
                                                                      <p className="font-medium text-slate-900 dark:text-white">
                                                                                {TEMPLATES.find(t => t.id === selectedTemplate)?.nameAr}
                                                                      </p>
                                                            </div>
                                                  </aside>
                                        )}

                                        {/* Main Content */}
                                        <main className={`flex-1 p-6 ${showTemplateSelector ? '' : ''}`}>
                                                  {/* Page Title */}
                                                  <div className="text-center mb-6">
                                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-primary rounded-full text-sm font-medium shadow-sm mb-2">
                                                                      <DocumentTextIcon className="w-4 h-4" />
                                                                      <span>معاينة {config.title}</span>
                                                            </div>
                                                            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                                                                      {formData.title}
                                                            </h1>
                                                  </div>

                                                  {/* Template Preview */}
                                                  <div className="mb-8">
                                                            {renderTemplate()}
                                                  </div>

                                                  {/* Action Buttons */}
                                                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
                                                            <button
                                                                      onClick={handleDownload}
                                                                      className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-medium transition-colors shadow-lg shadow-primary/20"
                                                            >
                                                                      <ArrowDownTrayIcon className="w-5 h-5" />
                                                                      <span>تحميل PDF</span>
                                                            </button>
                                                            <Link
                                                                      href={`/create/${reportType}`}
                                                                      className="flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-medium transition-colors border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                                                            >
                                                                      <PencilSquareIcon className="w-5 h-5" />
                                                                      <span>تعديل التقرير</span>
                                                            </Link>
                                                            <button
                                                                      onClick={handleNewReport}
                                                                      className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-8 py-4 rounded-xl font-medium transition-colors"
                                                            >
                                                                      <DocumentTextIcon className="w-5 h-5" />
                                                                      <span>تقرير جديد</span>
                                                            </button>
                                                  </div>
                                        </main>
                              </div>
                    </div>
          );
}
