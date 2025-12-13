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
          BuildingLibraryIcon
} from "@heroicons/react/24/outline";

interface TemplateProps {
          formData: WizardFormData;
          reportTypeTitle: string;
}

export default function TemplateProfessionalGrid({ formData, reportTypeTitle }: TemplateProps) {
          return (
                    <div
                              className="bg-white rounded-2xl shadow-2xl overflow-hidden template-a4"
                              style={{ fontFamily: 'Cairo, Tajawal, sans-serif' }}
                              dir="rtl"
                    >
                              {/* Gradient Header */}
                              <div className="bg-gradient-to-l from-[#1E40AF] via-[#3B82F6] to-[#1E40AF] p-8">
                                        <div className="flex items-center justify-between max-w-3xl mx-auto">
                                                  {/* Logo */}
                                                  {formData.schoolLogo && (
                                                            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
                                                                      <Image
                                                                                src={formData.schoolLogo}
                                                                                alt="الشعار"
                                                                                fill
                                                                                className="object-contain p-1"
                                                                      />
                                                            </div>
                                                  )}

                                                  {/* School Info */}
                                                  <div className="text-white text-center flex-1 px-6">
                                                            <p className="text-sm opacity-80 mb-1">وزارة التعليم</p>
                                                            {formData.educationRegion && (
                                                                      <p className="text-sm opacity-80 mb-2">{formData.educationRegion}</p>
                                                            )}
                                                            <h2 className="text-2xl font-bold">{formData.schoolName || 'اسم المدرسة'}</h2>
                                                            {formData.department && (
                                                                      <p className="text-sm opacity-80 mt-1">{formData.department}</p>
                                                            )}
                                                  </div>

                                                  {/* Ministry Badge */}
                                                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center border-2 border-white/30 relative p-2">
                                                            <Image
                                                                      src="/salogos.svg"
                                                                      alt="Ministry Logo"
                                                                      fill
                                                                      className="object-contain p-2 invert brightness-0"
                                                            />
                                                  </div>
                                        </div>
                              </div>

                              {/* Activity Title in Decorative Frame */}
                              <div className="relative bg-[#F0F9FF] py-6 px-4">
                                        <div className="max-w-2xl mx-auto relative">
                                                  <div className="absolute inset-0 border-2 border-[#3B82F6]/30 rounded-xl transform rotate-1"></div>
                                                  <div className="relative bg-white rounded-xl p-4 shadow-sm border border-[#3B82F6]/20">
                                                            <h1 className="text-2xl md:text-3xl font-bold text-[#1E40AF] text-center">
                                                                      {formData.title || 'عنوان النشاط'}
                                                            </h1>
                                                  </div>
                                        </div>
                              </div>

                              {/* Data Grid 3x2 */}
                              <div className="p-6">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                                  {/* Date */}
                                                  <div className="bg-gradient-to-br from-[#3B82F6]/10 to-[#1E40AF]/10 rounded-xl p-4 text-center">
                                                            <div className="w-10 h-10 bg-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-2 text-white">
                                                                      <CalendarDaysIcon className="w-6 h-6" />
                                                            </div>
                                                            <p className="text-[#1E40AF] text-xs font-bold mb-1">التاريخ</p>
                                                            <p className="text-slate-800 font-semibold">{formData.date || '---'}</p>
                                                  </div>

                                                  {/* Location */}
                                                  <div className="bg-gradient-to-br from-[#059669]/10 to-[#10B981]/10 rounded-xl p-4 text-center">
                                                            <div className="w-10 h-10 bg-[#059669] rounded-full flex items-center justify-center mx-auto mb-2 text-white">
                                                                      <MapPinIcon className="w-6 h-6" />
                                                            </div>
                                                            <p className="text-[#059669] text-xs font-bold mb-1">المكان</p>
                                                            <p className="text-slate-800 font-semibold">{formData.location || '---'}</p>
                                                  </div>

                                                  {/* Participants */}
                                                  <div className="bg-gradient-to-br from-[#7C3AED]/10 to-[#A78BFA]/10 rounded-xl p-4 text-center">
                                                            <div className="w-10 h-10 bg-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-2 text-white">
                                                                      <UsersIcon className="w-6 h-6" />
                                                            </div>
                                                            <p className="text-[#7C3AED] text-xs font-bold mb-1">المشاركون</p>
                                                            <p className="text-slate-800 font-semibold text-xl">{formData.participantsCount || '---'}</p>
                                                  </div>

                                                  {/* Duration */}
                                                  <div className="bg-gradient-to-br from-[#F59E0B]/10 to-[#FBBF24]/10 rounded-xl p-4 text-center">
                                                            <div className="w-10 h-10 bg-[#F59E0B] rounded-full flex items-center justify-center mx-auto mb-2 text-white">
                                                                      <ClockIcon className="w-6 h-6" />
                                                            </div>
                                                            <p className="text-[#D97706] text-xs font-bold mb-1">المدة</p>
                                                            <p className="text-slate-800 font-semibold">{formData.duration || '---'}</p>
                                                  </div>

                                                  {/* Domain */}
                                                  <div className="bg-gradient-to-br from-[#EC4899]/10 to-[#F472B6]/10 rounded-xl p-4 text-center">
                                                            <div className="w-10 h-10 bg-[#EC4899] rounded-full flex items-center justify-center mx-auto mb-2 text-white">
                                                                      <TagIcon className="w-6 h-6" />
                                                            </div>
                                                            <p className="text-[#DB2777] text-xs font-bold mb-1">المجال</p>
                                                            <p className="text-slate-800 font-semibold">{formData.domain || '---'}</p>
                                                  </div>

                                                  {/* Executors */}
                                                  <div className="bg-gradient-to-br from-[#06B6D4]/10 to-[#22D3EE]/10 rounded-xl p-4 text-center">
                                                            <div className="w-10 h-10 bg-[#06B6D4] rounded-full flex items-center justify-center mx-auto mb-2 text-white">
                                                                      <UserIcon className="w-6 h-6" />
                                                            </div>
                                                            <p className="text-[#0891B2] text-xs font-bold mb-1">المنفذ</p>
                                                            <p className="text-slate-800 font-semibold text-sm">{formData.executors || '---'}</p>
                                                  </div>
                                        </div>

                                        {/* Target Audience */}
                                        {formData.targetAudience && formData.targetAudience.length > 0 && (
                                                  <div className="bg-slate-50 rounded-xl p-4 mb-6">
                                                            <p className="text-[#1E40AF] text-sm font-bold mb-3 text-center">الفئة المستهدفة</p>
                                                            <div className="flex flex-wrap justify-center gap-2">
                                                                      {formData.targetAudience.map((audience, idx) => (
                                                                                <span
                                                                                          key={idx}
                                                                                          className="px-4 py-2 bg-[#1E40AF] text-white rounded-full text-sm font-medium"
                                                                                >
                                                                                          {audience}
                                                                                </span>
                                                                      ))}
                                                            </div>
                                                  </div>
                                        )}

                                        {/* Objectives */}
                                        {formData.objectives && formData.objectives.length > 0 && (
                                                  <div className="bg-gradient-to-r from-[#1E40AF]/5 to-[#3B82F6]/5 rounded-xl p-6 mb-6">
                                                            <h3 className="text-[#1E40AF] font-bold text-lg mb-4 text-center">الأهداف</h3>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                      {formData.objectives.map((obj, idx) => (
                                                                                <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
                                                                                          <span className="w-8 h-8 bg-[#1E40AF] text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                                                                                                    {idx + 1}
                                                                                          </span>
                                                                                          <p className="text-slate-700 text-sm leading-relaxed">
                                                                                                    {obj.isAIEnhanced ? obj.enhanced : obj.original}
                                                                                          </p>
                                                                                </div>
                                                                      ))}
                                                            </div>
                                                  </div>
                                        )}

                                        {/* Photos Grid 2x2 */}
                                        {formData.photos && formData.photos.length > 0 && (
                                                  <div className="mb-6">
                                                            <h3 className="text-[#1E40AF] font-bold text-lg mb-4 text-center">صور الفعالية</h3>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                      {formData.photos.slice(0, 4).map((photo, idx) => (
                                                                                <div key={idx} className="rounded-xl overflow-hidden shadow-md relative aspect-video">
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

                              {/* Footer with Signatures */}
                              <div className="bg-gradient-to-l from-[#1E40AF] to-[#3B82F6] p-6">
                                        <div className="flex justify-center items-center gap-12">
                                                  {formData.activityLeaderName && (
                                                            <div className="text-center">
                                                                      <p className="text-white/70 text-sm mb-2">رائد/ة النشاط</p>
                                                                      <div className="bg-white/20 rounded-lg px-6 py-2">
                                                                                <p className="text-white font-semibold">{formData.activityLeaderName}</p>
                                                                      </div>
                                                            </div>
                                                  )}
                                                  {formData.principalName && (
                                                            <div className="text-center">
                                                                      <p className="text-white/70 text-sm mb-2">مدير/ة المدرسة</p>
                                                                      <div className="bg-white/20 rounded-lg px-6 py-2">
                                                                                <p className="text-white font-semibold">{formData.principalName}</p>
                                                                      </div>
                                                            </div>
                                                  )}
                                        </div>
                              </div>
                    </div>
          );
}
