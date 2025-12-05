"use client";

import {
          BuildingOffice2Icon,
          AcademicCapIcon,
} from "@heroicons/react/24/solid";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useWizardStore, EDUCATION_REGIONS } from "@/stores/wizard-store";

export default function StepOrganization() {
          const { formData, updateFormData } = useWizardStore();

          const handleLogoUpload = (file: File) => {
                    if (file.size > 5 * 1024 * 1024) {
                              alert("حجم الملف يجب أن يكون أقل من 5 ميجابايت");
                              return;
                    }

                    const reader = new FileReader();
                    reader.onloadend = () => {
                              updateFormData({ schoolLogo: reader.result as string });
                    };
                    reader.readAsDataURL(file);
          };

          return (
                    <div>
                              <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-slate-900 dark:text-white">
                                        <BuildingOffice2Icon className="w-7 h-7 text-primary" />
                                        <span>بيانات الجهة</span>
                              </h2>
                              <p className="text-slate-600 dark:text-white/60 mb-8">أدخل معلومات المدرسة والإدارة التعليمية</p>

                              <div className="space-y-6">
                                        {/* Education Region */}
                                        <div>
                                                  <label className="block text-sm font-medium mb-2 flex items-center gap-2 text-slate-700 dark:text-white">
                                                            <AcademicCapIcon className="w-4 h-4 text-slate-400 dark:text-white/50" />
                                                            إدارة التعليم <span className="text-accent">*</span>
                                                  </label>
                                                  <select
                                                            value={formData.educationRegion || ""}
                                                            onChange={(e) => updateFormData({ educationRegion: e.target.value })}
                                                            className="form-input"
                                                  >
                                                            <option value="">اختر إدارة التعليم</option>
                                                            {EDUCATION_REGIONS.map((region) => (
                                                                      <option key={region} value={region}>
                                                                                {region}
                                                                      </option>
                                                            ))}
                                                  </select>
                                        </div>

                                        {/* School Name */}
                                        <div>
                                                  <label className="block text-sm font-medium mb-2 flex items-center gap-2 text-slate-700 dark:text-white">
                                                            <BuildingOffice2Icon className="w-4 h-4 text-slate-400 dark:text-white/50" />
                                                            اسم المدرسة <span className="text-accent">*</span>
                                                  </label>
                                                  <input
                                                            type="text"
                                                            value={formData.schoolName || ""}
                                                            onChange={(e) => updateFormData({ schoolName: e.target.value })}
                                                            placeholder="مثال: مدرسة الملك فهد الابتدائية"
                                                            className="form-input"
                                                  />
                                        </div>

                                        {/* Department */}
                                        <div>
                                                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-white">
                                                            القسم / الإدارة <span className="text-slate-400 dark:text-white/40">(اختياري)</span>
                                                  </label>
                                                  <input
                                                            type="text"
                                                            value={formData.department || ""}
                                                            onChange={(e) => updateFormData({ department: e.target.value })}
                                                            placeholder="مثال: قسم النشاط الطلابي"
                                                            className="form-input"
                                                  />
                                        </div>

                                        {/* School Logo Upload */}
                                        <div>
                                                  <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-white">
                                                            شعار المدرسة <span className="text-slate-400 dark:text-white/40">(اختياري)</span>
                                                  </label>
                                                  <div
                                                            className="border-2 border-dashed border-slate-200 dark:border-white/20 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-slate-50 dark:bg-transparent relative overflow-hidden"
                                                            onDragOver={(e) => e.preventDefault()}
                                                            onDrop={(e) => {
                                                                      e.preventDefault();
                                                                      if (e.dataTransfer.files?.[0]) {
                                                                                handleLogoUpload(e.dataTransfer.files[0]);
                                                                      }
                                                            }}
                                                  >
                                                            <input
                                                                      type="file"
                                                                      className="hidden"
                                                                      accept="image/*"
                                                                      id="logo-upload"
                                                                      onChange={(e) => {
                                                                                if (e.target.files?.[0]) {
                                                                                          handleLogoUpload(e.target.files[0]);
                                                                                }
                                                                      }}
                                                            />
                                                            <label htmlFor="logo-upload" className="cursor-pointer block">
                                                                      {formData.schoolLogo ? (
                                                                                <div className="relative w-32 h-32 mx-auto">
                                                                                          <img
                                                                                                    src={formData.schoolLogo}
                                                                                                    alt="School Logo"
                                                                                                    className="w-full h-full object-contain"
                                                                                          />
                                                                                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                                                                                    <p className="text-white text-xs">تغيير الشعار</p>
                                                                                          </div>
                                                                                </div>
                                                                      ) : (
                                                                                <>
                                                                                          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-white/10 flex items-center justify-center">
                                                                                                    <ArrowUpTrayIcon className="w-8 h-8 text-slate-400 dark:text-white/50" />
                                                                                          </div>
                                                                                          <p className="text-slate-600 dark:text-white/60 mb-2">اسحب الصورة هنا أو اضغط للرفع</p>
                                                                                          <p className="text-slate-400 dark:text-white/40 text-sm">PNG, JPG حتى 5MB</p>
                                                                                </>
                                                                      )}
                                                            </label>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          );
}
