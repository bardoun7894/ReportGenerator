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
          PhotoIcon,
          BuildingLibraryIcon
} from "@heroicons/react/24/outline";

interface TemplateProps {
          formData: WizardFormData;
          reportTypeTitle: string;
}

export default function TemplateNavyExecutive({ formData, reportTypeTitle }: TemplateProps) {
          const colors = {
                    primary: '#1A2744',
                    secondary: '#2563EB',
                    accent: '#F59E0B',
                    light: '#F8FAFC',
                    cardBg: '#FFFFFF'
          };

          return (
                    <div
                              className="rounded-3xl overflow-hidden max-w-4xl mx-auto shadow-2xl"
                              style={{
                                        fontFamily: 'Cairo, Tajawal, system-ui, sans-serif',
                                        backgroundColor: colors.primary,
                                        padding: '32px'
                              }}
                              dir="rtl"
                    >
                              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: colors.light }}>
                                        {/* Header */}
                                        <div style={{ backgroundColor: colors.primary, padding: '24px 32px' }}>
                                                  <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-4">
                                                                      <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white/15 relative">
                                                                                <Image
                                                                                          src="/salogos.svg"
                                                                                          alt="Ministry Logo"
                                                                                          fill
                                                                                          className="object-contain p-2 invert brightness-0"
                                                                                />
                                                                      </div>
                                                                      <div className="text-white">
                                                                                <p className="font-medium text-sm opacity-90">وزارة التعليم</p>
                                                                                {formData.educationRegion && <p className="text-sm opacity-80">{formData.educationRegion}</p>}
                                                                                <p className="font-semibold">{formData.schoolName || 'اسم المدرسة'}</p>
                                                                      </div>
                                                            </div>

                                                            {/* School Logo */}
                                                            <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center relative overflow-hidden">
                                                                      {formData.schoolLogo ? (
                                                                                <Image
                                                                                          src={formData.schoolLogo}
                                                                                          alt="الشعار"
                                                                                          fill
                                                                                          className="object-contain p-1"
                                                                                />
                                                                      ) : (
                                                                                <BuildingLibraryIcon className="w-8 h-8 text-white/80" />
                                                                      )}
                                                            </div>
                                                  </div>
                                        </div>

                                        {/* Title Bar */}
                                        <div className="mx-6 -mt-4 relative z-10 rounded-xl text-center py-4 px-6" style={{ backgroundColor: colors.secondary }}>
                                                  <h1 className="text-xl md:text-2xl font-bold text-white">{formData.title || 'عنوان الفعالية'}</h1>
                                        </div>

                                        {/* Body */}
                                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ gridTemplateColumns: '55% 45%' }}>
                                                  {/* Info Cards */}
                                                  <div className="space-y-4">
                                                            <div className="bg-white rounded-2xl p-4 shadow-sm border-r-4" style={{ borderColor: colors.secondary }}>
                                                                      <div className="flex items-center gap-3 mb-2">
                                                                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#DBEAFE' }}>
                                                                                          <CalendarDaysIcon className="w-4 h-4" style={{ color: colors.secondary }} />
                                                                                </div>
                                                                                <span className="text-sm font-semibold" style={{ color: colors.primary }}>اليوم والتاريخ</span>
                                                                      </div>
                                                                      <p className="text-slate-600 pr-11">{formData.date || '---'}</p>
                                                            </div>

                                                            {formData.location && (
                                                                      <div className="bg-white rounded-2xl p-4 shadow-sm border-r-4" style={{ borderColor: colors.accent }}>
                                                                                <div className="flex items-center gap-3 mb-2">
                                                                                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FEF3C7' }}>
                                                                                                    <MapPinIcon className="w-4 h-4" style={{ color: colors.accent }} />
                                                                                          </div>
                                                                                          <span className="text-sm font-semibold" style={{ color: colors.primary }}>مكان التنفيذ</span>
                                                                                </div>
                                                                                <p className="text-slate-600 pr-11">{formData.location}</p>
                                                                      </div>
                                                            )}

                                                            {formData.participantsCount && (
                                                                      <div className="bg-white rounded-2xl p-4 shadow-sm border-r-4" style={{ borderColor: colors.secondary }}>
                                                                                <div className="flex items-center gap-3 mb-2">
                                                                                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#DBEAFE' }}>
                                                                                                    <UsersIcon className="w-4 h-4" style={{ color: colors.secondary }} />
                                                                                          </div>
                                                                                          <span className="text-sm font-semibold" style={{ color: colors.primary }}>عدد المشاركين</span>
                                                                                </div>
                                                                                <p className="text-slate-600 pr-11 text-2xl font-bold" style={{ color: colors.secondary }}>{formData.participantsCount}</p>
                                                                      </div>
                                                            )}

                                                            {formData.targetAudience && formData.targetAudience.length > 0 && (
                                                                      <div className="bg-white rounded-2xl p-4 shadow-sm">
                                                                                <div className="flex items-center gap-3 mb-2">
                                                                                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#DBEAFE' }}>
                                                                                                    <AcademicCapIcon className="w-4 h-4" style={{ color: colors.secondary }} />
                                                                                          </div>
                                                                                          <span className="text-sm font-semibold" style={{ color: colors.primary }}>الفئة المستهدفة</span>
                                                                                </div>
                                                                                <div className="flex flex-wrap gap-2 pr-11">
                                                                                          {formData.targetAudience.map((a, i) => (
                                                                                                    <span key={i} className="px-3 py-1 rounded-lg text-sm font-medium" style={{ backgroundColor: colors.secondary, color: 'white' }}>{a}</span>
                                                                                          ))}
                                                                                </div>
                                                                      </div>
                                                            )}

                                                            {formData.executionSteps && (
                                                                      <div className="bg-white rounded-2xl p-4 shadow-sm border-r-4" style={{ borderColor: colors.secondary }}>
                                                                                <div className="flex items-center gap-3 mb-2">
                                                                                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#DBEAFE' }}>
                                                                                                    <DocumentTextIcon className="w-4 h-4" style={{ color: colors.secondary }} />
                                                                                          </div>
                                                                                          <span className="text-sm font-semibold" style={{ color: colors.primary }}>وصف الفعالية</span>
                                                                                </div>
                                                                                <p className="text-slate-600 pr-11 text-sm leading-relaxed whitespace-pre-wrap">{formData.executionSteps}</p>
                                                                      </div>
                                                            )}

                                                            {formData.objectives && formData.objectives.length > 0 && (
                                                                      <div className="bg-white rounded-2xl p-4 shadow-sm">
                                                                                <div className="flex items-center gap-3 mb-3">
                                                                                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FEF3C7' }}>
                                                                                                    <FlagIcon className="w-4 h-4" style={{ color: colors.accent }} />
                                                                                          </div>
                                                                                          <span className="text-sm font-semibold" style={{ color: colors.primary }}>الأهداف</span>
                                                                                </div>
                                                                                <ul className="space-y-2 pr-11">
                                                                                          {formData.objectives.map((obj, idx) => (
                                                                                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                                                                                              <span className="w-5 h-5 rounded-lg flex items-center justify-center text-xs text-white flex-shrink-0 mt-0.5" style={{ backgroundColor: colors.secondary }}>{idx + 1}</span>
                                                                                                              <span>{obj.isAIEnhanced ? obj.enhanced : obj.original}</span>
                                                                                                    </li>
                                                                                          ))}
                                                                                </ul>
                                                                      </div>
                                                            )}
                                                  </div>

                                                  {/* Photos */}
                                                  <div className="space-y-4">
                                                            {formData.photos && formData.photos.length > 0 ? (
                                                                      formData.photos.slice(0, 3).map((photo, idx) => (
                                                                                <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm relative aspect-video">
                                                                                          <Image src={photo} alt={`صورة ${idx + 1}`} fill className="object-cover" />
                                                                                          <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-center">
                                                                                                    <p className="text-xs text-white">صورة {idx + 1}</p>
                                                                                          </div>
                                                                                </div>
                                                                      ))
                                                            ) : (
                                                                      [1, 2, 3].map((num) => (
                                                                                <div key={num} className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-dashed border-slate-200">
                                                                                          <div className="aspect-video flex items-center justify-center bg-slate-50">
                                                                                                    <div className="text-center text-slate-400">
                                                                                                              <PhotoIcon className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                                                                                                              <p className="text-sm mt-2">صورة {num}</p>
                                                                                                    </div>
                                                                                          </div>
                                                                                </div>
                                                                      ))
                                                            )}
                                                  </div>
                                        </div>

                                        {/* Footer */}
                                        <div style={{ backgroundColor: colors.primary, padding: '20px 32px' }}>
                                                  <div className="text-center mb-3"><p className="text-white font-semibold">{formData.schoolName || 'اسم المدرسة'}</p></div>
                                                  <div className="flex justify-center gap-12">
                                                            {formData.principalName && <div className="text-center"><p className="text-white/60 text-xs mb-1">مدير المدرسة</p><p className="text-white font-medium text-sm">{formData.principalName}</p></div>}
                                                            {formData.activityLeaderName && <div className="text-center"><p className="text-white/60 text-xs mb-1">رائد النشاط</p><p className="text-white font-medium text-sm">{formData.activityLeaderName}</p></div>}
                                                  </div>
                                        </div>
                              </div>
                    </div>
          );
}
