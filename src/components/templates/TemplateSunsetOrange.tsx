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

export default function TemplateSunsetOrange({ formData, reportTypeTitle }: TemplateProps) {
          const colors = {
                    primary: '#7C2D12',
                    secondary: '#EA580C',
                    accent: '#FED7AA',
                    warm: '#FEF3C7',
                    light: '#FFFBEB',
                    cardBg: '#FFFFFF'
          };

          return (
                    <div
                              className="rounded-3xl overflow-hidden max-w-4xl mx-auto shadow-2xl"
                              style={{
                                        fontFamily: 'Cairo, Tajawal, system-ui, sans-serif',
                                        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                                        padding: '32px'
                              }}
                              dir="rtl"
                    >
                              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: colors.light }}>
                                        {/* Header */}
                                        <div style={{ background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)`, padding: '24px 32px' }}>
                                                  <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-4">
                                                                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-sm relative">
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
                                                            {formData.schoolLogo && (
                                                                      <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center relative overflow-hidden">
                                                                                <Image
                                                                                          src={formData.schoolLogo}
                                                                                          alt="الشعار"
                                                                                          fill
                                                                                          className="object-contain p-1"
                                                                                />
                                                                      </div>
                                                            )}
                                                  </div>
                                        </div>

                                        {/* Title Bar */}
                                        <div className="mx-6 -mt-4 relative z-10">
                                                  <div className="rounded-2xl text-center py-5 px-6 shadow-xl" style={{ background: `linear-gradient(90deg, ${colors.secondary} 0%, #F97316 100%)` }}>
                                                            <h1 className="text-xl md:text-2xl font-bold text-white drop-shadow-sm">{formData.title || 'عنوان الفعالية'}</h1>
                                                  </div>
                                        </div>

                                        {/* Body */}
                                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ gridTemplateColumns: '55% 45%' }}>
                                                  {/* Info Cards */}
                                                  <div className="space-y-4">
                                                            <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                                                                      <div className="flex items-center gap-3 mb-2">
                                                                                <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                                                                                          <CalendarDaysIcon className="w-5 h-5" style={{ color: colors.secondary }} />
                                                                                </div>
                                                                                <span className="text-sm font-bold" style={{ color: colors.primary }}>اليوم والتاريخ</span>
                                                                      </div>
                                                                      <p className="text-slate-600 pr-13 font-medium">{formData.date || '---'}</p>
                                                            </div>

                                                            {formData.location && (
                                                                      <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                                                                                <div className="flex items-center gap-3 mb-2">
                                                                                          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                                                                                                    <MapPinIcon className="w-5 h-5" style={{ color: colors.secondary }} />
                                                                                          </div>
                                                                                          <span className="text-sm font-bold" style={{ color: colors.primary }}>مكان التنفيذ</span>
                                                                                </div>
                                                                                <p className="text-slate-600 pr-13 font-medium">{formData.location}</p>
                                                                      </div>
                                                            )}

                                                            {formData.participantsCount && (
                                                                      <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                                                                                <div className="flex items-center gap-3 mb-2">
                                                                                          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                                                                                                    <UsersIcon className="w-5 h-5" style={{ color: colors.secondary }} />
                                                                                          </div>
                                                                                          <span className="text-sm font-bold" style={{ color: colors.primary }}>عدد المشاركين</span>
                                                                                </div>
                                                                                <p className="text-3xl font-black pr-13" style={{ color: colors.secondary }}>{formData.participantsCount}</p>
                                                                      </div>
                                                            )}

                                                            {formData.targetAudience && formData.targetAudience.length > 0 && (
                                                                      <div className="bg-white rounded-2xl p-4 shadow-sm">
                                                                                <div className="flex items-center gap-3 mb-2">
                                                                                          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: colors.warm }}>
                                                                                                    <AcademicCapIcon className="w-5 h-5" style={{ color: colors.secondary }} />
                                                                                          </div>
                                                                                          <span className="text-sm font-bold" style={{ color: colors.primary }}>الفئة المستهدفة</span>
                                                                                </div>
                                                                                <div className="flex flex-wrap gap-2 pr-13">
                                                                                          {formData.targetAudience.map((a, i) => (
                                                                                                    <span key={i} className="px-4 py-1.5 rounded-2xl text-sm font-semibold text-white" style={{ background: `linear-gradient(135deg, ${colors.secondary}, #F97316)` }}>{a}</span>
                                                                                          ))}
                                                                                </div>
                                                                      </div>
                                                            )}

                                                            {formData.executionSteps && (
                                                                      <div className="bg-white rounded-2xl p-4 shadow-sm">
                                                                                <div className="flex items-center gap-3 mb-2">
                                                                                          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: colors.warm }}>
                                                                                                    <DocumentTextIcon className="w-5 h-5" style={{ color: colors.secondary }} />
                                                                                          </div>
                                                                                          <span className="text-sm font-bold" style={{ color: colors.primary }}>وصف الفعالية</span>
                                                                                </div>
                                                                                <p className="text-slate-600 pr-13 text-sm leading-relaxed whitespace-pre-wrap">{formData.executionSteps}</p>
                                                                      </div>
                                                            )}

                                                            {formData.objectives && formData.objectives.length > 0 && (
                                                                      <div className="bg-white rounded-2xl p-4 shadow-sm">
                                                                                <div className="flex items-center gap-3 mb-3">
                                                                                          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                                                                                                    <FlagIcon className="w-5 h-5" style={{ color: colors.secondary }} />
                                                                                          </div>
                                                                                          <span className="text-sm font-bold" style={{ color: colors.primary }}>الأهداف</span>
                                                                                </div>
                                                                                <ul className="space-y-3 pr-13">
                                                                                          {formData.objectives.map((obj, idx) => (
                                                                                                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                                                                                                              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-bold flex-shrink-0 mt-0.5" style={{ background: `linear-gradient(135deg, ${colors.secondary}, #F97316)` }}>{idx + 1}</span>
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
                                                                                <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 relative aspect-video">
                                                                                          <Image src={photo} alt={`صورة ${idx + 1}`} fill className="object-cover" />
                                                                                          <div className="absolute bottom-0 left-0 right-0" style={{ background: `linear-gradient(90deg, ${colors.accent}, ${colors.warm})` }}>
                                                                                                    <p className="text-sm font-semibold text-center p-2" style={{ color: colors.primary }}>صورة {idx + 1}</p>
                                                                                          </div>
                                                                                </div>
                                                                      ))
                                                            ) : (
                                                                      [1, 2, 3].map((num) => (
                                                                                <div key={num} className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-dashed" style={{ borderColor: colors.accent }}>
                                                                                          <div className="aspect-video flex items-center justify-center" style={{ backgroundColor: colors.light }}>
                                                                                                    <div className="text-center text-slate-400">
                                                                                                              <PhotoIcon className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                                                                                                              <p className="text-sm mt-2 font-medium">صورة {num}</p>
                                                                                                    </div>
                                                                                          </div>
                                                                                </div>
                                                                      ))
                                                            )}
                                                  </div>
                                        </div>

                                        {/* Footer */}
                                        <div style={{ background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)`, padding: '24px 32px' }}>
                                                  <div className="text-center mb-4"><p className="text-white font-bold text-lg">{formData.schoolName || 'اسم المدرسة'}</p></div>
                                                  <div className="flex justify-center gap-16">
                                                            {formData.principalName && <div className="text-center"><p className="text-white/60 text-xs mb-1">مدير المدرسة</p><p className="text-white font-semibold">{formData.principalName}</p></div>}
                                                            {formData.activityLeaderName && <div className="text-center"><p className="text-white/60 text-xs mb-1">رائد النشاط</p><p className="text-white font-semibold">{formData.activityLeaderName}</p></div>}
                                                  </div>
                                        </div>
                              </div>
                    </div>
          );
}
