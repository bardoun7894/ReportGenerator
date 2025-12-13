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
 * TemplateShahedElegant - Premium elegant style with gold borders and serif touches
 */
export default function TemplateShahedElegant({ formData, reportTypeTitle }: TemplateProps) {
          return (
                    <div
                              className="bg-[#FFFEF8] template-a4 shadow-2xl overflow-hidden"
                              style={{ fontFamily: 'Tajawal, sans-serif' }}
                              dir="rtl"
                    >
                              {/* Elegant Header with Gold Border */}
                              <header className="border-b-4 border-[#C8A051]">
                                        {/* Top Decorative Line */}
                                        <div className="h-2 bg-gradient-to-l from-[#C8A051] via-[#E5C76B] to-[#C8A051]"></div>

                                        {/* Logo Row */}
                                        <div className="flex justify-between items-start px-10 pt-8 pb-6">
                                                  {/* Ministry Logo */}
                                                  <div className="flex flex-col items-center">
                                                            <div className="w-24 h-24 relative p-3 border-2 border-[#C8A051] rounded-full bg-white shadow-md">
                                                                      <Image src="/salogos.svg" alt="وزارة التعليم" fill className="object-contain p-1" />
                                                            </div>
                                                            <p className="text-[#006C35] font-bold text-xs mt-2">وزارة التعليم</p>
                                                            <p className="text-[#C8A051] text-[10px]">Ministry of Education</p>
                                                  </div>

                                                  {/* Center Info */}
                                                  <div className="flex-1 text-center px-6">
                                                            <div className="inline-block">
                                                                      <h2 className="text-[#006C35] font-bold text-2xl tracking-wide">{formData.schoolName || "اسم المدرسة"}</h2>
                                                                      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#C8A051] to-transparent mt-1"></div>
                                                            </div>
                                                            <p className="text-[#8B7355] text-sm mt-2">{formData.educationRegion || "إدارة التعليم"}</p>
                                                  </div>

                                                  {/* School Logo */}
                                                  <div className="flex flex-col items-center">
                                                            <div className="w-24 h-24 relative p-3 border-2 border-[#C8A051] rounded-full bg-white shadow-md overflow-hidden">
                                                                      {formData.schoolLogo ? (
                                                                                <Image src={formData.schoolLogo} alt="شعار المدرسة" fill className="object-contain p-1" />
                                                                      ) : (
                                                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#C8A051]/10 to-[#C8A051]/20 rounded-full">
                                                                                          <span className="text-[#C8A051] text-[10px]">شعار المدرسة</span>
                                                                                </div>
                                                                      )}
                                                            </div>
                                                  </div>
                                        </div>

                                        {/* Title Banner - Elegant Style */}
                                        <div className="mx-8 mb-6 relative">
                                                  <div className="absolute inset-0 bg-[#006C35] transform -skew-y-1 rounded-lg shadow-lg"></div>
                                                  <div className="relative py-5 px-10 text-center">
                                                            <div className="absolute top-0 left-6 w-16 h-0.5 bg-[#C8A051]"></div>
                                                            <div className="absolute top-0 right-6 w-16 h-0.5 bg-[#C8A051]"></div>
                                                            <h1 className="text-white font-bold text-2xl tracking-wider">{formData.title || "تقرير برنامج"}</h1>
                                                            <div className="absolute bottom-0 left-6 w-16 h-0.5 bg-[#C8A051]"></div>
                                                            <div className="absolute bottom-0 right-6 w-16 h-0.5 bg-[#C8A051]"></div>
                                                  </div>
                                        </div>
                              </header>

                              {/* Main Content */}
                              <main className="p-8 grid grid-cols-12 gap-8">
                                        {/* Right Sidebar */}
                                        <div className="col-span-4 space-y-5">
                                                  {/* Event Data Card - Elegant */}
                                                  <div className="bg-white rounded-lg p-6 border border-[#C8A051]/30 shadow-md">
                                                            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-[#C8A051]/20">
                                                                      <div className="w-1 h-8 bg-[#C8A051]"></div>
                                                                      <h3 className="font-bold text-[#006C35]">بيانات الفعالية</h3>
                                                            </div>

                                                            <div className="space-y-5">
                                                                      {[
                                                                                { icon: CalendarDaysIcon, label: 'التاريخ', value: formData.date },
                                                                                { icon: MapPinIcon, label: 'المكان', value: formData.location },
                                                                                { icon: UsersIcon, label: 'عدد الحضور', value: formData.participantsCount },
                                                                      ].map((item, idx) => (
                                                                                <div key={idx} className="flex items-start gap-4">
                                                                                          <div className="w-10 h-10 rounded-lg border border-[#C8A051]/30 bg-gradient-to-br from-[#C8A051]/10 to-transparent flex items-center justify-center">
                                                                                                    <item.icon className="w-5 h-5 text-[#C8A051]" />
                                                                                          </div>
                                                                                          <div>
                                                                                                    <p className="text-[11px] text-[#8B7355] uppercase tracking-wide">{item.label}</p>
                                                                                                    <p className="text-sm font-semibold text-gray-800">{item.value || "---"}</p>
                                                                                          </div>
                                                                                </div>
                                                                      ))}
                                                            </div>
                                                  </div>

                                                  {/* Target Audience */}
                                                  <div className="bg-white rounded-lg p-6 border border-[#C8A051]/30 shadow-md">
                                                            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#C8A051]/20">
                                                                      <div className="w-1 h-8 bg-[#C8A051]"></div>
                                                                      <h3 className="font-bold text-[#006C35]">الفئة المستهدفة</h3>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                      {formData.targetAudience?.map((audience, idx) => (
                                                                                <span key={idx} className="px-4 py-1.5 bg-[#C8A051]/10 border border-[#C8A051]/30 rounded text-xs text-[#8B7355] font-medium">
                                                                                          {getAudienceLabel(audience)}
                                                                                </span>
                                                                      )) || <span className="text-[#8B7355] text-xs">---</span>}
                                                            </div>
                                                  </div>

                                                  {/* Domain - Elegant Gold */}
                                                  {formData.domain && (
                                                            <div className="rounded-lg p-6 bg-gradient-to-br from-[#C8A051] to-[#B8944A] text-white shadow-lg">
                                                                      <p className="text-xs opacity-80 mb-1 tracking-wide">مجال النشاط</p>
                                                                      <p className="font-bold text-lg">{formData.domain}</p>
                                                            </div>
                                                  )}
                                        </div>

                                        {/* Main Content */}
                                        <div className="col-span-8 space-y-6">
                                                  {/* Description - Elegant Card */}
                                                  <div className="bg-white rounded-lg border border-[#C8A051]/30 shadow-md overflow-hidden">
                                                            <div className="px-6 py-4 bg-gradient-to-l from-[#006C35] to-[#007A3D] flex items-center gap-3">
                                                                      <DocumentTextIcon className="w-6 h-6 text-[#C8A051]" />
                                                                      <h3 className="font-bold text-white tracking-wide">وصف البرنامج</h3>
                                                            </div>
                                                            <div className="p-6">
                                                                      {extractDescription(formData.executionSteps) && (
                                                                                <p className="text-gray-700 leading-loose text-sm text-justify first-letter:text-3xl first-letter:font-bold first-letter:text-[#006C35] first-letter:float-right first-letter:ml-2">
                                                                                          {extractDescription(formData.executionSteps)}
                                                                                </p>
                                                                      )}

                                                                      {extractSteps(formData.executionSteps).length > 0 && (
                                                                                <div className="mt-6 pt-6 border-t border-[#C8A051]/20">
                                                                                          <h4 className="font-bold text-[#006C35] text-sm flex items-center gap-2 mb-4">
                                                                                                    <ListBulletIcon className="w-5 h-5 text-[#C8A051]" />
                                                                                                    خطوات التنفيذ
                                                                                          </h4>
                                                                                          <div className="space-y-3">
                                                                                                    {extractSteps(formData.executionSteps).map((step, idx) => (
                                                                                                              <div key={idx} className="flex gap-3 items-start">
                                                                                                                        <span className="w-7 h-7 rounded border-2 border-[#006C35] bg-[#006C35] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                                                                                                  {idx + 1}
                                                                                                                        </span>
                                                                                                                        <p className="text-gray-700 text-sm leading-relaxed pt-1">{step}</p>
                                                                                                              </div>
                                                                                                    ))}
                                                                                          </div>
                                                                                </div>
                                                                      )}
                                                            </div>
                                                  </div>

                                                  {/* Objectives - Elegant */}
                                                  <div className="bg-white rounded-lg border border-[#C8A051]/30 shadow-md overflow-hidden">
                                                            <div className="px-6 py-4 bg-gradient-to-l from-[#C8A051] to-[#D4AF61] flex items-center gap-3">
                                                                      <FlagIcon className="w-6 h-6 text-white" />
                                                                      <h3 className="font-bold text-white tracking-wide">الأهداف المحققة</h3>
                                                            </div>
                                                            <div className="p-6 space-y-3">
                                                                      {formData.objectives?.map((obj, idx) => (
                                                                                <div key={idx} className="flex gap-4 items-start p-4 rounded-lg bg-[#FFFEF8] border border-[#C8A051]/20">
                                                                                          <span className="w-8 h-8 rounded-full border-2 border-[#006C35] bg-[#006C35] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                                                                                                    {idx + 1}
                                                                                          </span>
                                                                                          <p className="text-gray-700 text-sm pt-1.5">{obj.isAIEnhanced ? obj.enhanced : obj.original}</p>
                                                                                </div>
                                                                      )) || <p className="text-[#8B7355] text-center text-sm py-4">لم يتم إضافة أهداف</p>}
                                                            </div>
                                                  </div>

                                                  {/* Photos - Elegant Frames */}
                                                  {formData.photos && formData.photos.length > 0 && (
                                                            <div className="bg-white rounded-lg border border-[#C8A051]/30 shadow-md overflow-hidden">
                                                                      <div className="px-6 py-4 bg-gradient-to-l from-[#006C35] to-[#007A3D] flex items-center gap-3">
                                                                                <CameraIcon className="w-6 h-6 text-[#C8A051]" />
                                                                                <h3 className="font-bold text-white tracking-wide">التوثيق الصوري</h3>
                                                                      </div>
                                                                      <div className="p-6">
                                                                                <div className="grid grid-cols-2 gap-4">
                                                                                          {formData.photos?.slice(0, 2).map((photo, idx) => (
                                                                                                    <div key={idx} className="relative">
                                                                                                              <div className="aspect-video relative rounded overflow-hidden border-4 border-[#C8A051]/30 shadow-md">
                                                                                                                        <Image src={photo} alt={`صورة ${idx + 1}`} fill className="object-cover" />
                                                                                                              </div>
                                                                                                              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#C8A051] text-white text-xs px-3 py-0.5 rounded">
                                                                                                                        صورة {idx + 1}
                                                                                                              </div>
                                                                                                    </div>
                                                                                          ))}
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  )}
                                        </div>
                              </main>

                              {/* Elegant Footer */}
                              <footer className="border-t-4 border-[#C8A051] bg-gradient-to-b from-[#FFFEF8] to-white p-8">
                                        <div className="flex justify-around items-center max-w-3xl mx-auto">
                                                  {[
                                                            { label: 'رائد/ة النشاط', name: formData.activityLeaderName },
                                                            { label: 'مدير/ة المدرسة', name: formData.principalName },
                                                  ].map((person, idx) => (
                                                            <div key={idx} className="text-center">
                                                                      <p className="text-[#8B7355] text-sm mb-4 tracking-wide">{person.label}</p>
                                                                      <div className="relative">
                                                                                <div className="absolute -top-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A051] to-transparent"></div>
                                                                                <p className="font-bold text-[#006C35] text-lg pt-2">{person.name || "___________"}</p>
                                                                                <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A051] to-transparent"></div>
                                                                      </div>
                                                            </div>
                                                  ))}
                                        </div>
                                        {/* Bottom Decorative Line */}
                                        <div className="h-1 bg-gradient-to-l from-[#C8A051] via-[#E5C76B] to-[#C8A051] mt-6 -mb-8 -mx-8"></div>
                              </footer>
                    </div>
          );
}
