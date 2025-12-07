"use client";

import { WizardFormData } from "@/stores/wizard-store";
import Image from "next/image";
import {
          CalendarDaysIcon,
          MapPinIcon,
          UsersIcon,
          AcademicCapIcon,
          DocumentTextIcon,
          FlagIcon,
          BuildingLibraryIcon,
          CameraIcon,
          ListBulletIcon
} from "@heroicons/react/24/outline";
import { getAudienceLabel, extractDescription, extractSteps } from "./template-helpers";

interface TemplateProps {
          formData: WizardFormData;
          reportTypeTitle: string;
}

export default function TemplateShahed({ formData, reportTypeTitle }: TemplateProps) {
          return (
                    <div
                              className="bg-white max-w-4xl mx-auto shadow-2xl overflow-hidden flex flex-col min-h-[1100px]"
                              style={{ fontFamily: 'Tajawal, sans-serif' }}
                              dir="rtl"
                    >
                              {/* Header */}
                              <header className="px-4 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-start gap-4 border-b-2 border-[#006C35]">
                                        <div className="flex flex-col items-center w-32">
                                                  <div className="w-24 h-24 relative mb-2">
                                                            <Image
                                                                      src="/salogos.svg"
                                                                      alt="Ministry Logo"
                                                                      fill
                                                                      className="object-contain"
                                                            />
                                                  </div>
                                                  <p className="text-[#006C35] font-bold text-xs text-center">وزارة التعليم</p>
                                                  <p className="text-[#006C35] text-[10px] text-center">Ministry of Education</p>
                                        </div>

                                        <div className="flex-1 text-center pt-4">
                                                  <h2 className="text-xl font-bold text-[#006C35] mb-1">{formData.schoolName}</h2>
                                                  <p className="text-gray-600 text-sm mb-6">{formData.educationRegion}</p>

                                                  <div className="inline-block px-12 py-3 bg-[#006C35] text-white rounded-lg shadow-md">
                                                            <h1 className="text-2xl font-bold">{formData.title}</h1>
                                                  </div>
                                        </div>

                                        {formData.schoolLogo && (
                                                  <div className="flex flex-col items-center w-32 pt-2">
                                                            <div className="w-24 h-24 relative mb-2">
                                                                      <Image src={formData.schoolLogo} alt="School Logo" fill className="object-contain" />
                                                            </div>
                                                            <p className="text-gray-500 text-[10px] text-center mt-1">شعار المدرسة</p>
                                                  </div>
                                        )}
                              </header>

                              {/* Main Content */}
                              <main className="flex-1 p-4 sm:p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                                        {/* Right Column: Info & Stats */}
                                        <div className="col-span-1 md:col-span-4 space-y-6">
                                                  {/* Info Card */}
                                                  <div className="bg-[#F9FAFB] rounded-xl p-6 border border-gray-100 shadow-sm">
                                                            <h3 className="font-bold text-[#006C35] mb-4 flex items-center gap-2">
                                                                      <span className="w-1 h-6 bg-[#C8A051] rounded-full"></span>
                                                                      بيانات الفعالية
                                                            </h3>

                                                            <div className="space-y-4">
                                                                      <div className="flex items-start gap-3">
                                                                                <CalendarDaysIcon className="w-5 h-5 text-[#C8A051] mt-0.5" />
                                                                                <div>
                                                                                          <p className="text-xs text-gray-500">التاريخ</p>
                                                                                          <p className="font-semibold text-gray-800">{formData.date}</p>
                                                                                </div>
                                                                      </div>

                                                                      <div className="flex items-start gap-3">
                                                                                <MapPinIcon className="w-5 h-5 text-[#C8A051] mt-0.5" />
                                                                                <div>
                                                                                          <p className="text-xs text-gray-500">المكان</p>
                                                                                          <p className="font-semibold text-gray-800">{formData.location}</p>
                                                                                </div>
                                                                      </div>

                                                                      <div className="flex items-start gap-3">
                                                                                <UsersIcon className="w-5 h-5 text-[#C8A051] mt-0.5" />
                                                                                <div>
                                                                                          <p className="text-xs text-gray-500">عدد الحضور</p>
                                                                                          <p className="font-semibold text-gray-800">{formData.participantsCount}</p>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  </div>

                                                  {/* Target Audience */}
                                                  <div className="bg-[#F9FAFB] rounded-xl p-6 border border-gray-100 shadow-sm">
                                                            <h3 className="font-bold text-[#006C35] mb-4 flex items-center gap-2">
                                                                      <span className="w-1 h-6 bg-[#C8A051] rounded-full"></span>
                                                                      الفئة المستهدفة
                                                            </h3>
                                                            <div className="flex flex-wrap gap-2">
                                                                      {formData.targetAudience?.map((audience, idx) => (
                                                                                <span key={idx} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
                                                                                          {getAudienceLabel(audience)}
                                                                                </span>
                                                                      ))}
                                                            </div>
                                                  </div>

                                                  {/* Domain */}
                                                  {formData.domain && (
                                                            <div className="bg-[#006C35] rounded-xl p-6 text-white shadow-md">
                                                                      <p className="text-xs opacity-80 mb-1">مجال النشاط</p>
                                                                      <p className="font-bold text-lg">{formData.domain}</p>
                                                            </div>
                                                  )}
                                        </div>

                                        {/* Left Column: Description, Goals, Photos */}
                                        <div className="col-span-1 md:col-span-8 space-y-6 md:space-y-8">
                                                  {/* Description */}
                                                  <div>
                                                            <h3 className="font-bold text-[#006C35] text-lg mb-3 flex items-center gap-2 border-b border-gray-100 pb-2">
                                                                      <DocumentTextIcon className="w-6 h-6 text-[#C8A051]" />
                                                                      وصف البرنامج
                                                            </h3>
                                                            <div className="bg-white p-4 rounded-xl border border-gray-50 shadow-sm">
                                                                      {/* Description paragraph */}
                                                                      {extractDescription(formData.executionSteps) && (
                                                                                <p className="text-gray-700 leading-loose text-justify mb-4">
                                                                                          {extractDescription(formData.executionSteps)}
                                                                                </p>
                                                                      )}
                                                                      {/* Execution Steps as numbered list */}
                                                                      {extractSteps(formData.executionSteps).length > 0 && (
                                                                                <div className="space-y-2">
                                                                                          <h4 className="font-bold text-[#006C35] text-sm flex items-center gap-2 mb-2">
                                                                                                    <ListBulletIcon className="w-4 h-4" />
                                                                                                    خطوات التنفيذ
                                                                                          </h4>
                                                                                          {extractSteps(formData.executionSteps).map((step, idx) => (
                                                                                                    <div key={idx} className="flex gap-2 items-start">
                                                                                                              <span className="w-5 h-5 bg-[#006C35] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                                                                                        {idx + 1}
                                                                                                              </span>
                                                                                                              <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                                                                                                    </div>
                                                                                          ))}
                                                                                </div>
                                                                      )}
                                                            </div>
                                                  </div>

                                                  {/* Goals */}
                                                  <div>
                                                            <h3 className="font-bold text-[#006C35] text-lg mb-3 flex items-center gap-2 border-b border-gray-100 pb-2">
                                                                      <FlagIcon className="w-6 h-6 text-[#C8A051]" />
                                                                      الأهداف المحققة
                                                            </h3>
                                                            <div className="grid grid-cols-1 gap-3">
                                                                      {formData.objectives?.map((obj, idx) => (
                                                                                <div key={idx} className="flex gap-3 items-start bg-[#F9FAFB] p-3 rounded-lg border border-gray-100">
                                                                                          <span className="w-6 h-6 bg-[#006C35] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                                                                                    {idx + 1}
                                                                                          </span>
                                                                                          <p className="text-gray-700">{obj.isAIEnhanced ? obj.enhanced : obj.original}</p>
                                                                                </div>
                                                                      ))}
                                                            </div>
                                                  </div>

                                                  {/* Photos */}
                                                  <div>
                                                            <h3 className="font-bold text-[#006C35] text-lg mb-3 flex items-center gap-2 border-b border-gray-100 pb-2">
                                                                      <CameraIcon className="w-6 h-6 text-[#006C35]" />
                                                                      التوثيق الصوري
                                                            </h3>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                      {formData.photos?.slice(0, 2).map((photo, idx) => (
                                                                                <div key={idx} className="aspect-video relative rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
                                                                                          <Image src={photo} alt={`Photo ${idx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                                                </div>
                                                                      ))}
                                                            </div>
                                                  </div>
                                        </div>
                              </main>

                              {/* Footer */}
                              <footer className="mt-auto bg-[#F9FAFB] border-t border-gray-200 p-8">
                                        <div className="flex justify-around items-end max-w-3xl mx-auto">
                                                  <div className="text-center">
                                                            <p className="text-gray-500 text-sm mb-4">{formData.activityLeaderTitle || "رائد النشاط"}</p>
                                                            <p className="font-bold text-[#006C35] text-lg">{formData.activityLeaderName}</p>
                                                  </div>

                                                  <div className="text-center">
                                                            <p className="text-gray-500 text-sm mb-4">{formData.principalTitle || "مدير المدرسة"}</p>
                                                            <p className="font-bold text-[#006C35] text-lg">{formData.principalName}</p>
                                                  </div>
                                        </div>
                              </footer>
                    </div>
          );
}
