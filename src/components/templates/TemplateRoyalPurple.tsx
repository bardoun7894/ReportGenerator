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
          StarIcon,
          BuildingLibraryIcon
} from "@heroicons/react/24/outline";

interface TemplateProps {
          formData: WizardFormData;
          reportTypeTitle: string;
}

export default function TemplateRoyalPurple({ formData, reportTypeTitle }: TemplateProps) {
          const colors = {
                    primary: '#2D1B4E',
                    secondary: '#7C3AED',
                    accent: '#C4B5FD',
                    gold: '#F59E0B',
                    light: '#FAF5FF',
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
                                        {/* Header with gradient */}
                                        <div className="relative" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`, padding: '24px 32px' }}>
                                                  <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                                                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-1/4 translate-y-1/4"></div>

                                                  <div className="flex items-center justify-between relative z-10">
                                                            <div className="flex items-center gap-4">
                                                                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/15 backdrop-blur-sm relative">
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

                                                            {/* School Logo or Star */}
                                                            <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center relative overflow-hidden">
                                                                      {formData.schoolLogo ? (
                                                                                <Image
                                                                                          src={formData.schoolLogo}
                                                                                          alt="الشعار"
                                                                                          fill
                                                                                          className="object-contain p-1"
                                                                                />
                                                                      ) : (
                                                                                <StarIcon className="w-8 h-8 text-white" />
                                                                      )}
                                                            </div>
                                                  </div>
                                        </div>

                                        {/* Title Bar with gold accent */}
                                        <div className="mx-6 -mt-4 relative z-10">
                                                  <div className="rounded-xl text-center py-4 px-6 shadow-lg" style={{ backgroundColor: colors.secondary, border: `3px solid ${colors.gold}` }}>
                                                            <h1 className="text-xl md:text-2xl font-bold text-white">{formData.title || 'عنوان الفعالية'}</h1>
                                                  </div>
                                        </div>

                                        {/* Body */}
                                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ gridTemplateColumns: '55% 45%' }}>
                                                  {/* Info Cards */}
                                                  <div className="space-y-4">
                                                            {[
                                                                      { show: true, icon: CalendarDaysIcon, title: 'اليوم والتاريخ', value: formData.date || '---' },
                                                                      { show: !!formData.location, icon: MapPinIcon, title: 'مكان التنفيذ', value: formData.location },
                                                                      { show: !!formData.participantsCount, icon: UsersIcon, title: 'عدد المشاركين', value: formData.participantsCount, large: true },
                                                            ].filter(c => c.show).map((card, i) => (
                                                                      <div key={i} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all border-b-4" style={{ borderColor: colors.secondary }}>
                                                                                <div className="flex items-center gap-3 mb-2">
                                                                                          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                                                                                                    <card.icon className="w-5 h-5" style={{ color: colors.primary }} />
                                                                                          </div>
                                                                                          <span className="text-sm font-semibold" style={{ color: colors.primary }}>{card.title}</span>
                                                                                </div>
                                                                                <p className={`text-slate-600 pr-12 ${card.large ? 'text-2xl font-bold' : ''}`} style={card.large ? { color: colors.secondary } : {}}>{card.value}</p>
                                                                      </div>
                                                            ))}

                                                            {formData.targetAudience && formData.targetAudience.length > 0 && (
                                                                      <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all">
                                                                                <div className="flex items-center gap-3 mb-2">
                                                                                          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                                                                                                    <AcademicCapIcon className="w-5 h-5" style={{ color: colors.primary }} />
                                                                                          </div>
                                                                                          <span className="text-sm font-semibold" style={{ color: colors.primary }}>الفئة المستهدفة</span>
                                                                                </div>
                                                                                <div className="flex flex-wrap gap-2 pr-12">
                                                                                          {formData.targetAudience.map((a, i) => (
                                                                                                    <span key={i} className="px-3 py-1.5 rounded-xl text-sm font-medium text-white" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>{a}</span>
                                                                                          ))}
                                                                                </div>
                                                                      </div>
                                                            )}

                                                            {formData.executionSteps && (
                                                                      <div className="bg-white rounded-2xl p-4 shadow-sm">
                                                                                <div className="flex items-center gap-3 mb-2">
                                                                                          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#FEF3C7' }}>
                                                                                                    <DocumentTextIcon className="w-5 h-5" style={{ color: colors.gold }} />
                                                                                          </div>
                                                                                          <span className="text-sm font-semibold" style={{ color: colors.primary }}>وصف الفعالية</span>
                                                                                </div>
                                                                                <p className="text-slate-600 pr-12 text-sm leading-relaxed whitespace-pre-wrap">{formData.executionSteps}</p>
                                                                      </div>
                                                            )}

                                                            {formData.objectives && formData.objectives.length > 0 && (
                                                                      <div className="bg-white rounded-2xl p-4 shadow-sm">
                                                                                <div className="flex items-center gap-3 mb-3">
                                                                                          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                                                                                                    <FlagIcon className="w-5 h-5" style={{ color: colors.primary }} />
                                                                                          </div>
                                                                                          <span className="text-sm font-semibold" style={{ color: colors.primary }}>الأهداف</span>
                                                                                </div>
                                                                                <ul className="space-y-2 pr-12">
                                                                                          {formData.objectives.map((obj, idx) => (
                                                                                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                                                                                              <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs text-white flex-shrink-0 mt-0.5" style={{ background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})` }}>{idx + 1}</span>
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
                                                                                <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all relative aspect-video">
                                                                                          <Image src={photo} alt={`صورة ${idx + 1}`} fill className="object-cover" />
                                                                                          <div className="absolute bottom-0 left-0 right-0" style={{ background: `linear-gradient(to right, ${colors.accent}, ${colors.light})` }}>
                                                                                                    <p className="text-sm font-medium text-center p-2" style={{ color: colors.primary }}>صورة {idx + 1}</p>
                                                                                          </div>
                                                                                </div>
                                                                      ))
                                                            ) : (
                                                                      [1, 2, 3].map((num) => (
                                                                                <div key={num} className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-dashed" style={{ borderColor: colors.accent }}>
                                                                                          <div className="aspect-video flex items-center justify-center" style={{ backgroundColor: colors.light }}>
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
                                        <div style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`, padding: '20px 32px' }}>
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
