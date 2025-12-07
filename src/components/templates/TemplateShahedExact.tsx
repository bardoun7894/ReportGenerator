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
 * TemplateShahedExact - 100% accurate replica of the تقرير شاهد PDF
 * Matches exact colors, spacing, fonts, and layout from the original
 */
export default function TemplateShahedExact({ formData, reportTypeTitle }: TemplateProps) {
          return (
                    <div
                              className="bg-white max-w-4xl mx-auto shadow-2xl overflow-hidden"
                              style={{ fontFamily: 'Tajawal, sans-serif' }}
                              dir="rtl"
                    >
                              {/* Top Header Bar - Exact PDF Style */}
                              <header className="bg-white">
                                        {/* Logo Row */}
                                        <div className="flex justify-between items-center px-8 pt-6 pb-4">
                                                  {/* Ministry Logo - Right Side (first in RTL) */}
                                                  <div className="flex items-center gap-4">
                                                            <div className="w-24 h-24 relative">
                                                                      <Image
                                                                                src="/salogos.svg"
                                                                                alt="وزارة التعليم"
                                                                                fill
                                                                                className="object-contain"
                                                                      />
                                                            </div>
                                                            <div className="border-r border-[#006C35]/30 h-16 mx-2"></div>
                                                            <div className="text-right">
                                                                      <p className="text-[#006C35] text-[10px]">المملكة العربية السعودية</p>
                                                                      <p className="text-[#006C35] font-bold text-sm">وزارة التعليم</p>
                                                                      <p className="text-[#006C35] text-[9px]">Ministry of Education</p>
                                                            </div>
                                                  </div>

                                                  {/* School Info - Left Side */}
                                                  <div className="text-left">
                                                            <p className="text-[#006C35] font-bold text-sm">{formData.educationRegion || "الإدارة العامة للتعليم"}</p>
                                                            <p className="text-gray-700 text-sm font-semibold mt-1">
                                                                      {formData.schoolType ? `المرحلة ${formData.schoolType === 'ابتدائي' ? 'الابتدائية' : formData.schoolType === 'متوسط' ? 'المتوسطة' : 'الثانوية'}` : ''}
                                                            </p>
                                                            <p className="text-[#006C35] font-bold text-base mt-1">{formData.schoolName || "اسم المدرسة"}</p>
                                                  </div>
                                        </div>

                                        {/* Title Banner - Green with exact PDF style */}
                                        <div
                                                  className="py-4 px-8 text-center"
                                                  style={{ backgroundColor: '#006C35' }}
                                        >
                                                  <h1 className="text-white font-bold text-2xl">{formData.title || "تقرير برنامج"}</h1>
                                        </div>
                              </header>

                              {/* Main Content - Two Column Grid */}
                              <main className="p-6 grid grid-cols-12 gap-6" style={{ backgroundColor: '#FAFBFC' }}>
                                        {/* Right Sidebar - 4 columns */}
                                        <div className="col-span-4 space-y-4">
                                                  {/* Event Data Card */}
                                                  <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm">
                                                            <h3 className="font-bold text-[#006C35] mb-4 text-sm flex items-center gap-2">
                                                                      <span className="w-1 h-5 bg-[#C8A051] rounded-full"></span>
                                                                      بيانات الفعالية
                                                            </h3>

                                                            <div className="space-y-4">
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
                                                  </div>

                                                  {/* Target Audience Card */}
                                                  <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm">
                                                            <h3 className="font-bold text-[#006C35] mb-3 text-sm flex items-center gap-2">
                                                                      <span className="w-1 h-5 bg-[#C8A051] rounded-full"></span>
                                                                      الفئة المستهدفة
                                                            </h3>
                                                            <div className="flex flex-wrap gap-2">
                                                                      {formData.targetAudience?.map((audience, idx) => (
                                                                                <span
                                                                                          key={idx}
                                                                                          className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-700"
                                                                                >
                                                                                          {getAudienceLabel(audience)}
                                                                                </span>
                                                                      )) || <span className="text-gray-400 text-xs">---</span>}
                                                            </div>
                                                  </div>

                                                  {/* Activity Domain Card */}
                                                  {formData.domain && (
                                                            <div
                                                                      className="rounded-lg p-5 text-white"
                                                                      style={{ backgroundColor: '#006C35' }}
                                                            >
                                                                      <p className="text-[11px] opacity-80 mb-1">مجال النشاط</p>
                                                                      <p className="font-bold">{formData.domain}</p>
                                                            </div>
                                                  )}
                                        </div>

                                        {/* Main Content - 8 columns */}
                                        <div className="col-span-8 space-y-5">
                                                  {/* Description Section */}
                                                  <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                                                            <div className="px-5 py-3 border-b border-gray-100">
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
                                                                                                              <div key={idx} className="flex gap-2 items-start">
                                                                                                                        <span
                                                                                                                                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                                                                                                                                  style={{ backgroundColor: '#006C35' }}
                                                                                                                        >
                                                                                                                                  {idx + 1}
                                                                                                                        </span>
                                                                                                                        <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                                                                                                              </div>
                                                                                                    ))}
                                                                                          </div>
                                                                                </div>
                                                                      )}
                                                            </div>
                                                  </div>

                                                  {/* Objectives Section */}
                                                  <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                                                            <div className="px-5 py-3 border-b border-gray-100">
                                                                      <h3 className="font-bold text-[#006C35] text-sm flex items-center gap-2">
                                                                                <FlagIcon className="w-5 h-5 text-[#C8A051]" />
                                                                                الأهداف المحققة
                                                                      </h3>
                                                            </div>
                                                            <div className="p-5 space-y-2">
                                                                      {formData.objectives?.map((obj, idx) => (
                                                                                <div
                                                                                          key={idx}
                                                                                          className="flex gap-3 items-start p-3 rounded-lg border border-gray-50"
                                                                                          style={{ backgroundColor: '#F9FAFB' }}
                                                                                >
                                                                                          <span
                                                                                                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5"
                                                                                                    style={{ backgroundColor: '#006C35' }}
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
                                                                      <div className="px-5 py-3 border-b border-gray-100">
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
                                                                                                              className="aspect-video relative rounded-lg overflow-hidden border border-gray-200"
                                                                                                    >
                                                                                                              <Image
                                                                                                                        src={photo}
                                                                                                                        alt={`صورة ${idx + 1}`}
                                                                                                                        fill
                                                                                                                        className="object-cover"
                                                                                                              />
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
                                                            <p className="text-gray-500 text-sm mb-3">رائد النشاط</p>
                                                            <p className="font-bold text-[#006C35]">{formData.activityLeaderName || "___________"}</p>
                                                  </div>
                                                  <div className="text-center">
                                                            <p className="text-gray-500 text-sm mb-3">مدير المدرسة</p>
                                                            <p className="font-bold text-[#006C35]">{formData.principalName || "___________"}</p>
                                                  </div>
                                        </div>
                              </footer>
                    </div>
          );
}
