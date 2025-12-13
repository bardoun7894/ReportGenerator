"use client";

import { WizardFormData } from "@/stores/wizard-store";
import Image from "next/image";
import {
          CalendarDaysIcon,
          MapPinIcon,
          UsersIcon,
          DocumentTextIcon,
          FlagIcon,
          CameraIcon
} from "@heroicons/react/24/outline";
import { getAudienceLabel, extractDescription, extractSteps } from "./template-helpers";

interface TemplateProps {
          formData: WizardFormData;
          reportTypeTitle: string;
}

/**
 * TemplateShahedCompact - Single column compact layout for simpler reports
 */
export default function TemplateShahedCompact({ formData, reportTypeTitle }: TemplateProps) {
          return (
                    <div
                              className="bg-white max-w-2xl mx-auto shadow-xl overflow-hidden rounded-lg"
                              style={{ fontFamily: 'Tajawal, sans-serif' }}
                              dir="rtl"
                    >
                              {/* Compact Header */}
                              <header className="bg-[#006C35] text-white p-4">
                                        <div className="flex items-center gap-4">
                                                  <div className="w-12 h-12 relative bg-white/10 rounded-lg p-1">
                                                            <Image src="/salogos.svg" alt="وزارة التعليم" fill className="object-contain" />
                                                  </div>
                                                  <div className="flex-1">
                                                            <h1 className="font-bold text-lg">{formData.title || "تقرير برنامج"}</h1>
                                                            <p className="text-white/80 text-sm">{formData.schoolName || "اسم المدرسة"}</p>
                                                  </div>
                                                  {formData.schoolLogo && (
                                                            <div className="w-12 h-12 relative bg-white/10 rounded-lg overflow-hidden">
                                                                      <Image src={formData.schoolLogo} alt="شعار المدرسة" fill className="object-contain p-1" />
                                                            </div>
                                                  )}
                                        </div>
                              </header>

                              {/* Main Content - Single Column */}
                              <main className="p-5 space-y-4">
                                        {/* Quick Info Bar */}
                                        <div className="flex flex-wrap gap-4 p-3 bg-gray-50 rounded-lg text-sm">
                                                  <div className="flex items-center gap-2">
                                                            <CalendarDaysIcon className="w-4 h-4 text-[#C8A051]" />
                                                            <span className="text-gray-700">{formData.date || "---"}</span>
                                                  </div>
                                                  <div className="flex items-center gap-2">
                                                            <MapPinIcon className="w-4 h-4 text-[#C8A051]" />
                                                            <span className="text-gray-700">{formData.location || "---"}</span>
                                                  </div>
                                                  <div className="flex items-center gap-2">
                                                            <UsersIcon className="w-4 h-4 text-[#C8A051]" />
                                                            <span className="text-gray-700">{formData.participantsCount || "---"} مشارك</span>
                                                  </div>
                                        </div>

                                        {/* Target Audience Tags */}
                                        {formData.targetAudience && formData.targetAudience.length > 0 && (
                                                  <div className="flex flex-wrap gap-2">
                                                            {formData.targetAudience.map((audience, idx) => (
                                                                      <span key={idx} className="px-2 py-1 bg-[#006C35]/10 text-[#006C35] rounded text-xs font-medium">
                                                                                {getAudienceLabel(audience)}
                                                                      </span>
                                                            ))}
                                                  </div>
                                        )}

                                        {/* Description */}
                                        {extractDescription(formData.executionSteps) && (
                                                  <div className="border-r-4 border-[#006C35] pr-4">
                                                            <h3 className="font-bold text-[#006C35] text-sm mb-2 flex items-center gap-2">
                                                                      <DocumentTextIcon className="w-4 h-4" />
                                                                      الوصف
                                                            </h3>
                                                            <p className="text-gray-700 text-sm leading-relaxed">
                                                                      {extractDescription(formData.executionSteps)}
                                                            </p>
                                                  </div>
                                        )}

                                        {/* Steps - Horizontal Pills */}
                                        {extractSteps(formData.executionSteps).length > 0 && (
                                                  <div>
                                                            <h3 className="font-bold text-[#006C35] text-sm mb-2">خطوات التنفيذ</h3>
                                                            <div className="flex flex-wrap gap-2">
                                                                      {extractSteps(formData.executionSteps).map((step, idx) => (
                                                                                <div key={idx} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                                                                                          <span className="w-5 h-5 bg-[#006C35] text-white rounded-full text-xs flex items-center justify-center font-bold">
                                                                                                    {idx + 1}
                                                                                          </span>
                                                                                          <span className="text-gray-700 text-sm">{step}</span>
                                                                                </div>
                                                                      ))}
                                                            </div>
                                                  </div>
                                        )}

                                        {/* Objectives - Simple List */}
                                        {formData.objectives && formData.objectives.length > 0 && (
                                                  <div className="border-r-4 border-[#C8A051] pr-4">
                                                            <h3 className="font-bold text-[#006C35] text-sm mb-2 flex items-center gap-2">
                                                                      <FlagIcon className="w-4 h-4" />
                                                                      الأهداف
                                                            </h3>
                                                            <ul className="space-y-1">
                                                                      {formData.objectives.map((obj, idx) => (
                                                                                <li key={idx} className="text-gray-700 text-sm flex items-start gap-2">
                                                                                          <span className="text-[#C8A051] font-bold">•</span>
                                                                                          {obj.isAIEnhanced ? obj.enhanced : obj.original}
                                                                                </li>
                                                                      ))}
                                                            </ul>
                                                  </div>
                                        )}

                                        {/* Photos - Compact Grid */}
                                        {formData.photos && formData.photos.length > 0 && (
                                                  <div className="grid grid-cols-3 gap-2">
                                                            {formData.photos.slice(0, 3).map((photo, idx) => (
                                                                      <div key={idx} className="aspect-square relative rounded overflow-hidden">
                                                                                <Image src={photo} alt={`صورة ${idx + 1}`} fill className="object-cover" />
                                                                      </div>
                                                            ))}
                                                  </div>
                                        )}
                              </main>

                              {/* Compact Footer */}
                              <footer className="bg-gray-50 border-t p-4 flex justify-between text-sm">
                                        <div>
                                                  <span className="text-gray-500">رائد/ة النشاط: </span>
                                                  <span className="font-bold text-[#006C35]">{formData.activityLeaderName || "---"}</span>
                                        </div>
                                        <div>
                                                  <span className="text-gray-500">المدير: </span>
                                                  <span className="font-bold text-[#006C35]">{formData.principalName || "---"}</span>
                                        </div>
                              </footer>
                    </div>
          );
}
