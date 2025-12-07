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
 * TemplateShahedDark - Dark mode version with green accents
 */
export default function TemplateShahedDark({ formData, reportTypeTitle }: TemplateProps) {
          return (
                    <div
                              className="bg-slate-900 max-w-4xl mx-auto shadow-2xl overflow-hidden rounded-xl"
                              style={{ fontFamily: 'Tajawal, sans-serif' }}
                              dir="rtl"
                    >
                              {/* Dark Header */}
                              <header className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 to-transparent"></div>

                                        {/* Logo Row */}
                                        <div className="relative flex justify-between items-center px-8 pt-6 pb-4">
                                                  <div className="flex flex-col items-center">
                                                            <div className="w-20 h-20 relative bg-white/10 rounded-xl p-2">
                                                                      <Image src="/salogos.svg" alt="وزارة التعليم" fill className="object-contain invert brightness-200" />
                                                            </div>
                                                            <p className="text-emerald-400 font-bold text-[11px] mt-2">وزارة التعليم</p>
                                                  </div>

                                                  <div className="flex-1 text-center px-4">
                                                            <h2 className="text-white font-bold text-xl">{formData.schoolName || "اسم المدرسة"}</h2>
                                                            <p className="text-slate-400 text-sm">{formData.educationRegion || "إدارة التعليم"}</p>
                                                  </div>

                                                  <div className="flex flex-col items-center">
                                                            <div className="w-20 h-20 relative bg-white/10 rounded-xl overflow-hidden">
                                                                      {formData.schoolLogo ? (
                                                                                <Image src={formData.schoolLogo} alt="شعار المدرسة" fill className="object-contain p-2" />
                                                                      ) : (
                                                                                <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">شعار</div>
                                                                      )}
                                                            </div>
                                                  </div>
                                        </div>

                                        {/* Title Banner */}
                                        <div className="mx-6 mb-4 rounded-xl overflow-hidden bg-gradient-to-l from-emerald-600 to-emerald-500 shadow-lg shadow-emerald-500/20">
                                                  <div className="py-5 px-8 text-center">
                                                            <h1 className="text-white font-bold text-2xl">{formData.title || "تقرير برنامج"}</h1>
                                                  </div>
                                        </div>
                              </header>

                              {/* Main Content */}
                              <main className="p-6 grid grid-cols-12 gap-5">
                                        {/* Right Sidebar */}
                                        <div className="col-span-4 space-y-4">
                                                  {/* Event Data Card */}
                                                  <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700">
                                                            <h3 className="font-bold text-emerald-400 mb-4 text-sm flex items-center gap-2">
                                                                      <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
                                                                      بيانات الفعالية
                                                            </h3>

                                                            <div className="space-y-4">
                                                                      {[
                                                                                { icon: CalendarDaysIcon, label: 'التاريخ', value: formData.date },
                                                                                { icon: MapPinIcon, label: 'المكان', value: formData.location },
                                                                                { icon: UsersIcon, label: 'عدد الحضور', value: formData.participantsCount },
                                                                      ].map((item, idx) => (
                                                                                <div key={idx} className="flex items-start gap-3">
                                                                                          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                                                                                    <item.icon className="w-5 h-5 text-emerald-400" />
                                                                                          </div>
                                                                                          <div>
                                                                                                    <p className="text-[11px] text-slate-500">{item.label}</p>
                                                                                                    <p className="text-sm font-semibold text-slate-200">{item.value || "---"}</p>
                                                                                          </div>
                                                                                </div>
                                                                      ))}
                                                            </div>
                                                  </div>

                                                  {/* Target Audience */}
                                                  <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700">
                                                            <h3 className="font-bold text-emerald-400 mb-3 text-sm flex items-center gap-2">
                                                                      <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
                                                                      الفئة المستهدفة
                                                            </h3>
                                                            <div className="flex flex-wrap gap-2">
                                                                      {formData.targetAudience?.map((audience, idx) => (
                                                                                <span key={idx} className="px-3 py-1.5 bg-slate-700 border border-slate-600 rounded-full text-xs text-slate-300">
                                                                                          {getAudienceLabel(audience)}
                                                                                </span>
                                                                      )) || <span className="text-slate-500 text-xs">---</span>}
                                                            </div>
                                                  </div>

                                                  {/* Domain */}
                                                  {formData.domain && (
                                                            <div className="rounded-xl p-5 bg-gradient-to-br from-emerald-600 to-emerald-700 shadow-lg">
                                                                      <p className="text-[11px] text-emerald-200 mb-1">مجال النشاط</p>
                                                                      <p className="font-bold text-white text-lg">{formData.domain}</p>
                                                            </div>
                                                  )}
                                        </div>

                                        {/* Main Content */}
                                        <div className="col-span-8 space-y-5">
                                                  {/* Description */}
                                                  <div className="bg-slate-800/80 rounded-xl border border-slate-700 overflow-hidden">
                                                            <div className="px-5 py-3 border-b border-slate-700 bg-slate-800">
                                                                      <h3 className="font-bold text-emerald-400 text-sm flex items-center gap-2">
                                                                                <DocumentTextIcon className="w-5 h-5 text-amber-500" />
                                                                                وصف البرنامج
                                                                      </h3>
                                                            </div>
                                                            <div className="p-5">
                                                                      {extractDescription(formData.executionSteps) && (
                                                                                <p className="text-slate-300 leading-relaxed text-sm">
                                                                                          {extractDescription(formData.executionSteps)}
                                                                                </p>
                                                                      )}

                                                                      {extractSteps(formData.executionSteps).length > 0 && (
                                                                                <div className="mt-4 pt-4 border-t border-slate-700">
                                                                                          <h4 className="font-bold text-emerald-400 text-xs flex items-center gap-2 mb-3">
                                                                                                    <ListBulletIcon className="w-4 h-4" />
                                                                                                    خطوات التنفيذ
                                                                                          </h4>
                                                                                          <div className="space-y-2">
                                                                                                    {extractSteps(formData.executionSteps).map((step, idx) => (
                                                                                                              <div key={idx} className="flex gap-2 items-start">
                                                                                                                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                                                                                                                                  {idx + 1}
                                                                                                                        </span>
                                                                                                                        <p className="text-slate-300 text-sm">{step}</p>
                                                                                                              </div>
                                                                                                    ))}
                                                                                          </div>
                                                                                </div>
                                                                      )}
                                                            </div>
                                                  </div>

                                                  {/* Objectives */}
                                                  <div className="bg-slate-800/80 rounded-xl border border-slate-700 overflow-hidden">
                                                            <div className="px-5 py-3 border-b border-slate-700 bg-slate-800">
                                                                      <h3 className="font-bold text-emerald-400 text-sm flex items-center gap-2">
                                                                                <FlagIcon className="w-5 h-5 text-amber-500" />
                                                                                الأهداف المحققة
                                                                      </h3>
                                                            </div>
                                                            <div className="p-5 space-y-2">
                                                                      {formData.objectives?.map((obj, idx) => (
                                                                                <div key={idx} className="flex gap-3 items-start p-3 rounded-lg bg-slate-700/50 border border-slate-600">
                                                                                          <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                                                                                                    {idx + 1}
                                                                                          </span>
                                                                                          <p className="text-slate-300 text-sm">{obj.isAIEnhanced ? obj.enhanced : obj.original}</p>
                                                                                </div>
                                                                      )) || <p className="text-slate-500 text-center text-sm py-4">لم يتم إضافة أهداف</p>}
                                                            </div>
                                                  </div>

                                                  {/* Photos */}
                                                  {formData.photos && formData.photos.length > 0 && (
                                                            <div className="bg-slate-800/80 rounded-xl border border-slate-700 overflow-hidden">
                                                                      <div className="px-5 py-3 border-b border-slate-700 bg-slate-800">
                                                                                <h3 className="font-bold text-emerald-400 text-sm flex items-center gap-2">
                                                                                          <CameraIcon className="w-5 h-5 text-emerald-500" />
                                                                                          التوثيق الصوري
                                                                                </h3>
                                                                      </div>
                                                                      <div className="p-5">
                                                                                <div className="grid grid-cols-2 gap-3">
                                                                                          {formData.photos?.slice(0, 2).map((photo, idx) => (
                                                                                                    <div key={idx} className="aspect-video relative rounded-lg overflow-hidden border border-slate-600">
                                                                                                              <Image src={photo} alt={`صورة ${idx + 1}`} fill className="object-cover" />
                                                                                                    </div>
                                                                                          ))}
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  )}
                                        </div>
                              </main>

                              {/* Dark Footer */}
                              <footer className="bg-slate-800 border-t border-slate-700 p-6">
                                        <div className="flex justify-around items-end max-w-2xl mx-auto">
                                                  {[
                                                            { label: 'رائد النشاط', name: formData.activityLeaderName },
                                                            { label: 'مدير المدرسة', name: formData.principalName },
                                                  ].map((person, idx) => (
                                                            <div key={idx} className="text-center">
                                                                      <p className="text-slate-500 text-sm mb-3">{person.label}</p>
                                                                      <div className="border-b-2 border-emerald-500 pb-1">
                                                                                <p className="font-bold text-emerald-400">{person.name || "___________"}</p>
                                                                      </div>
                                                            </div>
                                                  ))}
                                        </div>
                              </footer>
                    </div>
          );
}
