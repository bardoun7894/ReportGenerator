"use client";

import { WizardFormData } from "@/stores/wizard-store";
import Image from "next/image";
import {
          CalendarDaysIcon,
          MapPinIcon,
          UsersIcon,
          DocumentTextIcon,
          FlagIcon,
          CameraIcon,
          ListBulletIcon
} from "@heroicons/react/24/outline";
import { getAudienceLabel, extractDescription, extractSteps } from "./template-helpers";

interface TemplateProps {
          formData: WizardFormData;
          reportTypeTitle: string;
}

/**
 * TemplateShahedNew - Gradient variation of the Shahed template
 * Matches the exact data structure but uses gradient styling as requested
 */
export default function TemplateShahedNew({ formData, reportTypeTitle }: TemplateProps) {
          // Gradient definitions - using a sophisticated Green gradient typical of such reports
          const mainGradient = "linear-gradient(90deg, #006C35 0%, #004D25 100%)";
          const accentGradient = "linear-gradient(90deg, #C8A051 0%, #A67C2E 100%)";

          return (
                    <div
                              className="bg-white template-a4 shadow-2xl overflow-hidden"
                              style={{ fontFamily: 'Tajawal, sans-serif' }}
                              dir="rtl"
                    >
                              {/* Top Header Bar - Gradient Background */}
                              <header className="bg-white">
                                        {/* Logo Row */}
                                        <div className="flex justify-between items-start px-8 pt-6 pb-4">
                                                  {/* Ministry Logo - Right Side */}
                                                  <div className="flex flex-col items-center" style={{ width: '100px' }}>
                                                            <div className="w-20 h-20 relative">
                                                                      <Image
                                                                                src="/salogos.svg"
                                                                                alt="وزارة التعليم"
                                                                                fill
                                                                                className="object-contain"
                                                                      />
                                                            </div>
                                                            <p className="text-[#006C35] font-bold text-[11px] mt-1">وزارة التعليم</p>
                                                            <p className="text-[#006C35] text-[9px]">Ministry of Education</p>
                                                  </div>

                                                  {/* Center - School Info */}
                                                  <div className="flex-1 text-center px-4">
                                                            <h2 className="text-[#006C35] font-bold text-lg">{formData.schoolName || "اسم المدرسة"}</h2>
                                                            <p className="text-gray-600 text-sm">{formData.educationRegion || "إدارة التعليم"}</p>
                                                  </div>

                                                  {/* School Logo - Left Side */}
                                                  <div className="flex flex-col items-center" style={{ width: '100px' }}>
                                                            {formData.schoolLogo ? (
                                                                      <div className="w-20 h-20 relative">
                                                                                <Image src={formData.schoolLogo} alt="شعار المدرسة" fill className="object-contain" />
                                                                      </div>
                                                            ) : (
                                                                      <div className="w-20 h-20 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                                                                                <span className="text-gray-400 text-[10px]">شعار المدرسة</span>
                                                                      </div>
                                                            )}
                                                  </div>
                                        </div>

                                        {/* Title Banner - Full Gradient */}
                                        <div
                                                  className="py-4 px-8 text-center shadow-md relative overflow-hidden"
                                                  style={{ background: mainGradient }}
                                        >
                                                  {/* Decorative shine effect */}
                                                  <div className="absolute top-0 left-0 w-full h-full bg-white/10 skew-x-12 transform -translate-x-full animate-pulse"></div>

                                                  <h1 className="text-white font-bold text-2xl relative z-10 drop-shadow-sm">
                                                            {formData.title || "تقرير برنامج"}
                                                  </h1>
                                        </div>
                              </header>

                              {/* Main Content - Two Column Grid */}
                              <main className="p-6 grid grid-cols-12 gap-6" style={{ backgroundColor: '#FAFBFC' }}>
                                        {/* Right Sidebar - 4 columns */}
                                        <div className="col-span-4 space-y-4">
                                                  {/* Event Data Card */}
                                                  <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm relative overflow-hidden group">
                                                            <h3 className="font-bold text-[#006C35] mb-4 text-sm flex items-center gap-2 relative z-10">
                                                                      <span className="w-1.5 h-6 rounded-full" style={{ background: accentGradient }}></span>
                                                                      بيانات الفعالية
                                                            </h3>

                                                            <div className="space-y-4 relative z-10">
                                                                      <div className="flex items-start gap-3">
                                                                                <CalendarDaysIcon className="w-5 h-5 text-[#C8A051] flex-shrink-0 mt-0.5" />
                                                                                <div>
                                                                                          <p className="text-[11px] text-gray-500">التاريخ</p>
                                                                                          <p className="text-sm font-semibold text-gray-800">{formData.date || "---"}</p>
                                                                                </div>
                                                                      </div>

                                                                      <div className="flex items-start gap-3">
                                                                                <MapPinIcon className="w-5 h-5 text-[#C8A051] flex-shrink-0 mt-0.5" />
                                                                                <div>
                                                                                          <p className="text-[11px] text-gray-500">المكان</p>
                                                                                          <p className="text-sm font-semibold text-gray-800">{formData.location || "---"}</p>
                                                                                </div>
                                                                      </div>

                                                                      <div className="flex items-start gap-3">
                                                                                <UsersIcon className="w-5 h-5 text-[#C8A051] flex-shrink-0 mt-0.5" />
                                                                                <div>
                                                                                          <p className="text-[11px] text-gray-500">عدد الحضور</p>
                                                                                          <p className="text-sm font-semibold text-gray-800">{formData.participantsCount || "---"}</p>
                                                                                </div>
                                                                      </div>
                                                            </div>

                                                            {/* Soft decorative background gradient on hover */}
                                                            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#006C35]/5 rounded-full blur-xl group-hover:bg-[#006C35]/10 transition-all"></div>
                                                  </div>

                                                  {/* Target Audience Card */}
                                                  <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm relative overflow-hidden group">
                                                            <h3 className="font-bold text-[#006C35] mb-3 text-sm flex items-center gap-2 relative z-10">
                                                                      <span className="w-1.5 h-6 rounded-full" style={{ background: accentGradient }}></span>
                                                                      الفئة المستهدفة
                                                            </h3>
                                                            <div className="flex flex-wrap gap-2 relative z-10">
                                                                      {formData.targetAudience?.map((audience, idx) => (
                                                                                <span
                                                                                          key={idx}
                                                                                          className="px-3 py-1 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 shadow-sm"
                                                                                >
                                                                                          {getAudienceLabel(audience)}
                                                                                </span>
                                                                      )) || <span className="text-gray-400 text-xs">---</span>}
                                                            </div>

                                                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#C8A051]/5 rounded-full blur-xl group-hover:bg-[#C8A051]/10 transition-all"></div>
                                                  </div>

                                                  {/* Activity Domain Card */}
                                                  {formData.domain && (
                                                            <div
                                                                      className="rounded-lg p-5 text-white shadow-md relative overflow-hidden"
                                                                      style={{ background: mainGradient }}
                                                            >
                                                                      <div className="relative z-10">
                                                                                <p className="text-[11px] opacity-80 mb-1">مجال النشاط</p>
                                                                                <p className="font-bold">{formData.domain}</p>
                                                                      </div>

                                                                      {/* Decorative shapes */}
                                                                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                                                                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                                                            </div>
                                                  )}
                                        </div>

                                        {/* Main Content - 8 columns */}
                                        <div className="col-span-8 space-y-5">
                                                  {/* Description Section */}
                                                  <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                                                            <div className="px-5 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                                                                      <h3 className="font-bold text-[#006C35] text-sm flex items-center gap-2">
                                                                                <DocumentTextIcon className="w-5 h-5 text-[#C8A051]" />
                                                                                وصف البرنامج
                                                                      </h3>
                                                            </div>
                                                            <div className="p-5">
                                                                      {extractDescription(formData.executionSteps) && (
                                                                                <p className="text-gray-700 leading-relaxed text-sm text-justify">
                                                                                          {extractDescription(formData.executionSteps)}
                                                                                </p>
                                                                      )}

                                                                      {extractSteps(formData.executionSteps).length > 0 && (
                                                                                <div className="mt-4 pt-4 border-t border-gray-100">
                                                                                          <h4 className="font-bold text-[#006C35] text-xs flex items-center gap-2 mb-3">
                                                                                                    <ListBulletIcon className="w-4 h-4" />
                                                                                                    خطوات التنفيذ
                                                                                          </h4>
                                                                                          <div className="space-y-2">
                                                                                                    {extractSteps(formData.executionSteps).map((step, idx) => (
                                                                                                              <div key={idx} className="flex gap-2 items-start group">
                                                                                                                        <span
                                                                                                                                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 shadow-sm"
                                                                                                                                  style={{ background: mainGradient }}
                                                                                                                        >
                                                                                                                                  {idx + 1}
                                                                                                                        </span>
                                                                                                                        <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors">{step}</p>
                                                                                                              </div>
                                                                                                    ))}
                                                                                          </div>
                                                                                </div>
                                                                      )}
                                                            </div>
                                                  </div>

                                                  {/* Objectives Section */}
                                                  <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                                                            <div className="px-5 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                                                                      <h3 className="font-bold text-[#006C35] text-sm flex items-center gap-2">
                                                                                <FlagIcon className="w-5 h-5 text-[#C8A051]" />
                                                                                الأهداف المحققة
                                                                      </h3>
                                                            </div>
                                                            <div className="p-5 space-y-2">
                                                                      {formData.objectives?.map((obj, idx) => (
                                                                                <div
                                                                                          key={idx}
                                                                                          className="flex gap-3 items-start p-3 rounded-lg border border-gray-50 hover:border-gray-200 transition-all hover:shadow-sm"
                                                                                          style={{ backgroundColor: '#F9FAFB' }}
                                                                                >
                                                                                          <span
                                                                                                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5"
                                                                                                    style={{ background: mainGradient }}
                                                                                          >
                                                                                                    {idx + 1}
                                                                                          </span>
                                                                                          <p className="text-gray-700 text-sm">{obj.isAIEnhanced ? obj.enhanced : obj.original}</p>
                                                                                </div>
                                                                      )) || <p className="text-gray-400 text-center text-sm py-4">لم يتم إضافة أهداف</p>}
                                                            </div>
                                                  </div>

                                                  {/* Photos Section */}
                                                  {formData.photos && formData.photos.length > 0 && (
                                                            <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                                                                      <div className="px-5 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                                                                                <h3 className="font-bold text-[#006C35] text-sm flex items-center gap-2">
                                                                                          <CameraIcon className="w-5 h-5 text-[#006C35]" />
                                                                                          التوثيق الصوري
                                                                                </h3>
                                                                      </div>
                                                                      <div className="p-5">
                                                                                <div className="grid grid-cols-2 gap-3">
                                                                                          {formData.photos?.slice(0, 2).map((photo, idx) => (
                                                                                                    <div
                                                                                                              key={idx}
                                                                                                              className="aspect-video relative rounded-lg overflow-hidden border border-gray-200 shadow-sm group"
                                                                                                    >
                                                                                                              <Image
                                                                                                                        src={photo}
                                                                                                                        alt={`صورة ${idx + 1}`}
                                                                                                                        fill
                                                                                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                                                                              />
                                                                                                              {/* Gradient overlay on hover */}
                                                                                                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                                                                    </div>
                                                                                          ))}
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  )}
                                        </div>
                              </main>

                              {/* Footer - Signatures */}
                              <footer
                                        className="border-t border-gray-200 p-6"
                                        style={{ backgroundColor: '#F9FAFB' }}
                              >
                                        <div className="flex justify-around items-end max-w-2xl mx-auto">
                                                  <div className="text-center">
                                                            <p className="text-gray-500 text-sm mb-3">رائد/ة النشاط</p>
                                                            <p className="font-bold text-[#006C35]">{formData.activityLeaderName || "___________"}</p>
                                                  </div>
                                                  <div className="text-center">
                                                            <p className="text-gray-500 text-sm mb-3">مدير/ة المدرسة</p>
                                                            <p className="font-bold text-[#006C35]">{formData.principalName || "___________"}</p>
                                                  </div>
                                        </div>
                              </footer>
                    </div>
          );
}
