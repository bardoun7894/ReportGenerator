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
          PhotoIcon
} from "@heroicons/react/24/outline";

interface TemplateProps {
          formData: WizardFormData;
          reportTypeTitle: string;
}

export default function TemplateOfficialGov({ formData, reportTypeTitle }: TemplateProps) {
          return (
                    <div
                              className="bg-white max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
                              style={{
                                        fontFamily: 'Tajawal, sans-serif',
                                        padding: '0',
                                        border: '1px solid #d1d5db'
                              }}
                              dir="rtl"
                    >
                              {/* Top Pattern Bar */}
                              <div className="h-4 w-full bg-[#006C35] relative overflow-hidden">
                                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #C8A051 10px, #C8A051 20px)' }}></div>
                              </div>

                              {/* Official Header */}
                              <div className="px-10 py-8 flex justify-between items-center border-b border-gray-200">
                                        <div className="text-center w-1/4">
                                                  <div className="w-20 h-20 mx-auto mb-2 relative">
                                                            <Image
                                                                      src="/salogos.svg"
                                                                      alt="Ministry Logo"
                                                                      fill
                                                                      className="object-contain"
                                                            />
                                                  </div>
                                                  <p className="text-[#006C35] font-bold text-sm">المملكة العربية السعودية</p>
                                                  <p className="text-[#006C35] text-sm">وزارة التعليم</p>
                                        </div>

                                        <div className="text-center flex-1">
                                                  <h1 className="text-3xl font-bold text-[#006C35] mb-2">{formData.schoolName}</h1>
                                                  <p className="text-gray-600 font-medium">{formData.educationRegion}</p>
                                                  <div className="mt-4 inline-block px-8 py-2 bg-[#f3f4f6] rounded-full border border-gray-200">
                                                            <h2 className="text-xl font-bold text-[#1f2937]">{formData.title}</h2>
                                                  </div>
                                        </div>

                                        <div className="text-center w-1/4">
                                                  {formData.schoolLogo ? (
                                                            <div className="w-24 h-24 mx-auto relative">
                                                                      <Image src={formData.schoolLogo} alt="School Logo" fill className="object-contain" />
                                                            </div>
                                                  ) : (
                                                            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center text-gray-400">
                                                                      <BuildingLibraryIcon className="w-12 h-12 opacity-50" />
                                                            </div>
                                                  )}
                                        </div>
                              </div>

                              {/* Main Content Area with Watermark */}
                              <div className="p-10 relative min-h-[600px]">
                                        {/* Watermark */}
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                                                  <div className="w-[400px] h-[400px] relative">
                                                            <Image
                                                                      src="/salogos.svg"
                                                                      alt="Watermark"
                                                                      fill
                                                                      className="object-contain grayscale"
                                                            />
                                                  </div>
                                        </div>

                                        <div className="relative z-10 grid grid-cols-12 gap-8">
                                                  {/* Right Column - Info */}
                                                  <div className="col-span-4 space-y-6">
                                                            <div className="bg-[#f9fafb] p-4 rounded-lg border-r-4 border-[#006C35]">
                                                                      <div className="flex items-center gap-2 mb-1 text-gray-500">
                                                                                <CalendarDaysIcon className="w-4 h-4" />
                                                                                <p className="text-xs">تاريخ التنفيذ</p>
                                                                      </div>
                                                                      <p className="font-bold text-[#1f2937]">{formData.date}</p>
                                                            </div>

                                                            <div className="bg-[#f9fafb] p-4 rounded-lg border-r-4 border-[#C8A051]">
                                                                      <div className="flex items-center gap-2 mb-1 text-gray-500">
                                                                                <MapPinIcon className="w-4 h-4" />
                                                                                <p className="text-xs">مقر التنفيذ</p>
                                                                      </div>
                                                                      <p className="font-bold text-[#1f2937]">{formData.location}</p>
                                                            </div>

                                                            <div className="bg-[#f9fafb] p-4 rounded-lg border-r-4 border-[#006C35]">
                                                                      <div className="flex items-center gap-2 mb-1 text-gray-500">
                                                                                <UsersIcon className="w-4 h-4" />
                                                                                <p className="text-xs">عدد المستفيدين</p>
                                                                      </div>
                                                                      <p className="font-bold text-[#1f2937] text-xl">{formData.participantsCount}</p>
                                                            </div>

                                                            <div className="bg-[#f9fafb] p-4 rounded-lg border-r-4 border-[#C8A051]">
                                                                      <div className="flex items-center gap-2 mb-1 text-gray-500">
                                                                                <AcademicCapIcon className="w-4 h-4" />
                                                                                <p className="text-xs">المجال</p>
                                                                      </div>
                                                                      <p className="font-bold text-[#1f2937]">{formData.domain}</p>
                                                            </div>

                                                            <div className="mt-8">
                                                                      <h3 className="font-bold text-[#006C35] mb-3 border-b border-gray-200 pb-2">الفئات المستهدفة</h3>
                                                                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                                                                {formData.targetAudience?.map((a, i) => (
                                                                                          <li key={i}>{a}</li>
                                                                                ))}
                                                                      </ul>
                                                            </div>
                                                  </div>

                                                  {/* Left Column - Narrative & Photos */}
                                                  <div className="col-span-8 space-y-8">
                                                            <div>
                                                                      <h3 className="font-bold text-[#006C35] text-lg mb-3 flex items-center gap-2">
                                                                                <span className="w-2 h-8 bg-[#C8A051] rounded-sm"></span>
                                                                                <DocumentTextIcon className="w-6 h-6 text-[#006C35]" />
                                                                                وصف البرنامج
                                                                      </h3>
                                                                      <p className="text-gray-700 leading-loose text-justify">
                                                                                {formData.executionSteps}
                                                                      </p>
                                                            </div>

                                                            <div>
                                                                      <h3 className="font-bold text-[#006C35] text-lg mb-3 flex items-center gap-2">
                                                                                <span className="w-2 h-8 bg-[#C8A051] rounded-sm"></span>
                                                                                <FlagIcon className="w-6 h-6 text-[#006C35]" />
                                                                                الأهداف التفصيلية
                                                                      </h3>
                                                                      <div className="grid grid-cols-1 gap-2">
                                                                                {formData.objectives?.map((obj, idx) => (
                                                                                          <div key={idx} className="flex gap-3 items-start p-2 hover:bg-gray-50 rounded transition-colors">
                                                                                                    <span className="w-6 h-6 bg-[#006C35] text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-1">{idx + 1}</span>
                                                                                                    <p className="text-gray-700">{obj.isAIEnhanced ? obj.enhanced : obj.original}</p>
                                                                                          </div>
                                                                                ))}
                                                                      </div>
                                                            </div>

                                                            {/* Photo Strip */}
                                                            <div className="grid grid-cols-3 gap-3 mt-6">
                                                                      {formData.photos && formData.photos.length > 0 ? (
                                                                                formData.photos.slice(0, 3).map((photo, idx) => (
                                                                                          <div key={idx} className="border border-gray-200 p-1 rounded bg-white shadow-sm">
                                                                                                    <div className="aspect-[4/3] relative">
                                                                                                              <Image src={photo} alt="Event" fill className="object-cover rounded-sm" />
                                                                                                    </div>
                                                                                          </div>
                                                                                ))
                                                                      ) : (
                                                                                [1, 2, 3].map((n) => (
                                                                                          <div key={n} className="border border-gray-200 p-1 rounded bg-white shadow-sm flex items-center justify-center aspect-[4/3]">
                                                                                                    <PhotoIcon className="w-8 h-8 text-gray-300" />
                                                                                          </div>
                                                                                ))
                                                                      )}
                                                            </div>
                                                  </div>
                                        </div>
                              </div>

                              {/* Official Footer */}
                              <div className="bg-[#f3f4f6] border-t border-gray-200 p-8 mt-auto">
                                        <div className="flex justify-between items-center max-w-2xl mx-auto">
                                                  <div className="text-center">
                                                            <p className="text-gray-500 text-sm mb-8">رائد النشاط</p>
                                                            <p className="font-bold text-[#1f2937]">{formData.activityLeaderName}</p>
                                                  </div>
                                                  <div className="text-center">
                                                            <p className="text-gray-500 text-sm mb-8">مدير المدرسة</p>
                                                            <p className="font-bold text-[#1f2937]">{formData.principalName}</p>
                                                  </div>
                                        </div>
                                        <div className="text-center mt-8 pt-4 border-t border-gray-300">
                                                  <p className="text-xs text-gray-400">تم إصدار هذا التقرير عبر منصة التقارير المدرسية المعتمدة</p>
                                        </div>
                              </div>
                    </div>
          );
}
