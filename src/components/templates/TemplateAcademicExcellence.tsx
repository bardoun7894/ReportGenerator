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

export default function TemplateAcademicExcellence({ formData, reportTypeTitle }: TemplateProps) {
          return (
                    <div
                              className="bg-[#fdfbf7] max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
                              style={{
                                        fontFamily: '"Times New Roman", "Traditional Arabic", serif',
                                        padding: '40px',
                                        border: '12px solid #881337' // Burgundy border
                              }}
                              dir="rtl"
                    >
                              {/* Corner Ornaments (CSS shapes) */}
                              <div className="absolute top-0 left-0 w-20 h-20 border-r border-b border-[#881337] bg-[#fdfbf7] z-10 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                              <div className="absolute top-0 right-0 w-20 h-20 border-l border-b border-[#881337] bg-[#fdfbf7] z-10 transform translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                              <div className="absolute bottom-0 left-0 w-20 h-20 border-r border-t border-[#881337] bg-[#fdfbf7] z-10 transform -translate-x-1/2 translate-y-1/2 rotate-45"></div>
                              <div className="absolute bottom-0 right-0 w-20 h-20 border-l border-t border-[#881337] bg-[#fdfbf7] z-10 transform translate-x-1/2 translate-y-1/2 rotate-45"></div>

                              {/* Header */}
                              <div className="text-center border-b-2 border-[#881337] pb-6 mb-8 relative">
                                        <div className="flex justify-between items-center absolute w-full top-0">
                                                  <div className="text-right flex items-center gap-2">
                                                            <div className="w-10 h-10 relative">
                                                                      <Image
                                                                                src="/salogos.svg"
                                                                                alt="Ministry Logo"
                                                                                fill
                                                                                className="object-contain"
                                                                      />
                                                            </div>
                                                            <div>
                                                                      <p className="text-[#881337] font-bold text-sm">المملكة العربية السعودية</p>
                                                                      <p className="text-[#881337] text-sm">وزارة التعليم</p>
                                                            </div>
                                                  </div>
                                                  <div className="text-left">
                                                            <p className="text-[#881337] font-bold text-sm">{formData.date}</p>
                                                  </div>
                                        </div>

                                        {formData.schoolLogo && (
                                                  <div className="w-24 h-24 mx-auto mb-4 relative">
                                                            <Image src={formData.schoolLogo} alt="Logo" fill className="object-contain" />
                                                  </div>
                                        )}
                                        <h1 className="text-4xl font-bold text-[#881337] mb-2 tracking-wide">{formData.schoolName}</h1>
                                        <div className="w-32 h-1 bg-[#881337] mx-auto mb-2"></div>
                                        <h2 className="text-2xl font-semibold text-slate-800 italic">{formData.title}</h2>
                              </div>

                              {/* Main Content */}
                              <div className="grid grid-cols-2 gap-8 relative z-10">
                                        {/* Left Column */}
                                        <div className="space-y-6">
                                                  {/* Abstract / Description */}
                                                  <div className="bg-white p-6 border border-[#e5e7eb] shadow-sm">
                                                            <h3 className="text-[#881337] font-bold text-lg border-b border-[#881337] pb-2 mb-3">ملخص التقرير</h3>
                                                            <p className="text-slate-700 leading-loose text-justify font-serif text-lg">
                                                                      {formData.executionSteps}
                                                            </p>
                                                  </div>

                                                  {/* Objectives */}
                                                  <div className="bg-white p-6 border border-[#e5e7eb] shadow-sm">
                                                            <h3 className="text-[#881337] font-bold text-lg border-b border-[#881337] pb-2 mb-3">الأهداف التعليمية</h3>
                                                            <ul className="list-disc list-inside space-y-2 text-slate-700 font-serif text-lg">
                                                                      {formData.objectives?.map((obj, idx) => (
                                                                                <li key={idx}>{obj.isAIEnhanced ? obj.enhanced : obj.original}</li>
                                                                      ))}
                                                            </ul>
                                                  </div>
                                        </div>

                                        {/* Right Column */}
                                        <div className="space-y-6">
                                                  {/* Data Table */}
                                                  <div className="bg-white border border-[#e5e7eb] shadow-sm">
                                                            <table className="w-full text-right">
                                                                      <tbody>
                                                                                <tr className="border-b border-[#e5e7eb]">
                                                                                          <td className="p-3 bg-[#fdf2f8] text-[#881337] font-bold w-1/3">المجال</td>
                                                                                          <td className="p-3 text-slate-700">{formData.domain}</td>
                                                                                </tr>
                                                                                <tr className="border-b border-[#e5e7eb]">
                                                                                          <td className="p-3 bg-[#fdf2f8] text-[#881337] font-bold">المكان</td>
                                                                                          <td className="p-3 text-slate-700">{formData.location}</td>
                                                                                </tr>
                                                                                <tr className="border-b border-[#e5e7eb]">
                                                                                          <td className="p-3 bg-[#fdf2f8] text-[#881337] font-bold">عدد الحضور</td>
                                                                                          <td className="p-3 text-slate-700">{formData.participantsCount}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                          <td className="p-3 bg-[#fdf2f8] text-[#881337] font-bold">الفئة المستهدفة</td>
                                                                                          <td className="p-3 text-slate-700">{formData.targetAudience?.join('، ')}</td>
                                                                                </tr>
                                                                      </tbody>
                                                            </table>
                                                  </div>

                                                  {/* Photos */}
                                                  <div className="grid grid-cols-2 gap-4">
                                                            {formData.photos && formData.photos.length > 0 ? (
                                                                      formData.photos.slice(0, 4).map((photo, idx) => (
                                                                                <div key={idx} className="border-4 border-white shadow-md transform rotate-1 hover:rotate-0 transition-transform duration-300 bg-white p-1">
                                                                                          <div className="aspect-[4/3] relative">
                                                                                                    <Image src={photo} alt="Event" fill className="object-cover sepia-[.3]" />
                                                                                          </div>
                                                                                          <p className="text-center text-xs text-slate-500 mt-1 font-serif italic">شكل {idx + 1}</p>
                                                                                </div>
                                                                      ))
                                                            ) : (
                                                                      [1, 2].map((n) => (
                                                                                <div key={n} className="border-4 border-white shadow-md transform rotate-1 hover:rotate-0 transition-transform duration-300 bg-white p-1">
                                                                                          <div className="aspect-[4/3] relative flex items-center justify-center bg-gray-100">
                                                                                                    <PhotoIcon className="w-10 h-10 text-gray-400" />
                                                                                          </div>
                                                                                          <p className="text-center text-xs text-slate-500 mt-1 font-serif italic">شكل {n}</p>
                                                                                </div>
                                                                      ))
                                                            )}
                                                  </div>
                                        </div>
                              </div>

                              {/* Signatures */}
                              <div className="mt-12 flex justify-around items-center pt-8 border-t-2 border-[#881337]">
                                        <div className="text-center">
                                                  <p className="font-serif text-lg text-slate-800 mb-8">رائد النشاط</p>
                                                  <p className="font-bold text-[#881337] text-xl border-t border-slate-300 pt-2 px-8">{formData.activityLeaderName}</p>
                                        </div>

                                        {/* Seal Placeholder */}
                                        <div className="w-24 h-24 border-4 border-[#881337] rounded-full flex items-center justify-center opacity-20 transform -rotate-12">
                                                  <span className="text-[#881337] font-bold text-xs text-center">ختم<br />المدرسة</span>
                                        </div>

                                        <div className="text-center">
                                                  <p className="font-serif text-lg text-slate-800 mb-8">مدير المدرسة</p>
                                                  <p className="font-bold text-[#881337] text-xl border-t border-slate-300 pt-2 px-8">{formData.principalName}</p>
                                        </div>
                              </div>
                    </div>
          );
}
