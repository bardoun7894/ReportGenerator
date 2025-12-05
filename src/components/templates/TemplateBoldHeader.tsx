"use client";

import { WizardFormData } from "@/stores/wizard-store";
import Image from "next/image";
import {
          MapPinIcon,
          UserIcon,
          BuildingLibraryIcon
} from "@heroicons/react/24/outline";

interface TemplateProps {
          formData: WizardFormData;
          reportTypeTitle: string;
}

export default function TemplateBoldHeader({ formData, reportTypeTitle }: TemplateProps) {
          return (
                    <div
                              className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto"
                              style={{ fontFamily: 'Cairo, Tajawal, sans-serif' }}
                              dir="rtl"
                    >
                              {/* Hero Header */}
                              <div className="relative bg-gradient-to-br from-[#7C3AED] via-[#A78BFA] to-[#7C3AED] p-10 pb-16 overflow-hidden">
                                        {/* Decorative Elements */}
                                        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/4 translate-y-1/4"></div>

                                        {/* Top Bar */}
                                        <div className="flex justify-between items-center mb-8 relative z-10">
                                                  <div className="flex items-center gap-3">
                                                            {formData.schoolLogo && (
                                                                      <div className="w-14 h-14 bg-white rounded-xl overflow-hidden relative">
                                                                                <Image
                                                                                          src={formData.schoolLogo}
                                                                                          alt="الشعار"
                                                                                          fill
                                                                                          className="object-contain p-1"
                                                                                />
                                                                      </div>
                                                            )}
                                                            <div className="text-white">
                                                                      <p className="text-sm opacity-80">{formData.educationRegion || 'وزارة التعليم'}</p>
                                                                      <p className="font-bold">{formData.schoolName || 'اسم المدرسة'}</p>
                                                            </div>
                                                  </div>

                                                  {/* Ministry Logo Top Left */}
                                                  <div className="w-16 h-16 relative opacity-80">
                                                            <Image
                                                                      src="/salogos.svg"
                                                                      alt="Ministry Logo"
                                                                      fill
                                                                      className="object-contain invert brightness-0"
                                                            />
                                                  </div>
                                        </div>

                                        {/* Title */}
                                        <div className="relative z-10">
                                                  <h1 className="text-4xl md:text-5xl font-black text-white text-center leading-tight mb-4">
                                                            {formData.title || 'عنوان الفعالية'}
                                                  </h1>
                                                  {formData.domain && (
                                                            <div className="flex justify-center">
                                                                      <span className="px-5 py-2 bg-[#F59E0B] text-white rounded-full font-bold text-sm">
                                                                                {formData.domain}
                                                                      </span>
                                                            </div>
                                                  )}
                                                  <div className="text-center mt-4">
                                                            <p className="text-white/80 text-sm">{formData.date || '---'}</p>
                                                  </div>
                                        </div>
                              </div>

                              {/* Stats Circles */}
                              <div className="relative -mt-8 z-20 px-6">
                                        <div className="flex justify-center gap-6 flex-wrap">
                                                  {formData.participantsCount && (
                                                            <div className="w-24 h-24 bg-white rounded-full shadow-lg flex flex-col items-center justify-center border-4 border-[#10B981]">
                                                                      <span className="text-2xl font-black text-[#10B981]">{formData.participantsCount}</span>
                                                                      <span className="text-xs text-slate-500">مشارك</span>
                                                            </div>
                                                  )}
                                                  {formData.duration && (
                                                            <div className="w-24 h-24 bg-white rounded-full shadow-lg flex flex-col items-center justify-center border-4 border-[#3B82F6]">
                                                                      <span className="text-lg font-black text-[#3B82F6]">{formData.duration}</span>
                                                                      <span className="text-xs text-slate-500">المدة</span>
                                                            </div>
                                                  )}
                                                  {formData.targetAudience && formData.targetAudience.length > 0 && (
                                                            <div className="w-24 h-24 bg-white rounded-full shadow-lg flex flex-col items-center justify-center border-4 border-[#F59E0B]">
                                                                      <span className="text-2xl font-black text-[#F59E0B]">{formData.targetAudience.length}</span>
                                                                      <span className="text-xs text-slate-500">فئات</span>
                                                            </div>
                                                  )}
                                        </div>
                              </div>

                              {/* Content */}
                              <div className="p-6 pt-8">
                                        {/* Compact Data List */}
                                        <div className="bg-[#F5F3FF] rounded-2xl p-6 mb-6">
                                                  <div className="grid grid-cols-2 gap-4">
                                                            {formData.location && (
                                                                      <div className="flex items-center gap-3">
                                                                                <MapPinIcon className="w-6 h-6 text-[#7C3AED]" />
                                                                                <div>
                                                                                          <p className="text-xs text-[#7C3AED]">المكان</p>
                                                                                          <p className="text-slate-800 font-medium">{formData.location}</p>
                                                                                </div>
                                                                      </div>
                                                            )}
                                                            {formData.executors && (
                                                                      <div className="flex items-center gap-3">
                                                                                <UserIcon className="w-6 h-6 text-[#7C3AED]" />
                                                                                <div>
                                                                                          <p className="text-xs text-[#7C3AED]">المنفذ</p>
                                                                                          <p className="text-slate-800 font-medium">{formData.executors}</p>
                                                                                </div>
                                                                      </div>
                                                            )}
                                                  </div>

                                                  {formData.targetAudience && formData.targetAudience.length > 0 && (
                                                            <div className="mt-4 pt-4 border-t border-[#7C3AED]/20">
                                                                      <p className="text-xs text-[#7C3AED] mb-2">الفئة المستهدفة</p>
                                                                      <div className="flex flex-wrap gap-2">
                                                                                {formData.targetAudience.map((audience, idx) => (
                                                                                          <span
                                                                                                    key={idx}
                                                                                                    className="px-3 py-1 bg-[#7C3AED]/10 text-[#7C3AED] rounded-full text-sm font-medium"
                                                                                          >
                                                                                                    {audience}
                                                                                          </span>
                                                                                ))}
                                                                      </div>
                                                            </div>
                                                  )}
                                        </div>

                                        {/* Description */}
                                        {formData.executionSteps && (
                                                  <div className="bg-slate-50 rounded-xl p-5 mb-6">
                                                            <h3 className="text-[#7C3AED] font-bold mb-3">وصف الفعالية</h3>
                                                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{formData.executionSteps}</p>
                                                  </div>
                                        )}

                                        {/* Goals as Numbered Timeline */}
                                        {formData.objectives && formData.objectives.length > 0 && (
                                                  <div className="mb-6">
                                                            <h3 className="text-[#7C3AED] font-bold mb-4 text-center">الأهداف</h3>
                                                            <div className="relative">
                                                                      {/* Timeline Line */}
                                                                      <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#7C3AED] to-[#F59E0B]"></div>

                                                                      <div className="space-y-4">
                                                                                {formData.objectives.map((obj, idx) => (
                                                                                          <div key={idx} className="flex items-start gap-4 pr-2">
                                                                                                    <div className="w-8 h-8 bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg z-10">
                                                                                                              {idx + 1}
                                                                                                    </div>
                                                                                                    <div className="bg-white rounded-xl p-4 shadow-sm border border-[#7C3AED]/10 flex-1">
                                                                                                              <p className="text-slate-700">{obj.isAIEnhanced ? obj.enhanced : obj.original}</p>
                                                                                                    </div>
                                                                                          </div>
                                                                                ))}
                                                                      </div>
                                                            </div>
                                                  </div>
                                        )}

                                        {/* Photo Carousel */}
                                        {formData.photos && formData.photos.length > 0 && (
                                                  <div className="mb-6">
                                                            <h3 className="text-[#7C3AED] font-bold mb-4 text-center">صور الفعالية</h3>
                                                            <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
                                                                      {formData.photos.map((photo, idx) => (
                                                                                <div
                                                                                          key={idx}
                                                                                          className="flex-shrink-0 w-72 rounded-2xl overflow-hidden shadow-lg snap-center relative aspect-video"
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
                                        )}
                              </div>

                              {/* Footer */}
                              <div className="bg-gradient-to-l from-[#7C3AED] to-[#A78BFA] p-6">
                                        <div className="flex justify-center gap-12">
                                                  {formData.activityLeaderName && (
                                                            <div className="text-center">
                                                                      <p className="text-white/70 text-sm mb-2">رائد النشاط</p>
                                                                      <p className="text-white font-bold text-lg">{formData.activityLeaderName}</p>
                                                            </div>
                                                  )}
                                                  {formData.principalName && (
                                                            <div className="text-center">
                                                                      <p className="text-white/70 text-sm mb-2">مدير المدرسة</p>
                                                                      <p className="text-white font-bold text-lg">{formData.principalName}</p>
                                                            </div>
                                                  )}
                                        </div>
                              </div>
                    </div>
          );
}
