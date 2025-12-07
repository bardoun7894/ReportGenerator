"use client";

import React from 'react';
import { WizardFormData, EnhancedText } from "@/stores/wizard-store";
import Image from "next/image";
import { getAudienceLabel, extractDescription, extractSteps } from "./template-helpers";

interface TemplateProps {
          formData: WizardFormData;
          reportTypeTitle: string;
}

// --- Helper function to get text from EnhancedText ---
const getText = (item: EnhancedText | string | undefined): string => {
          if (!item) return "";
          if (typeof item === 'string') return item;
          return item.enhanced || item.original || "";
};

// --- Sub-components ---

interface InputBoxProps {
          label: string;
          value?: string | number;
          className?: string;
}

const InputBox: React.FC<InputBoxProps> = ({ label, value, className = "" }) => {
          if (!value) return null; // Hide if no value, like other templates

          return (
                    <div className={`relative border border-teal-500 rounded-lg pt-3 pb-2 px-3 mt-4 ${className}`}>
                              <label className="absolute -top-3 right-4 bg-white px-2 text-teal-600 font-bold text-sm sm:text-base whitespace-nowrap">
                                        {label}
                              </label>
                              <div className="w-full bg-transparent text-gray-800 text-right min-h-[24px] text-sm font-medium">
                                        {value}
                              </div>
                    </div>
          );
};

const Header: React.FC<{ region?: string; school?: string; schoolType?: string; logo?: string; title?: string }> = ({ region, school, schoolType, logo, title }) => {
          return (
                    <div className="relative mb-8">
                              {/* Top Gradient Bar */}
                              <div className="h-36 w-full bg-gradient-to-r from-emerald-500 to-sky-600 rounded-t-xl relative overflow-hidden flex items-center justify-between px-6 py-4 text-white">

                                        {/* Right Side: Ministry Logo (first in RTL) */}
                                        <div className="flex items-center gap-4">
                                                  <div className="w-20 h-20 relative">
                                                            <Image
                                                                      src="/salogos.svg"
                                                                      alt="وزارة التعليم"
                                                                      fill
                                                                      className="object-contain brightness-0 invert"
                                                            />
                                                  </div>
                                                  <div className="border-r border-white/30 h-16"></div>
                                                  <div className="text-right">
                                                            <p className="text-xs opacity-80">المملكة العربية السعودية</p>
                                                            <p className="font-bold text-sm">وزارة التعليم</p>
                                                  </div>
                                        </div>

                                        {/* Left Side: School Info */}
                                        <div className="text-left">
                                                  <p className="text-sm opacity-90">{region || "الإدارة العامة للتعليم"}</p>
                                                  <p className="text-sm font-semibold">
                                                            {schoolType ? `المرحلة ${schoolType === 'ابتدائي' ? 'الابتدائية' : schoolType === 'متوسط' ? 'المتوسطة' : 'الثانوية'}` : ''}
                                                  </p>
                                                  <p className="text-base font-bold">{school || "المدرسة"}</p>
                                        </div>
                              </div>

                              {/* Centered Title Box */}
                              <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-6 w-3/4 md:w-2/3">
                                        <div className="bg-[#1f4e5f] text-white text-center py-3 rounded-xl shadow-lg border-2 border-white">
                                                  <h1 className="text-lg md:text-xl font-bold">{title || "تقرير"}</h1>
                                        </div>
                              </div>
                    </div>
          );
};

