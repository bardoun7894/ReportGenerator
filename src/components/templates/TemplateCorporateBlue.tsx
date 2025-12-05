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

export default function TemplateCorporateBlue({ formData, reportTypeTitle }: TemplateProps) {
          return (
                    <div
                              className="rounded-none overflow-hidden max-w-4xl mx-auto shadow-2xl bg-white"
                              style={{
                                        fontFamily: 'Cairo, Tajawal, system-ui, sans-serif',
                                        border: '1px solid #e2e8f0'
                              }}
                              dir="rtl"
                    >
                              {/* Top Corporate Bar */}
                              <div className="h-2 w-full bg-[#1e293b]"></div>

                              {/* Header */}
                              <div className="px-8 py-6 border-b border-slate-200">
                                        <div className="flex items-center justify-between">
                                                  <div className="flex items-center gap-5">
                                                            {/* School Logo */}
                                                            {formData.schoolLogo && (
                                                                      <div className="w-16 h-16 relative flex items-center justify-center bg-slate-50 rounded-lg border border-slate-100 overflow-hidden">
                                                                                <Image src={formData.schoolLogo} alt="الشعار" fill className="object-contain p-1" />
                                                                      </div>
                                                            )}

                                                            {/* Ministry Info */}
                                                            <div className="flex flex-col">
                                                                      <div className="flex items-center gap-2 mb-1">
                                                                                <div className="w-8 h-8 relative">
                                                                                          <Image
                                                                                                    src="/salogos.svg"
                                                                                                    alt="Ministry Logo"
                                                                                                    fill
                                                                                                    className="object-contain"
                                                                                          />
                                                                                </div>
                                                                                <div>
                                                                                          <p className="text-xs text-slate-500 uppercase tracking-wider">المملكة العربية السعودية</p>
                                                                                          <p className="text-sm text-slate-600 font-medium">وزارة التعليم</p>
                                                                                </div>
                                                                      </div>
                                                                      <h2 className="text-xl font-bold text-[#1e293b] mt-1">{formData.schoolName || 'اسم المدرسة'}</h2>
                                                            </div>
                                                  </div>

                                                  <div className="text-left">
                                                            <div className="inline-block px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                                                                      <p className="text-xs text-slate-500 mb-1">التاريخ</p>
                                                                      <p className="text-sm font-semibold text-[#1e293b]">{formData.date || '---'}</p>
                                                            </div>
                                                  </div>
                                        </div>
                              </div>

                              {/* Title Section with subtle pattern */}
                              <div className="bg-[#f8fafc] py-8 px-8 border-b border-slate-200 relative overflow-hidden">
                                        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                                        <div className="relative z-10 text-center">
                                                  <span className="inline-block px-3 py-1 bg-[#1e293b] text-white text-xs font-bold uppercase tracking-widest mb-3 rounded-sm">تقرير فعالية</span>
                                                  <h1 className="text-3xl md:text-4xl font-black text-[#1e293b] mb-2">{formData.title || 'عنوان الفعالية'}</h1>
                                                  {formData.domain && <p className="text-slate-500 font-medium">{formData.domain}</p>}
                                        </div>
                              </div>

                              {/* Content Grid */}
                              <div className="grid grid-cols-12 gap-0">
                                        {/* Left Sidebar (Photos) - 35% */}
                                        <div className="col-span-12 md:col-span-4 bg-[#1e293b] p-6 text-white">
                                                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-700 pb-2">التوثيق البصري</h3>
                                                  <div className="space-y-6">
                                                            {formData.photos && formData.photos.length > 0 ? (
                                                                      formData.photos.slice(0, 3).map((photo, idx) => (
                                                                                <div key={idx} className="group">
                                                                                          <div className="aspect-[4/3] relative bg-slate-800 mb-2 overflow-hidden border border-slate-600">
                                                                                                    <Image src={photo} alt={`صورة ${idx + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                                                          </div>
                                                                                          <p className="text-xs text-slate-400">صورة {idx + 1}</p>
                                                                                </div>
                                                                      ))
                                                            ) : (
                                                                      [1, 2, 3].map((n) => (
                                                                                <div key={n} className="aspect-[4/3] bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-600 flex-col gap-2">
                                                                                          <PhotoIcon className="w-8 h-8 text-slate-600" />
                                                                                          <span className="text-xs">لا توجد صورة</span>
                                                                                </div>
                                                                      ))
                                                            )}
                                                  </div>
                                        </div>

                                        {/* Right Content - 65% */}
                                        <div className="col-span-12 md:col-span-8 p-8 bg-white">
                                                  {/* Stats Row */}
                                                  <div className="grid grid-cols-3 gap-6 mb-10">
                                                            <div className="border-l-4 border-[#3b82f6] pl-4">
                                                                      <p className="text-xs text-slate-500 uppercase mb-1">المشاركون</p>
                                                                      <p className="text-3xl font-light text-[#1e293b]">{formData.participantsCount || '-'}</p>
                                                            </div>
                                                            <div className="border-l-4 border-[#3b82f6] pl-4">
                                                                      <p className="text-xs text-slate-500 uppercase mb-1">المدة</p>
                                                                      <p className="text-xl font-medium text-[#1e293b] mt-1">{formData.duration || '-'}</p>
                                                            </div>
                                                            <div className="border-l-4 border-[#3b82f6] pl-4">
                                                                      <p className="text-xs text-slate-500 uppercase mb-1">المكان</p>
                                                                      <p className="text-sm font-medium text-[#1e293b] mt-2 leading-tight">{formData.location || '-'}</p>
                                                            </div>
                                                  </div>

                                                  {/* Description */}
                                                  <div className="mb-10">
                                                            <h3 className="text-lg font-bold text-[#1e293b] mb-4 flex items-center gap-2">
                                                                      <DocumentTextIcon className="w-5 h-5 text-[#3b82f6]" />
                                                                      ملخص التنفيذ
                                                            </h3>
                                                            <p className="text-slate-600 leading-relaxed text-justify border-r-2 border-slate-100 pr-4">
                                                                      {formData.executionSteps || 'لا يوجد وصف متاح للفعالية.'}
                                                            </p>
                                                  </div>

                                                  {/* Goals */}
                                                  <div className="mb-10">
                                                            <h3 className="text-lg font-bold text-[#1e293b] mb-4 flex items-center gap-2">
                                                                      <FlagIcon className="w-5 h-5 text-[#3b82f6]" />
                                                                      الأهداف المحققة
                                                            </h3>
                                                            <div className="grid grid-cols-1 gap-3">
                                                                      {formData.objectives && formData.objectives.map((obj, idx) => (
                                                                                <div key={idx} className="flex items-start gap-3 bg-slate-50 p-3 rounded-r-lg border-r-4 border-[#1e293b]">
                                                                                          <span className="font-bold text-[#3b82f6] text-sm mt-0.5">{String(idx + 1).padStart(2, '0')}</span>
                                                                                          <p className="text-sm text-slate-700">{obj.isAIEnhanced ? obj.enhanced : obj.original}</p>
                                                                                </div>
                                                                      ))}
                                                            </div>
                                                  </div>

                                                  {/* Target Audience Tags */}
                                                  {formData.targetAudience && formData.targetAudience.length > 0 && (
                                                            <div className="mb-8">
                                                                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">الفئة المستهدفة</h3>
                                                                      <div className="flex flex-wrap gap-2">
                                                                                {formData.targetAudience.map((a, i) => (
                                                                                          <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-sm border border-slate-200">
                                                                                                    {a}
                                                                                          </span>
                                                                                ))}
                                                                      </div>
                                                            </div>
                                                  )}

                                                  {/* Signatures */}
                                                  <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-end">
                                                            <div className="text-center">
                                                                      <p className="text-xs text-slate-400 mb-4">رائد النشاط</p>
                                                                      <p className="text-sm font-bold text-[#1e293b]">{formData.activityLeaderName}</p>
                                                            </div>
                                                            <div className="text-center">
                                                                      <p className="text-xs text-slate-400 mb-4">مدير المدرسة</p>
                                                                      <p className="text-sm font-bold text-[#1e293b]">{formData.principalName}</p>
                                                            </div>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          );
}
