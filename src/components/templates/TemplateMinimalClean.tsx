"use client";

import { WizardFormData } from "@/stores/wizard-store";
import Image from "next/image";

interface TemplateProps {
          formData: WizardFormData;
          reportTypeTitle: string;
}

export default function TemplateMinimalClean({ formData, reportTypeTitle }: TemplateProps) {
          return (
                    <div
                              className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto"
                              style={{ fontFamily: 'Cairo, Tajawal, sans-serif' }}
                              dir="rtl"
                    >
                              {/* Minimal Header */}
                              <div className="p-8 text-center border-b border-slate-100 relative">
                                        {/* Ministry Logo - Absolute Top Right */}
                                        <div className="absolute top-4 right-4 w-12 h-12 opacity-80">
                                                  <Image
                                                            src="/salogos.svg"
                                                            alt="Ministry Logo"
                                                            fill
                                                            className="object-contain"
                                                  />
                                        </div>

                                        {formData.schoolLogo && (
                                                  <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden bg-slate-50 p-2 relative">
                                                            <Image
                                                                      src={formData.schoolLogo}
                                                                      alt="شعار المدرسة"
                                                                      fill
                                                                      className="object-contain p-1"
                                                            />
                                                  </div>
                                        )}
                                        <p className="text-slate-400 text-sm mb-1">وزارة التعليم</p>
                                        {formData.educationRegion && (
                                                  <p className="text-slate-500 text-sm mb-2">{formData.educationRegion}</p>
                                        )}
                                        <h2 className="text-xl font-semibold text-slate-800 mb-1">{formData.schoolName || 'اسم المدرسة'}</h2>
                                        {formData.department && (
                                                  <p className="text-slate-400 text-sm">{formData.department}</p>
                                        )}
                              </div>

                              {/* Title Section */}
                              <div className="px-8 py-10 bg-gradient-to-b from-slate-50 to-white">
                                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 text-center leading-tight">
                                                  {formData.title || 'عنوان التقرير'}
                                        </h1>
                                        {formData.date && (
                                                  <p className="text-center text-slate-400 mt-4 text-sm">{formData.date}</p>
                                        )}
                              </div>

                              {/* Content - Vertical Stack */}
                              <div className="px-8 py-6 space-y-8">
                                        {/* Quick Info */}
                                        <div className="flex flex-wrap justify-center gap-6 text-center">
                                                  {formData.participantsCount && (
                                                            <div>
                                                                      <p className="text-3xl font-bold text-[#10B981]">{formData.participantsCount}</p>
                                                                      <p className="text-slate-400 text-sm">مشارك</p>
                                                            </div>
                                                  )}
                                                  {formData.duration && (
                                                            <div>
                                                                      <p className="text-3xl font-bold text-[#3B82F6]">{formData.duration}</p>
                                                                      <p className="text-slate-400 text-sm">المدة</p>
                                                            </div>
                                                  )}
                                                  {formData.domain && (
                                                            <div>
                                                                      <p className="text-lg font-semibold text-[#7C3AED]">{formData.domain}</p>
                                                                      <p className="text-slate-400 text-sm">المجال</p>
                                                            </div>
                                                  )}
                                        </div>

                                        {/* Divider */}
                                        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                                        {/* Details */}
                                        {formData.location && (
                                                  <div className="text-center">
                                                            <p className="text-slate-400 text-sm mb-1">المكان</p>
                                                            <p className="text-slate-700 font-medium">{formData.location}</p>
                                                  </div>
                                        )}

                                        {formData.targetAudience && formData.targetAudience.length > 0 && (
                                                  <div className="text-center">
                                                            <p className="text-slate-400 text-sm mb-3">الفئة المستهدفة</p>
                                                            <div className="flex flex-wrap justify-center gap-2">
                                                                      {formData.targetAudience.map((audience, idx) => (
                                                                                <span
                                                                                          key={idx}
                                                                                          className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm"
                                                                                >
                                                                                          {audience}
                                                                                </span>
                                                                      ))}
                                                            </div>
                                                  </div>
                                        )}

                                        {/* Execution Steps */}
                                        {formData.executionSteps && (
                                                  <div>
                                                            <p className="text-slate-400 text-sm mb-3 text-center">وصف الفعالية</p>
                                                            <p className="text-slate-600 leading-relaxed text-center whitespace-pre-wrap">
                                                                      {formData.executionSteps}
                                                            </p>
                                                  </div>
                                        )}

                                        {/* Divider */}
                                        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                                        {/* Objectives */}
                                        {formData.objectives && formData.objectives.length > 0 && (
                                                  <div>
                                                            <p className="text-slate-400 text-sm mb-4 text-center">الأهداف</p>
                                                            <div className="space-y-3">
                                                                      {formData.objectives.map((obj, idx) => (
                                                                                <div key={idx} className="flex items-start gap-4">
                                                                                          <span className="w-6 h-6 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center text-sm font-medium flex-shrink-0">
                                                                                                    {idx + 1}
                                                                                          </span>
                                                                                          <p className="text-slate-600 leading-relaxed">
                                                                                                    {obj.isAIEnhanced ? obj.enhanced : obj.original}
                                                                                          </p>
                                                                                </div>
                                                                      ))}
                                                            </div>
                                                  </div>
                                        )}

                                        {/* Single Large Photo or Horizontal Scroll */}
                                        {formData.photos && formData.photos.length > 0 && (
                                                  <div>
                                                            <p className="text-slate-400 text-sm mb-4 text-center">صور الفعالية</p>
                                                            {formData.photos.length === 1 ? (
                                                                      <div className="rounded-2xl overflow-hidden relative aspect-video">
                                                                                <Image
                                                                                          src={formData.photos[0]}
                                                                                          alt="صورة الفعالية"
                                                                                          fill
                                                                                          className="object-cover"
                                                                                />
                                                                      </div>
                                                            ) : (
                                                                      <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
                                                                                {formData.photos.map((photo, idx) => (
                                                                                          <div
                                                                                                    key={idx}
                                                                                                    className="flex-shrink-0 w-64 rounded-xl overflow-hidden snap-center relative aspect-video"
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
                                                            )}
                                                  </div>
                                        )}
                              </div>

                              {/* Minimal Footer */}
                              <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50">
                                        <div className="flex justify-center gap-12">
                                                  {formData.activityLeaderName && (
                                                            <div className="text-center">
                                                                      <p className="text-slate-400 text-xs mb-2">رائد النشاط</p>
                                                                      <p className="text-slate-700 font-medium text-sm">{formData.activityLeaderName}</p>
                                                            </div>
                                                  )}
                                                  {formData.principalName && (
                                                            <div className="text-center">
                                                                      <p className="text-slate-400 text-xs mb-2">مدير المدرسة</p>
                                                                      <p className="text-slate-700 font-medium text-sm">{formData.principalName}</p>
                                                            </div>
                                                  )}
                                        </div>
                              </div>
                    </div>
          );
}
