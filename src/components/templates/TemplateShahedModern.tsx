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
          ListBulletIcon,
          SparklesIcon
} from "@heroicons/react/24/outline";
import { getAudienceLabel, extractDescription, extractSteps } from "./template-helpers";

interface TemplateProps {
          formData: WizardFormData;
          reportTypeTitle: string;
}

/**
 * TemplateShahedModern - Modern version with glassmorphism and animations
 */
export default function TemplateShahedModern({ formData, reportTypeTitle }: TemplateProps) {
          return (
                    <div
                              className="bg-gradient-to-br from-emerald-50 via-white to-amber-50 template-a4 shadow-2xl overflow-hidden rounded-2xl"
                              style={{ fontFamily: 'Tajawal, sans-serif' }}
                              dir="rtl"
                    >
                              {/* Modern Header with Gradient */}
                              <header className="relative overflow-hidden">
                                        {/* Background Pattern */}
                                        <div className="absolute inset-0 opacity-10">
                                                  <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                                                  <div className="absolute bottom-0 right-0 w-60 h-60 bg-amber-500 rounded-full translate-x-1/3 translate-y-1/3"></div>
                                        </div>

                                        {/* Logo Row */}
                                        <div className="relative flex justify-between items-center px-8 pt-6 pb-4 backdrop-blur-sm">
                                                  {/* Ministry Logo */}
                                                  <div className="flex flex-col items-center group">
                                                            <div className="w-20 h-20 relative p-2 bg-white/80 rounded-2xl shadow-lg backdrop-blur-sm transition-transform group-hover:scale-105">
                                                                      <Image src="/salogos.svg" alt="وزارة التعليم" fill className="object-contain p-2" />
                                                            </div>
                                                            <p className="text-emerald-700 font-bold text-[11px] mt-2">وزارة التعليم</p>
                                                  </div>

                                                  {/* Center Info */}
                                                  <div className="flex-1 text-center px-4">
                                                            <h2 className="text-emerald-800 font-bold text-xl">{formData.schoolName || "اسم المدرسة"}</h2>
                                                            <p className="text-emerald-600/70 text-sm">{formData.educationRegion || "إدارة التعليم"}</p>
                                                  </div>

                                                  {/* School Logo */}
                                                  <div className="flex flex-col items-center group">
                                                            <div className="w-20 h-20 relative p-2 bg-white/80 rounded-2xl shadow-lg backdrop-blur-sm transition-transform group-hover:scale-105 overflow-hidden">
                                                                      {formData.schoolLogo ? (
                                                                                <Image src={formData.schoolLogo} alt="شعار المدرسة" fill className="object-contain p-2" />
                                                                      ) : (
                                                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-amber-100 rounded-xl">
                                                                                          <SparklesIcon className="w-8 h-8 text-emerald-400" />
                                                                                </div>
                                                                      )}
                                                            </div>
                                                  </div>
                                        </div>

                                        {/* Modern Title Banner */}
                                        <div className="relative mx-6 mb-4 rounded-2xl overflow-hidden shadow-xl">
                                                  <div className="absolute inset-0 bg-gradient-to-l from-emerald-600 via-emerald-500 to-teal-500"></div>
                                                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
                                                  <div className="relative py-6 px-8 text-center">
                                                            <h1 className="text-white font-bold text-2xl drop-shadow-lg">{formData.title || "تقرير برنامج"}</h1>
                                                  </div>
                                        </div>
                              </header>

                              {/* Main Content */}
                              <main className="p-6 grid grid-cols-12 gap-5">
                                        {/* Right Sidebar */}
                                        <div className="col-span-4 space-y-4">
                                                  {/* Event Data Card - Glass Style */}
                                                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-white/50 shadow-lg hover:shadow-xl transition-shadow">
                                                            <h3 className="font-bold text-emerald-700 mb-4 text-sm flex items-center gap-2">
                                                                      <span className="w-1.5 h-6 bg-gradient-to-b from-amber-400 to-amber-500 rounded-full"></span>
                                                                      بيانات الفعالية
                                                            </h3>

                                                            <div className="space-y-4">
                                                                      {[
                                                                                { icon: CalendarDaysIcon, label: 'التاريخ', value: formData.date },
                                                                                { icon: MapPinIcon, label: 'المكان', value: formData.location },
                                                                                { icon: UsersIcon, label: 'عدد الحضور', value: formData.participantsCount },
                                                                      ].map((item, idx) => (
                                                                                <div key={idx} className="flex items-start gap-3 group">
                                                                                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                                                                    <item.icon className="w-5 h-5 text-emerald-600" />
                                                                                          </div>
                                                                                          <div>
                                                                                                    <p className="text-[11px] text-gray-500">{item.label}</p>
                                                                                                    <p className="text-sm font-semibold text-gray-800">{item.value || "---"}</p>
                                                                                          </div>
                                                                                </div>
                                                                      ))}
                                                            </div>
                                                  </div>

                                                  {/* Target Audience */}
                                                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-white/50 shadow-lg">
                                                            <h3 className="font-bold text-emerald-700 mb-3 text-sm flex items-center gap-2">
                                                                      <span className="w-1.5 h-6 bg-gradient-to-b from-amber-400 to-amber-500 rounded-full"></span>
                                                                      الفئة المستهدفة
                                                            </h3>
                                                            <div className="flex flex-wrap gap-2">
                                                                      {formData.targetAudience?.map((audience, idx) => (
                                                                                <span
                                                                                          key={idx}
                                                                                          className="px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-full text-xs text-emerald-700 font-medium hover:shadow-md transition-shadow"
                                                                                >
                                                                                          {getAudienceLabel(audience)}
                                                                                </span>
                                                                      )) || <span className="text-gray-400 text-xs">---</span>}
                                                            </div>
                                                  </div>

                                                  {/* Domain Card */}
                                                  {formData.domain && (
                                                            <div className="rounded-2xl p-5 text-white shadow-xl bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all">
                                                                      <p className="text-[11px] opacity-80 mb-1">مجال النشاط</p>
                                                                      <p className="font-bold text-lg">{formData.domain}</p>
                                                            </div>
                                                  )}
                                        </div>

                                        {/* Main Content */}
                                        <div className="col-span-8 space-y-5">
                                                  {/* Description */}
                                                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                                            <div className="px-5 py-3 bg-gradient-to-l from-emerald-500/10 to-transparent border-b border-emerald-100">
                                                                      <h3 className="font-bold text-emerald-700 text-sm flex items-center gap-2">
                                                                                <DocumentTextIcon className="w-5 h-5 text-amber-500" />
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
                                                                                          <h4 className="font-bold text-emerald-600 text-xs flex items-center gap-2 mb-3">
                                                                                                    <ListBulletIcon className="w-4 h-4" />
                                                                                                    خطوات التنفيذ
                                                                                          </h4>
                                                                                          <div className="space-y-2">
                                                                                                    {extractSteps(formData.executionSteps).map((step, idx) => (
                                                                                                              <div key={idx} className="flex gap-2 items-start group">
                                                                                                                        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
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

                                                  {/* Objectives */}
                                                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg overflow-hidden">
                                                            <div className="px-5 py-3 bg-gradient-to-l from-amber-500/10 to-transparent border-b border-amber-100">
                                                                      <h3 className="font-bold text-emerald-700 text-sm flex items-center gap-2">
                                                                                <FlagIcon className="w-5 h-5 text-amber-500" />
                                                                                الأهداف المحققة
                                                                      </h3>
                                                            </div>
                                                            <div className="p-5 space-y-2">
                                                                      {formData.objectives?.map((obj, idx) => (
                                                                                <div key={idx} className="flex gap-3 items-start p-3 rounded-xl bg-gradient-to-l from-amber-50/50 to-transparent border border-amber-100/50 hover:border-amber-200 transition-colors">
                                                                                          <span className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5 shadow-md">
                                                                                                    {idx + 1}
                                                                                          </span>
                                                                                          <p className="text-gray-700 text-sm">{obj.isAIEnhanced ? obj.enhanced : obj.original}</p>
                                                                                </div>
                                                                      )) || <p className="text-gray-400 text-center text-sm py-4">لم يتم إضافة أهداف</p>}
                                                            </div>
                                                  </div>

                                                  {/* Photos */}
                                                  {formData.photos && formData.photos.length > 0 && (
                                                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg overflow-hidden">
                                                                      <div className="px-5 py-3 bg-gradient-to-l from-emerald-500/10 to-transparent border-b border-emerald-100">
                                                                                <h3 className="font-bold text-emerald-700 text-sm flex items-center gap-2">
                                                                                          <CameraIcon className="w-5 h-5 text-emerald-600" />
                                                                                          التوثيق الصوري
                                                                                </h3>
                                                                      </div>
                                                                      <div className="p-5">
                                                                                <div className="grid grid-cols-2 gap-3">
                                                                                          {formData.photos?.slice(0, 2).map((photo, idx) => (
                                                                                                    <div key={idx} className="aspect-video relative rounded-xl overflow-hidden border-2 border-white shadow-lg group">
                                                                                                              <Image src={photo} alt={`صورة ${idx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                                                                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                                                                    </div>
                                                                                          ))}
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  )}
                                        </div>
                              </main>

                              {/* Modern Footer */}
                              <footer className="bg-gradient-to-r from-emerald-50 via-white to-amber-50 border-t border-emerald-100 p-6">
                                        <div className="flex justify-around items-end max-w-2xl mx-auto">
                                                  {[
                                                            { label: 'رائد/ة النشاط', name: formData.activityLeaderName },
                                                            { label: 'مدير/ة المدرسة', name: formData.principalName },
                                                  ].map((person, idx) => (
                                                            <div key={idx} className="text-center group">
                                                                      <p className="text-emerald-600/70 text-sm mb-3">{person.label}</p>
                                                                      <div className="relative">
                                                                                <div className="h-0.5 w-28 bg-gradient-to-r from-transparent via-emerald-300 to-transparent mb-2"></div>
                                                                                <p className="font-bold text-emerald-700 group-hover:text-emerald-600 transition-colors">{person.name || "___________"}</p>
                                                                      </div>
                                                            </div>
                                                  ))}
                                        </div>
                              </footer>
                    </div>
          );
}
