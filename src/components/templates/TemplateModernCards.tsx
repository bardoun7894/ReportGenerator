"use client";

import { WizardFormData } from "@/stores/wizard-store";
import Image from "next/image";
import {
          CalendarDaysIcon,
          MapPinIcon,
          UsersIcon,
          ClockIcon,
          TagIcon,
          UserIcon,
          PhotoIcon,
          BuildingLibraryIcon
} from "@heroicons/react/24/outline";

interface TemplateProps {
          formData: WizardFormData;
          reportTypeTitle: string;
}

export default function TemplateModernCards({ formData, reportTypeTitle }: TemplateProps) {
          return (
                    <div
                              className="bg-white rounded-2xl shadow-2xl overflow-hidden template-a4"
                              style={{ fontFamily: 'Cairo, Tajawal, sans-serif' }}
                              dir="rtl"
                    >
                              {/* Top Header Bar */}
                              <div className="bg-gradient-to-l from-[#006747] to-[#0C8662] p-6">
                                        <div className="flex items-center justify-between">
                                                  {/* Ministry Info - Right Side */}
                                                  <div className="flex items-center gap-4">
                                                            {/* Ministry Logo */}
                                                            <div className="w-16 h-16 relative bg-white/10 rounded-xl flex items-center justify-center border-2 border-white/30 p-1">
                                                                      <Image
                                                                                src="/salogos.svg"
                                                                                alt="Ministry Logo"
                                                                                fill
                                                                                className="object-contain p-1 invert brightness-0"
                                                                      />
                                                            </div>
                                                            <div className="text-white">
                                                                      <p className="text-sm opacity-80">وزارة التعليم</p>
                                                                      {formData.educationRegion && (
                                                                                <p className="text-sm opacity-80">{formData.educationRegion}</p>
                                                                      )}
                                                                      {formData.schoolName && (
                                                                                <p className="font-bold text-lg">{formData.schoolName}</p>
                                                                      )}
                                                            </div>
                                                  </div>

                                                  {/* School Logo - Left Side */}
                                                  {formData.schoolLogo && (
                                                            <div className="w-14 h-14 bg-white rounded-xl overflow-hidden shadow-lg relative">
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

                              {/* Activity Title Banner */}
                              <div className="bg-[#C9A050] py-4 px-6">
                                        <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
                                                  {formData.title || 'عنوان الفعالية'}
                                        </h1>
                              </div>

                              {/* Main Body - Two Columns */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                                        {/* Right Column - Data Cards */}
                                        <div className="space-y-4 order-1">
                                                  {/* Day and Date Card */}
                                                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center gap-4">
                                                            <div className="w-10 h-10 bg-[#006747]/10 rounded-full flex items-center justify-center text-[#006747]">
                                                                      <CalendarDaysIcon className="w-6 h-6" />
                                                            </div>
                                                            <div>
                                                                      <p className="text-xs text-[#006747] font-bold mb-1 uppercase tracking-wide">اليوم والتاريخ</p>
                                                                      <p className="text-slate-800 font-medium">{formData.date || '---'}</p>
                                                            </div>
                                                  </div>

                                                  {/* Execution Place Card */}
                                                  {formData.location && (
                                                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center gap-4">
                                                                      <div className="w-10 h-10 bg-[#006747]/10 rounded-full flex items-center justify-center text-[#006747]">
                                                                                <MapPinIcon className="w-6 h-6" />
                                                                      </div>
                                                                      <div>
                                                                                <p className="text-xs text-[#006747] font-bold mb-1 uppercase tracking-wide">مكان التنفيذ</p>
                                                                                <p className="text-slate-800 font-medium">{formData.location}</p>
                                                                      </div>
                                                            </div>
                                                  )}

                                                  {/* Participants Count Card */}
                                                  {formData.participantsCount && (
                                                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center gap-4">
                                                                      <div className="w-10 h-10 bg-[#006747]/10 rounded-full flex items-center justify-center text-[#006747]">
                                                                                <UsersIcon className="w-6 h-6" />
                                                                      </div>
                                                                      <div>
                                                                                <p className="text-xs text-[#006747] font-bold mb-1 uppercase tracking-wide">عدد المشاركين</p>
                                                                                <p className="text-slate-800 font-medium text-xl">{formData.participantsCount}</p>
                                                                      </div>
                                                            </div>
                                                  )}

                                                  {/* Target Group Card */}
                                                  {formData.targetAudience && formData.targetAudience.length > 0 && (
                                                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                                                      <p className="text-xs text-[#006747] font-bold mb-2 uppercase tracking-wide flex items-center gap-2">
                                                                                <UsersIcon className="w-4 h-4" />
                                                                                الفئة المستهدفة
                                                                      </p>
                                                                      <div className="flex flex-wrap gap-2">
                                                                                {formData.targetAudience.map((audience, idx) => (
                                                                                          <span
                                                                                                    key={idx}
                                                                                                    className="px-3 py-1 bg-[#006747]/10 text-[#006747] rounded-full text-sm font-medium"
                                                                                          >
                                                                                                    {audience}
                                                                                          </span>
                                                                                ))}
                                                                      </div>
                                                            </div>
                                                  )}

                                                  {/* Description Card */}
                                                  {formData.executionSteps && (
                                                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                                                      <p className="text-xs text-[#006747] font-bold mb-2 uppercase tracking-wide">وصف الفعالية</p>
                                                                      <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-wrap">
                                                                                {formData.executionSteps}
                                                                      </p>
                                                            </div>
                                                  )}

                                                  {/* Goals Card */}
                                                  {formData.objectives && formData.objectives.length > 0 && (
                                                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                                                      <p className="text-xs text-[#006747] font-bold mb-3 uppercase tracking-wide">الأهداف</p>
                                                                      <ul className="space-y-2">
                                                                                {formData.objectives.map((obj, idx) => (
                                                                                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                                                                                                    <span className="w-5 h-5 bg-[#006747] text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                                                                                                              {idx + 1}
                                                                                                    </span>
                                                                                                    <span>{obj.isAIEnhanced ? obj.enhanced : obj.original}</span>
                                                                                          </li>
                                                                                ))}
                                                                      </ul>
                                                            </div>
                                                  )}

                                                  {/* Duration Card */}
                                                  {formData.duration && (
                                                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center gap-4">
                                                                      <div className="w-10 h-10 bg-[#006747]/10 rounded-full flex items-center justify-center text-[#006747]">
                                                                                <ClockIcon className="w-6 h-6" />
                                                                      </div>
                                                                      <div>
                                                                                <p className="text-xs text-[#006747] font-bold mb-1 uppercase tracking-wide">مدة التنفيذ</p>
                                                                                <p className="text-slate-800 font-medium">{formData.duration}</p>
                                                                      </div>
                                                            </div>
                                                  )}

                                                  {/* Executors Card */}
                                                  {formData.executors && (
                                                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center gap-4">
                                                                      <div className="w-10 h-10 bg-[#006747]/10 rounded-full flex items-center justify-center text-[#006747]">
                                                                                <UserIcon className="w-6 h-6" />
                                                                      </div>
                                                                      <div>
                                                                                <p className="text-xs text-[#006747] font-bold mb-1 uppercase tracking-wide">المنفذ/ون</p>
                                                                                <p className="text-slate-800 font-medium">{formData.executors}</p>
                                                                      </div>
                                                            </div>
                                                  )}
                                        </div>

                                        {/* Left Column - Photos */}
                                        <div className="space-y-4 order-2">
                                                  {formData.photos && formData.photos.length > 0 ? (
                                                            formData.photos.slice(0, 3).map((photo, idx) => (
                                                                      <div key={idx} className="rounded-xl overflow-hidden border border-slate-200 shadow-sm relative aspect-video">
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
                                                            // Photo Placeholders
                                                            <>
                                                                      {[1, 2, 3].map((num) => (
                                                                                <div key={num} className="rounded-xl overflow-hidden border border-slate-200 border-dashed">
                                                                                          <div className="aspect-video bg-slate-50 flex items-center justify-center">
                                                                                                    <div className="text-center text-slate-400">
                                                                                                              <PhotoIcon className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                                                                                                              <p className="text-sm">صورة {num}</p>
                                                                                                    </div>
                                                                                          </div>
                                                                                </div>
                                                                      ))}
                                                            </>
                                                  )}
                                        </div>
                              </div>

                              {/* Footer */}
                              <div className="bg-gradient-to-l from-[#006747] to-[#0C8662] p-6">
                                        <div className="text-center mb-4">
                                                  <p className="text-white font-bold text-lg">{formData.schoolName || 'اسم المدرسة'}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
                                                  {formData.principalName && (
                                                            <div className="text-center">
                                                                      <p className="text-white/70 text-xs mb-2">مدير/ة المدرسة</p>
                                                                      <p className="text-white font-semibold border-t border-white/30 pt-2">
                                                                                {formData.principalName}
                                                                      </p>
                                                            </div>
                                                  )}
                                                  {formData.activityLeaderName && (
                                                            <div className="text-center">
                                                                      <p className="text-white/70 text-xs mb-2">رائد/ة النشاط</p>
                                                                      <p className="text-white font-semibold border-t border-white/30 pt-2">
                                                                                {formData.activityLeaderName}
                                                                      </p>
                                                            </div>
                                                  )}
                                        </div>
                              </div>
                    </div>
          );
}
