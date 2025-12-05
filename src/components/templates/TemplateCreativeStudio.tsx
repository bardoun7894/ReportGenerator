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
          RocketLaunchIcon,
          BuildingLibraryIcon,
          PhotoIcon
} from "@heroicons/react/24/outline";

interface TemplateProps {
          formData: WizardFormData;
          reportTypeTitle: string;
}

export default function TemplateCreativeStudio({ formData, reportTypeTitle }: TemplateProps) {
          return (
                    <div
                              className="bg-[#0f172a] max-w-4xl mx-auto shadow-2xl relative overflow-hidden text-white"
                              style={{
                                        fontFamily: 'Cairo, sans-serif',
                                        padding: '32px'
                              }}
                              dir="rtl"
                    >
                              {/* Background Gradients */}
                              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                              {/* Glass Header */}
                              <div className="relative z-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-8 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 p-[2px]">
                                                            <div className="w-full h-full bg-[#0f172a] rounded-[10px] flex items-center justify-center overflow-hidden">
                                                                      {formData.schoolLogo ? (
                                                                                <Image src={formData.schoolLogo} alt="Logo" width={48} height={48} className="object-contain" />
                                                                      ) : (
                                                                                <RocketLaunchIcon className="w-8 h-8 text-white" />
                                                                      )}
                                                            </div>
                                                  </div>
                                                  <div>
                                                            <div className="flex items-center gap-2">
                                                                      <div className="w-5 h-5 relative">
                                                                                <Image
                                                                                          src="/salogos.svg"
                                                                                          alt="Ministry Logo"
                                                                                          fill
                                                                                          className="object-contain invert brightness-0"
                                                                                />
                                                                      </div>
                                                                      <p className="text-xs text-slate-400">وزارة التعليم</p>
                                                            </div>
                                                            <h2 className="font-bold text-lg">{formData.schoolName}</h2>
                                                            <p className="text-sm text-slate-400">{formData.educationRegion}</p>
                                                  </div>
                                        </div>
                                        <div className="text-left">
                                                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/20">
                                                            {formData.date}
                                                  </span>
                                        </div>
                              </div>

                              {/* Hero Title */}
                              <div className="relative z-10 text-center mb-12">
                                        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 mb-4">
                                                  {formData.title}
                                        </h1>
                                        <div className="flex justify-center gap-4 text-sm text-slate-400">
                                                  <span className="flex items-center gap-1"><MapPinIcon className="w-4 h-4" /> {formData.location}</span>
                                                  <span className="w-1 h-1 rounded-full bg-slate-600 self-center"></span>
                                                  <span className="flex items-center gap-1"><UsersIcon className="w-4 h-4" /> {formData.participantsCount} مشارك</span>
                                        </div>
                              </div>

                              {/* Masonry Grid */}
                              <div className="relative z-10 grid grid-cols-3 gap-4 mb-8">
                                        {/* Large Photo */}
                                        <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden border border-white/10 relative group bg-white/5">
                                                  {formData.photos?.[0] ? (
                                                            <Image src={formData.photos[0]} alt="Main" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                                  ) : (
                                                            <div className="w-full h-full flex items-center justify-center flex-col gap-2 text-slate-500">
                                                                      <PhotoIcon className="w-12 h-12 opacity-50" />
                                                                      <span className="text-xs">لا توجد صورة</span>
                                                            </div>
                                                  )}
                                                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent opacity-60"></div>
                                                  <div className="absolute bottom-4 right-4">
                                                            <span className="px-2 py-1 bg-black/50 backdrop-blur rounded text-xs">صورة رئيسية</span>
                                                  </div>
                                        </div>

                                        {/* Stats Card */}
                                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center hover:bg-white/10 transition-colors">
                                                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-2 text-purple-400">
                                                            <AcademicCapIcon className="w-6 h-6" />
                                                  </div>
                                                  <p className="text-2xl font-bold text-white">{formData.targetAudience?.length || 0}</p>
                                                  <p className="text-xs text-slate-400">فئات مستهدفة</p>
                                        </div>

                                        {/* Duration Card */}
                                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center hover:bg-white/10 transition-colors">
                                                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-2 text-cyan-400">
                                                            <CalendarDaysIcon className="w-6 h-6" />
                                                  </div>
                                                  <p className="text-lg font-bold text-white">{formData.duration}</p>
                                                  <p className="text-xs text-slate-400">المدة الزمنية</p>
                                        </div>
                              </div>

                              {/* Content Sections */}
                              <div className="relative z-10 grid grid-cols-2 gap-8">
                                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
                                                  <h3 className="text-purple-400 font-bold mb-4 flex items-center gap-2">
                                                            <DocumentTextIcon className="w-5 h-5" />
                                                            تفاصيل الفعالية
                                                  </h3>
                                                  <p className="text-slate-300 leading-relaxed text-sm">
                                                            {formData.executionSteps}
                                                  </p>
                                        </div>

                                        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
                                                  <h3 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                                                            <FlagIcon className="w-5 h-5" />
                                                            أبرز الأهداف
                                                  </h3>
                                                  <ul className="space-y-3">
                                                            {formData.objectives?.map((obj, idx) => (
                                                                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                                                                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></span>
                                                                                <span>{obj.isAIEnhanced ? obj.enhanced : obj.original}</span>
                                                                      </li>
                                                            ))}
                                                  </ul>
                                        </div>
                              </div>

                              {/* Footer */}
                              <div className="relative z-10 mt-12 flex justify-between items-center border-t border-white/10 pt-6">
                                        <div className="flex items-center gap-3">
                                                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                                                            <RocketLaunchIcon className="w-4 h-4 text-white" />
                                                  </div>
                                                  <div>
                                                            <p className="text-xs text-slate-400">تم الإنشاء بواسطة</p>
                                                            <p className="text-sm font-bold">مولد التقارير الذكي</p>
                                                  </div>
                                        </div>
                                        <div className="flex gap-8">
                                                  <div className="text-right">
                                                            <p className="text-xs text-slate-500">مدير المدرسة</p>
                                                            <p className="text-sm font-medium text-slate-200">{formData.principalName}</p>
                                                  </div>
                                                  <div className="text-right">
                                                            <p className="text-xs text-slate-500">رائد النشاط</p>
                                                            <p className="text-sm font-medium text-slate-200">{formData.activityLeaderName}</p>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          );
}
