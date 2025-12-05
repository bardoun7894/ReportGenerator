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

export default function TemplateModernMinimal({ formData, reportTypeTitle }: TemplateProps) {
          return (
                    <div
                              className="bg-white max-w-4xl mx-auto shadow-xl"
                              style={{
                                        fontFamily: 'Tajawal, sans-serif',
                                        padding: '40px'
                              }}
                              dir="rtl"
                    >
                              {/* Minimal Header */}
                              <div className="flex justify-between items-start mb-16">
                                        <div>
                                                  <h1 className="text-5xl font-light text-black mb-4 leading-tight">
                                                            {formData.title || 'العنوان'}
                                                  </h1>
                                                  <div className="h-1 w-24 bg-black"></div>
                                        </div>
                                        <div className="text-left flex flex-col items-end">
                                                  <div className="flex items-center gap-4 mb-4">
                                                            {/* Ministry Logo */}
                                                            <div className="w-12 h-12 relative opacity-80">
                                                                      <Image
                                                                                src="/salogos.svg"
                                                                                alt="Ministry Logo"
                                                                                fill
                                                                                className="object-contain"
                                                                      />
                                                            </div>
                                                            {/* School Logo */}
                                                            {formData.schoolLogo && (
                                                                      <div className="w-16 h-16 relative grayscale opacity-80">
                                                                                <Image src={formData.schoolLogo} alt="Logo" fill className="object-contain" />
                                                                      </div>
                                                            )}
                                                  </div>

                                                  <p className="text-sm text-gray-500 font-light">{formData.schoolName}</p>
                                                  <p className="text-sm text-gray-400 font-light">{formData.date}</p>
                                        </div>
                              </div>

                              {/* Main Content Grid */}
                              <div className="grid grid-cols-12 gap-12">
                                        {/* Left Column - Details (4 cols) */}
                                        <div className="col-span-12 md:col-span-4 space-y-12 border-l border-gray-100 pl-8">
                                                  <div>
                                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">المشاركون</p>
                                                            <p className="text-6xl font-thin text-black">{formData.participantsCount || '0'}</p>
                                                  </div>

                                                  <div>
                                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">المكان</p>
                                                            <p className="text-lg font-medium text-gray-800">{formData.location}</p>
                                                  </div>

                                                  <div>
                                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">الفئة المستهدفة</p>
                                                            <div className="flex flex-col gap-2">
                                                                      {formData.targetAudience?.map((a, i) => (
                                                                                <span key={i} className="text-sm text-gray-600 border-b border-gray-100 pb-1 w-fit">{a}</span>
                                                                      ))}
                                                            </div>
                                                  </div>

                                                  <div>
                                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">المنفذون</p>
                                                            <p className="text-sm text-gray-600">{formData.executors}</p>
                                                  </div>
                                        </div>

                                        {/* Right Column - Narrative (8 cols) */}
                                        <div className="col-span-12 md:col-span-8">
                                                  <div className="mb-12">
                                                            <p className="text-xl text-gray-800 leading-loose font-light">
                                                                      {formData.executionSteps || 'وصف الفعالية...'}
                                                            </p>
                                                  </div>

                                                  {/* Photo Gallery - Masonry style */}
                                                  <div className="grid grid-cols-2 gap-4 mb-12">
                                                            {formData.photos && formData.photos.length > 0 ? (
                                                                      formData.photos.slice(0, 2).map((photo, idx) => (
                                                                                <div key={idx} className={`relative grayscale hover:grayscale-0 transition-all duration-500 ${idx === 0 ? 'aspect-square' : 'aspect-video'}`}>
                                                                                          <Image src={photo} alt="Event" fill className="object-cover" />
                                                                                </div>
                                                                      ))
                                                            ) : (
                                                                      [1, 2].map((n) => (
                                                                                <div key={n} className={`relative bg-gray-50 flex items-center justify-center ${n === 1 ? 'aspect-square' : 'aspect-video'}`}>
                                                                                          <PhotoIcon className="w-12 h-12 text-gray-200" />
                                                                                </div>
                                                                      ))
                                                            )}
                                                  </div>

                                                  {/* Objectives List */}
                                                  <div>
                                                            <h3 className="text-2xl font-light text-black mb-6">الأهداف</h3>
                                                            <div className="space-y-4">
                                                                      {formData.objectives?.map((obj, idx) => (
                                                                                <div key={idx} className="flex gap-4 items-baseline group">
                                                                                          <span className="text-xs font-bold text-gray-300 group-hover:text-black transition-colors">0{idx + 1}</span>
                                                                                          <p className="text-gray-600 group-hover:text-gray-900 transition-colors">{obj.isAIEnhanced ? obj.enhanced : obj.original}</p>
                                                                                </div>
                                                                      ))}
                                                            </div>
                                                  </div>
                                        </div>
                              </div>

                              {/* Minimal Footer */}
                              <div className="mt-20 pt-8 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400 uppercase tracking-widest">
                                        <div>{formData.principalName}</div>
                                        <div>{formData.activityLeaderName}</div>
                              </div>
                    </div>
          );
}
