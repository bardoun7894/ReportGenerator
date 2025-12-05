"use client";

import { WizardFormData } from "@/stores/wizard-store";
import Image from "next/image";
import { BuildingLibraryIcon } from "@heroicons/react/24/outline";

interface TemplateProps {
          formData: WizardFormData;
          reportTypeTitle: string;
}

export default function TemplateClassicReport({ formData, reportTypeTitle }: TemplateProps) {
          return (
                    <div
                              className="bg-[#FFFEF7] rounded-xl shadow-2xl overflow-hidden max-w-4xl mx-auto border-2 border-[#C9A050]"
                              style={{ fontFamily: 'Cairo, Tajawal, sans-serif' }}
                              dir="rtl"
                    >
                              {/* Official Header */}
                              <div className="bg-white border-b-4 border-[#006747] p-6">
                                        <div className="flex items-center justify-between">
                                                  {/* Ministry Logo - Right */}
                                                  <div className="flex items-center gap-4">
                                                            <div className="w-20 h-20 border-2 border-[#006747] rounded-lg flex items-center justify-center bg-white relative p-2">
                                                                      <Image
                                                                                src="/salogos.svg"
                                                                                alt="Ministry Logo"
                                                                                fill
                                                                                className="object-contain p-2"
                                                                      />
                                                            </div>
                                                            <div className="text-right">
                                                                      <p className="text-[#006747] font-bold text-lg">المملكة العربية السعودية</p>
                                                                      <p className="text-[#006747] text-sm">وزارة التعليم</p>
                                                                      {formData.educationRegion && (
                                                                                <p className="text-slate-600 text-sm">{formData.educationRegion}</p>
                                                                      )}
                                                            </div>
                                                  </div>

                                                  {/* School Logo - Left */}
                                                  <div className="text-left">
                                                            {formData.schoolLogo ? (
                                                                      <div className="w-20 h-20 border-2 border-[#006747] rounded-lg overflow-hidden bg-white relative">
                                                                                <Image
                                                                                          src={formData.schoolLogo}
                                                                                          alt="شعار المدرسة"
                                                                                          fill
                                                                                          className="object-contain p-1"
                                                                                />
                                                                      </div>
                                                            ) : (
                                                                      <div className="w-20 h-20 border-2 border-[#006747] rounded-lg flex items-center justify-center bg-white">
                                                                                <BuildingLibraryIcon className="w-10 h-10 text-[#006747]" />
                                                                      </div>
                                                            )}
                                                  </div>
                                        </div>

                                        {/* School Name */}
                                        <div className="text-center mt-4 py-3 border-t-2 border-b-2 border-[#006747]/30">
                                                  <h2 className="text-xl font-bold text-[#006747]">{formData.schoolName || 'اسم المدرسة'}</h2>
                                                  {formData.department && (
                                                            <p className="text-slate-600 text-sm">{formData.department}</p>
                                                  )}
                                        </div>
                              </div>

                              {/* Report Title Box */}
                              <div className="bg-[#006747] py-4 px-6">
                                        <div className="bg-white/10 border border-white/30 rounded-lg py-4 px-6">
                                                  <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
                                                            {formData.title || 'عنوان التقرير'}
                                                  </h1>
                                        </div>
                              </div>

                              {/* Main Content */}
                              <div className="p-6">
                                        {/* Formal Table Layout */}
                                        <div className="border-2 border-[#006747] rounded-lg overflow-hidden mb-6">
                                                  <table className="w-full">
                                                            <tbody>
                                                                      <tr className="border-b-2 border-[#006747]">
                                                                                <td className="bg-[#006747]/10 px-4 py-3 font-bold text-[#006747] w-1/4 border-l-2 border-[#006747]">التاريخ</td>
                                                                                <td className="px-4 py-3 text-slate-800">{formData.date || '---'}</td>
                                                                      </tr>
                                                                      {formData.location && (
                                                                                <tr className="border-b-2 border-[#006747]">
                                                                                          <td className="bg-[#006747]/10 px-4 py-3 font-bold text-[#006747] border-l-2 border-[#006747]">مكان التنفيذ</td>
                                                                                          <td className="px-4 py-3 text-slate-800">{formData.location}</td>
                                                                                </tr>
                                                                      )}
                                                                      {formData.participantsCount && (
                                                                                <tr className="border-b-2 border-[#006747]">
                                                                                          <td className="bg-[#006747]/10 px-4 py-3 font-bold text-[#006747] border-l-2 border-[#006747]">عدد المشاركين</td>
                                                                                          <td className="px-4 py-3 text-slate-800">{formData.participantsCount}</td>
                                                                                </tr>
                                                                      )}
                                                                      {formData.duration && (
                                                                                <tr className="border-b-2 border-[#006747]">
                                                                                          <td className="bg-[#006747]/10 px-4 py-3 font-bold text-[#006747] border-l-2 border-[#006747]">المدة</td>
                                                                                          <td className="px-4 py-3 text-slate-800">{formData.duration}</td>
                                                                                </tr>
                                                                      )}
                                                                      {formData.domain && (
                                                                                <tr className="border-b-2 border-[#006747]">
                                                                                          <td className="bg-[#006747]/10 px-4 py-3 font-bold text-[#006747] border-l-2 border-[#006747]">المجال</td>
                                                                                          <td className="px-4 py-3 text-slate-800">{formData.domain}</td>
                                                                                </tr>
                                                                      )}
                                                                      {formData.executors && (
                                                                                <tr className="border-b-2 border-[#006747]">
                                                                                          <td className="bg-[#006747]/10 px-4 py-3 font-bold text-[#006747] border-l-2 border-[#006747]">المنفذ/ون</td>
                                                                                          <td className="px-4 py-3 text-slate-800">{formData.executors}</td>
                                                                                </tr>
                                                                      )}
                                                                      {formData.targetAudience && formData.targetAudience.length > 0 && (
                                                                                <tr>
                                                                                          <td className="bg-[#006747]/10 px-4 py-3 font-bold text-[#006747] border-l-2 border-[#006747]">الفئة المستهدفة</td>
                                                                                          <td className="px-4 py-3 text-slate-800">{formData.targetAudience.join('، ')}</td>
                                                                                </tr>
                                                                      )}
                                                            </tbody>
                                                  </table>
                                        </div>

                                        {/* Description */}
                                        {formData.executionSteps && (
                                                  <div className="border-2 border-[#006747] rounded-lg overflow-hidden mb-6">
                                                            <div className="bg-[#006747]/10 px-4 py-2 border-b-2 border-[#006747]">
                                                                      <h3 className="font-bold text-[#006747]">وصف الفعالية</h3>
                                                            </div>
                                                            <div className="p-4">
                                                                      <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{formData.executionSteps}</p>
                                                            </div>
                                                  </div>
                                        )}

                                        {/* Numbered Objectives List */}
                                        {formData.objectives && formData.objectives.length > 0 && (
                                                  <div className="border-2 border-[#006747] rounded-lg overflow-hidden mb-6">
                                                            <div className="bg-[#006747]/10 px-4 py-2 border-b-2 border-[#006747]">
                                                                      <h3 className="font-bold text-[#006747]">أهداف الفعالية</h3>
                                                            </div>
                                                            <div className="p-4">
                                                                      <ol className="list-decimal list-inside space-y-2 pr-2">
                                                                                {formData.objectives.map((obj, idx) => (
                                                                                          <li key={idx} className="text-slate-700 leading-relaxed">
                                                                                                    {obj.isAIEnhanced ? obj.enhanced : obj.original}
                                                                                          </li>
                                                                                ))}
                                                                      </ol>
                                                            </div>
                                                  </div>
                                        )}

                                        {/* Photos in Formal Frame */}
                                        {formData.photos && formData.photos.length > 0 && (
                                                  <div className="border-2 border-[#006747] rounded-lg overflow-hidden mb-6">
                                                            <div className="bg-[#006747]/10 px-4 py-2 border-b-2 border-[#006747]">
                                                                      <h3 className="font-bold text-[#006747]">صور من الفعالية</h3>
                                                            </div>
                                                            <div className="p-4">
                                                                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                                                {formData.photos.map((photo, idx) => (
                                                                                          <div
                                                                                                    key={idx}
                                                                                                    className="border-2 border-[#C9A050] rounded-lg overflow-hidden relative aspect-video"
                                                                                          >
                                                                                                    <Image
                                                                                                              src={photo}
                                                                                                              alt={`صورة ${idx + 1}`}
                                                                                                              fill
                                                                                                              className="object-cover"
                                                                                                    />
                                                                                                    <div className="absolute bottom-0 left-0 right-0 bg-[#C9A050]/90 text-center py-1">
                                                                                                              <p className="text-xs text-white">صورة {idx + 1}</p>
                                                                                                    </div>
                                                                                          </div>
                                                                                ))}
                                                                      </div>
                                                            </div>
                                                  </div>
                                        )}
                              </div>

                              {/* Signature Boxes */}
                              <div className="p-6 border-t-4 border-[#006747] bg-white">
                                        <div className="grid grid-cols-2 gap-8">
                                                  {formData.activityLeaderName && (
                                                            <div className="text-center">
                                                                      <div className="border-2 border-[#006747] rounded-lg p-4">
                                                                                <p className="text-[#006747] font-bold text-sm mb-8">رائد النشاط</p>
                                                                                <div className="border-b-2 border-slate-300 mb-2"></div>
                                                                                <p className="text-slate-800 font-semibold">{formData.activityLeaderName}</p>
                                                                      </div>
                                                            </div>
                                                  )}
                                                  {formData.principalName && (
                                                            <div className="text-center">
                                                                      <div className="border-2 border-[#006747] rounded-lg p-4">
                                                                                <p className="text-[#006747] font-bold text-sm mb-8">مدير المدرسة</p>
                                                                                <div className="border-b-2 border-slate-300 mb-2"></div>
                                                                                <p className="text-slate-800 font-semibold">{formData.principalName}</p>
                                                                      </div>
                                                            </div>
                                                  )}
                                        </div>
                              </div>

                              {/* Official Footer */}
                              <div className="bg-[#006747] py-3 px-6 text-center">
                                        <p className="text-white text-sm">{formData.schoolName || 'اسم المدرسة'}</p>
                              </div>
                    </div>
          );
}