const InfoSection: React.FC<{ formData: WizardFormData }> = ({ formData }) => {
          const audience = formData.targetAudience?.map(a => getAudienceLabel(a)).join('، ');

          return (
                    <div className="mt-10 px-4 space-y-2">
                              {/* Row 1: Basic Info */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                        <InputBox label="عنوان التقرير:" value={formData.title} />
                                        <InputBox label="التاريخ:" value={formData.date} />
                              </div>

                              {/* Row 2: Details */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <InputBox label="المكان:" value={formData.location} />
                                        <InputBox label="عدد المشاركين:" value={formData.participantsCount} />
                                        <InputBox label="المدة:" value={formData.duration} />
                              </div>

                              {/* Row 3: More Details */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InputBox label="المجال:" value={formData.domain} />
                                        <InputBox label="الفئة المستهدفة:" value={audience} />
                              </div>
                    </div>
          );
};

const DescriptionSection: React.FC<{ executionSteps?: string }> = ({ executionSteps }) => {
          const description = extractDescription(executionSteps);
          const steps = extractSteps(executionSteps);

          if (!description && steps.length === 0) return null;

          return (
                    <div className="mt-6 px-4">
                              <div className="border border-teal-500 rounded-lg overflow-hidden">
                                        <div className="bg-white border-b border-teal-500 py-2 text-center relative">
                                                  <span className="bg-white px-4 text-teal-600 font-bold text-lg relative z-10">وصف البرنامج</span>
                                                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-teal-500 -z-0"></div>
                                        </div>
                                        <div className="bg-gray-50/50 p-4">
                                                  {description && (
                                                            <p className="text-gray-700 leading-loose text-justify mb-4">{description}</p>
                                                  )}
                                                  {steps.length > 0 && (
                                                            <div className="space-y-2">
                                                                      <h4 className="font-bold text-teal-700 text-sm mb-2">خطوات التنفيذ</h4>
                                                                      {steps.map((step, idx) => (
                                                                                <div key={idx} className="flex gap-2 items-start">
                                                                                          <span className="w-5 h-5 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                                                                                    {idx + 1}
                                                                                          </span>
                                                                                          <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                                                                                </div>
                                                                      ))}
                                                            </div>
                                                  )}
                                        </div>
                              </div>
                    </div>
          );
};

const ObjectivesSection: React.FC<{ objectives?: EnhancedText[] }> = ({ objectives }) => {
          if (!objectives || objectives.length === 0) return null;

          return (
                    <div className="mt-6 px-4">
                              <div className="border border-teal-500 rounded-lg overflow-hidden">
                                        <div className="bg-white border-b border-teal-500 py-2 text-center relative">
                                                  <span className="bg-white px-4 text-teal-600 font-bold text-lg relative z-10">الأهداف</span>
                                                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-teal-500 -z-0"></div>
                                        </div>
                                        <div className="bg-gray-50/50 p-4 space-y-2">
                                                  {objectives.map((obj, idx) => (
                                                            <div key={idx} className="flex items-start gap-3 text-gray-700">
                                                                      <span className="flex-shrink-0 w-6 h-6 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-sm font-bold">
                                                                                {idx + 1}
                                                                      </span>
                                                                      <p className="text-sm leading-relaxed">{getText(obj)}</p>
                                                            </div>
                                                  ))}
                                        </div>
                              </div>
                    </div>
          );
};

const PhotosSection: React.FC<{ photos?: string[] }> = ({ photos }) => {
          if (!photos || photos.length === 0) return null;

          return (
                    <div className="mt-6 px-4">
                              <div className="border border-teal-500 rounded-lg overflow-hidden">
                                        <div className="bg-white border-b border-teal-500 py-2 text-center relative">
                                                  <span className="bg-white px-4 text-teal-600 font-bold text-lg relative z-10">صور من الفعالية</span>
                                                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-teal-500 -z-0"></div>
                                        </div>
                                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                  {photos.slice(0, 4).map((photo, idx) => (
                                                            <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-teal-200">
                                                                      <Image src={photo} alt={`صورة ${idx + 1}`} fill className="object-cover" />
                                                            </div>
                                                  ))}
                                        </div>
                              </div>
                    </div>
          );
};

const Footer: React.FC<{ formData: WizardFormData }> = ({ formData }) => {
          return (
                    <div className="px-4 mt-6 mb-8">
                              {/* Signatures */}
                              <div className="mt-12 grid grid-cols-2 gap-4 text-center">
                                        <div className="flex flex-col items-center">
                                                  <p className="text-teal-700 font-bold mb-8">{formData.activityLeaderTitle || "رائد النشاط"}</p>
                                                  <div className="w-3/4 border-b border-gray-400"></div>
                                                  <p className="text-gray-500 mt-2 text-sm">{formData.activityLeaderName}</p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                                  <p className="text-teal-700 font-bold mb-8">{formData.principalTitle || "مدير المدرسة"}</p>
                                                  <div className="w-3/4 border-b border-gray-400"></div>
                                                  <p className="text-gray-500 mt-2 text-sm">{formData.principalName}</p>
                                        </div>
                              </div>

                              {/* Bottom Banner - Date stamp instead of website */}
                              <div className="mt-12 bg-[#1f4e5f] text-white text-center py-2 rounded-b-xl text-sm flex items-center justify-center gap-4">
                                        <span>{formData.date || new Date().toLocaleDateString('ar-SA')}</span>
                                        <span className="opacity-50">|</span>
                                        <span>{formData.schoolName || "المدرسة"}</span>
                              </div>
                    </div>
          );
};

// --- Main Template Component ---

export default function TemplateExchangeVisit({ formData, reportTypeTitle }: TemplateProps) {
          return (
                    <div className="min-h-screen py-8 px-2 sm:px-4 md:px-8 flex justify-center bg-gray-50/50">
                              {/* A4 Paper Container */}
                              <div
                                        className="w-full max-w-[210mm] bg-white shadow-2xl rounded-xl print:shadow-none print:w-full print:max-w-none print:rounded-none overflow-hidden"
                                        style={{ minHeight: '297mm', direction: 'rtl' }}
                              >
                                        <div className="flex flex-col h-full relative">
                                                  <Header
                                                            region={formData.educationRegion}
                                                            school={formData.schoolName}
                                                            schoolType={formData.schoolType}
                                                            logo={formData.schoolLogo}
                                                            title={formData.title}
                                                  />
                                                  <InfoSection formData={formData} />
                                                  <DescriptionSection executionSteps={formData.executionSteps} />
                                                  <ObjectivesSection objectives={formData.objectives} />
                                                  <PhotosSection photos={formData.photos} />
                                                  <Footer formData={formData} />
                                        </div>
                              </div>
                    </div>
          );
}
