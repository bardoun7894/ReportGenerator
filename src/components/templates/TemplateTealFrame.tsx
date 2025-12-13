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

export default function TemplateTealFrame({ formData, reportTypeTitle }: TemplateProps) {
          return (
                    <div
                              className="rounded-3xl overflow-hidden template-a4 shadow-2xl"
                              style={{
                                        fontFamily: 'Cairo, Tajawal, system-ui, sans-serif',
                                        backgroundColor: '#0F3A3F',
                                        padding: '32px'
                              }}
                              dir="rtl"
                    >
                              {/* Inner Frame */}
                              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#F5F7FA' }}>
                                        {/* Header Bar */}
                                        <div style={{ backgroundColor: '#0F3A3F', padding: '24px 32px' }}>
                                                  <div className="flex items-center justify-between">
                                                            {/* Ministry Logo & Info - Right */}
                                                            <div className="flex items-center gap-4">
                                                                      <div
                                                                                className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden relative"
                                                                                style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                                                                      >
                                                                                <Image
                                                                                          src="/salogos.svg"
                                                                                          alt="Ministry Logo"
                                                                                          fill
                                                                                          className="object-contain p-2 invert brightness-0"
                                                                                />
                                                                      </div>
                                                                      <div className="text-white">
                                                                                <p className="font-medium text-sm opacity-90">وزارة التعليم</p>
                                                                                {formData.educationRegion && (
                                                                                          <p className="text-sm opacity-80">{formData.educationRegion}</p>
                                                                                )}
                                                                                <p className="font-semibold">{formData.schoolName || 'اسم المدرسة'}</p>
                                                                      </div>
                                                            </div>

                                                            {/* School Logo - Left */}
                                                            {formData.schoolLogo && (
                                                                      <div className="w-14 h-14 rounded-full bg-white/20 overflow-hidden flex items-center justify-center relative">
                                                                                <Image
                                                                                          src={formData.schoolLogo}
                                                                                          alt="شعار المدرسة"
                                                                                          fill
                                                                                          className="object-contain p-1"
                                                                                />
                                                                      </div>
                                                            )}
                                                  </div>
                                        </div>

                                        {/* Activity Title Bar */}
                                        <div
                                                  className="mx-6 -mt-4 relative z-10 rounded-xl text-center py-4 px-6"
                                                  style={{ backgroundColor: '#00A88F' }}
                                        >
                                                  <h1 className="text-xl md:text-2xl font-bold text-white">
                                                            {formData.title || 'عنوان الفعالية'}
                                                  </h1>
                                        </div>

                                        {/* Body - Two Columns */}
                                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ gridTemplateColumns: '55% 45%' }}>
                                                  {/* Right Column - Info Cards */}
                                                  <div className="space-y-4">
                                                            {/* Date Card */}
                                                            <div className="bg-white rounded-2xl p-4 shadow-sm">
                                                                      <div className="flex items-center gap-3 mb-2">
                                                                                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E3F5FF' }}>
                                                                                          <CalendarDaysIcon className="w-4 h-4" style={{ color: '#0F3A3F' }} />
                                                                                </div>
                                                                                <span className="text-sm font-semibold" style={{ color: '#123047' }}>اليوم والتاريخ</span>
                                                                      </div>
                                                                      <p className="text-slate-600 pr-10">{formData.date || '---'}</p>
                                                            </div>

                                                            {/* Place Card */}
                                                            {formData.location && (
                                                                      <div className="bg-white rounded-2xl p-4 shadow-sm">
                                                                                <div className="flex items-center gap-3 mb-2">
                                                                                          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E3F5FF' }}>
                                                                                                    <MapPinIcon className="w-4 h-4" style={{ color: '#0F3A3F' }} />
                                                                                          </div>
                                                                                          <span className="text-sm font-semibold" style={{ color: '#123047' }}>مكان التنفيذ</span>
                                                                                </div>
                                                                                <p className="text-slate-600 pr-10">{formData.location}</p>
                                                                      </div>
                                                            )}

                                                            {/* Participants Card */}
                                                            {formData.participantsCount && (
                                                                      <div className="bg-white rounded-2xl p-4 shadow-sm">
                                                                                <div className="flex items-center gap-3 mb-2">
                                                                                          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E3F5FF' }}>
                                                                                                    <UsersIcon className="w-4 h-4" style={{ color: '#0F3A3F' }} />
                                                                                          </div>
                                                                                          <span className="text-sm font-semibold" style={{ color: '#123047' }}>عدد المشاركين</span>
                                                                                </div>
                                                                                <p className="text-slate-600 pr-10 text-xl font-bold">{formData.participantsCount}</p>
                                                                      </div>
                                                            )}

                                                            {/* Target Group Card */}
                                                            {formData.targetAudience && formData.targetAudience.length > 0 && (
                                                                      <div className="bg-white rounded-2xl p-4 shadow-sm">
                                                                                <div className="flex items-center gap-3 mb-2">
                                                                                          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E3F5FF' }}>
                                                                                                    <AcademicCapIcon className="w-4 h-4" style={{ color: '#0F3A3F' }} />
                                                                                          </div>
                                                                                          <span className="text-sm font-semibold" style={{ color: '#123047' }}>الفئة المستهدفة</span>
                                                                                </div>
                                                                                <div className="flex flex-wrap gap-2 pr-10">
                                                                                          {formData.targetAudience.map((audience, idx) => (
                                                                                                    <span
                                                                                                              key={idx}
                                                                                                              className="px-3 py-1 rounded-full text-sm"
                                                                                                              style={{ backgroundColor: '#E3F5FF', color: '#0F3A3F' }}
                                                                                                    >
                                                                                                              {audience}
                                                                                                    </span>
                                                                                          ))}
                                                                                </div>
                                                                      </div>
                                                            )}

                                                            {/* Description Card */}
                                                            {formData.executionSteps && (
                                                                      <div className="bg-white rounded-2xl p-4 shadow-sm">
                                                                                <div className="flex items-center gap-3 mb-2">
                                                                                          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: '#EAF6E8' }}>
                                                                                                    <DocumentTextIcon className="w-4 h-4" style={{ color: '#0F3A3F' }} />
                                                                                          </div>
                                                                                          <span className="text-sm font-semibold" style={{ color: '#123047' }}>وصف الفعالية</span>
                                                                                </div>
                                                                                <p className="text-slate-600 pr-10 text-sm leading-relaxed whitespace-pre-wrap">
                                                                                          {formData.executionSteps}
                                                                                </p>
                                                                      </div>
                                                            )}

                                                            {/* Goals Card */}
                                                            {formData.objectives && formData.objectives.length > 0 && (
                                                                      <div className="bg-white rounded-2xl p-4 shadow-sm">
                                                                                <div className="flex items-center gap-3 mb-3">
                                                                                          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF2D9' }}>
                                                                                                    <FlagIcon className="w-4 h-4" style={{ color: '#D97706' }} />
                                                                                          </div>
                                                                                          <span className="text-sm font-semibold" style={{ color: '#123047' }}>الأهداف</span>
                                                                                </div>
                                                                                <ul className="space-y-2 pr-10">
                                                                                          {formData.objectives.map((obj, idx) => (
                                                                                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                                                                                              <span
                                                                                                                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white flex-shrink-0 mt-0.5"
                                                                                                                        style={{ backgroundColor: '#00A88F' }}
                                                                                                              >
                                                                                                                        {idx + 1}
                                                                                                              </span>
                                                                                                              <span>{obj.isAIEnhanced ? obj.enhanced : obj.original}</span>
                                                                                                    </li>
                                                                                          ))}
                                                                                </ul>
                                                                      </div>
                                                            )}
                                                  </div>

                                                  {/* Left Column - Media Cards */}
                                                  <div className="space-y-4">
                                                            {formData.photos && formData.photos.length > 0 ? (
                                                                      formData.photos.slice(0, 3).map((photo, idx) => (
                                                                                <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm relative aspect-video">
                                                                                          <Image
                                                                                                    src={photo}
                                                                                                    alt={`صورة ${idx + 1}`}
                                                                                                    fill
                                                                                                    className="object-cover"
                                                                                          />
                                                                                          <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-center">
                                                                                                    <p className="text-xs text-white">صورة {idx + 1} من الفعالية</p>
                                                                                          </div>
                                                                                </div>
                                                                      ))
                                                            ) : (
                                                                      [1, 2, 3].map((num) => (
                                                                                <div key={num} className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-dashed border-slate-200">
                                                                                          <div className="aspect-video flex items-center justify-center" style={{ backgroundColor: '#F5F7FA' }}>
                                                                                                    <div className="text-center text-slate-400">
                                                                                                              <PhotoIcon className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                                                                                                              <p className="text-sm mt-2">صورة {num}</p>
                                                                                                    </div>
                                                                                          </div>
                                                                                          <div className="p-3 text-center">
                                                                                                    <p className="text-sm text-slate-400">تعليق الصورة</p>
                                                                                          </div>
                                                                                </div>
                                                                      ))
                                                            )}
                                                  </div>
                                        </div>

                                        {/* Footer */}
                                        <div style={{ backgroundColor: '#0F3A3F', padding: '20px 32px' }}>
                                                  <div className="text-center mb-3">
                                                            <p className="text-white font-semibold">{formData.schoolName || 'اسم المدرسة'}</p>
                                                  </div>
                                                  <div className="flex justify-center gap-12">
                                                            {formData.principalName && (
                                                                      <div className="text-center">
                                                                                <p className="text-white/60 text-xs mb-1">مدير/ة المدرسة</p>
                                                                                <p className="text-white font-medium text-sm">{formData.principalName}</p>
                                                                      </div>
                                                            )}
                                                            {formData.activityLeaderName && (
                                                                      <div className="text-center">
                                                                                <p className="text-white/60 text-xs mb-1">رائد/ة النشاط</p>
                                                                                <p className="text-white font-medium text-sm">{formData.activityLeaderName}</p>
                                                                      </div>
                                                            )}
                                                  </div>
                                        </div>
                              </div>
                    </div>
          );
}
