"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowUpTrayIcon,
  XMarkIcon,
  LinkIcon,
  QrCodeIcon,
  CameraIcon,
  PencilSquareIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { PhotoIcon, UserIcon } from "@heroicons/react/24/solid";
import { useWizardStore } from "@/stores/wizard-store";
import { useUserProfileStore } from "@/stores/user-profile-store";

export default function StepMedia() {
  const { formData, updateFormData } = useWizardStore();
  const { profile, updateProfile } = useUserProfileStore();
  const [dragOver, setDragOver] = useState(false);
  const [saveToProfile, setSaveToProfile] = useState(true);
  const [hasLoadedProfile, setHasLoadedProfile] = useState(false);

  const photos = formData.photos || [];
  const MIN_PHOTOS = 1;
  const MAX_PHOTOS = 4;

  // Load saved profile data for personnel on first render
  useEffect(() => {
    if (!hasLoadedProfile && (profile.activityLeaderName || profile.principalName)) {
      updateFormData({
        activityLeaderName: formData.activityLeaderName || profile.activityLeaderName,
        activityLeaderTitle: formData.activityLeaderTitle || profile.activityLeaderTitle,
        principalName: formData.principalName || profile.principalName,
        principalTitle: formData.principalTitle || profile.principalTitle,
      });
      setHasLoadedProfile(true);
    }
  }, [profile, hasLoadedProfile]);

  const handlePersonnelChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
    if (saveToProfile) {
      updateProfile({ [field]: value });
    }
  };

  const handleFiles = (files: File[]) => {
    const remainingSlots = MAX_PHOTOS - photos.length;
    const filesToProcess = files.slice(0, remainingSlots);

    filesToProcess.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert("حجم الملف يجب أن يكون أقل من 5 ميجابايت");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateFormData({ photos: [...(useWizardStore.getState().formData.photos || []), base64String] });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const removePhoto = (index: number) => {
    const updated = photos.filter((_, i) => i !== index);
    updateFormData({ photos: updated });
  };

  // Generate QR code URL using a free API
  const getQRCodeUrl = (url: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-3 text-slate-900 dark:text-white">
        <PhotoIcon className="w-7 h-7 text-primary" />
        <span>الشواهد والتوقيعات</span>
      </h2>
      <p className="text-slate-600 dark:text-white/60 mb-8">أضف صور الفعالية والتوقيعات</p>

      <div className="space-y-8">
        {/* Photo Upload Section */}
        <div>
          <label className="block text-sm font-medium mb-4 flex items-center gap-2 text-slate-700 dark:text-white">
            <CameraIcon className="w-4 h-4 text-slate-400 dark:text-white/50" />
            صور الشواهد <span className="text-accent">*</span>
            <span className="text-slate-400 dark:text-white/40 mr-2">(صورة واحدة كحد أدنى - 4 صور كحد أقصى)</span>
          </label>

          {/* Upload Area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer bg-slate-50 dark:bg-transparent
              ${dragOver ? 'border-primary bg-primary/10' : 'border-slate-200 dark:border-white/20 hover:border-slate-300 dark:hover:border-white/40'}
              ${photos.length >= MAX_PHOTOS ? 'opacity-50 pointer-events-none' : ''}
            `}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              id="photo-upload"
              disabled={photos.length >= MAX_PHOTOS}
              onChange={(e) => {
                if (e.target.files) {
                  handleFiles(Array.from(e.target.files));
                }
              }}
            />
            <label htmlFor="photo-upload" className="cursor-pointer">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center">
                <ArrowUpTrayIcon className="w-6 h-6 text-slate-400 dark:text-white/60" />
              </div>
              <p className="text-slate-700 dark:text-white mb-1">اسحب الصور هنا أو اضغط للرفع</p>
              <p className="text-slate-400 dark:text-white/40 text-sm">PNG, JPG حتى 5MB ({photos.length}/{MAX_PHOTOS})</p>
            </label>
          </div>

          {/* Photo Preview Grid */}
          {photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative group aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-white/10"
                >
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 left-2 z-10 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <XMarkIcon className="w-4 h-4 text-white" />
                  </button>
                  {/* Actual Image Preview */}
                  <Image
                    src={photo}
                    alt={`صورة ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 right-2 text-sm text-white bg-black/50 px-2 py-1 rounded">
                    صورة {index + 1}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Minimum photos warning */}
          {photos.length < MIN_PHOTOS && (
            <p className="text-amber-600 dark:text-amber-400 text-sm mt-2">
              ⚠️ يجب رفع صورة واحدة على الأقل
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-white/10" />

        {/* Signatures Section */}
        <div>
          <label className="block text-sm font-medium mb-4 flex items-center gap-2 text-slate-700 dark:text-white">
            <PencilSquareIcon className="w-4 h-4 text-slate-400 dark:text-white/50" />
            التوقيعات
          </label>

          {/* Show saved info notice */}
          {(profile.activityLeaderName || profile.principalName) && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3">
              <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-green-700 dark:text-green-300 text-sm">تم تحميل بيانات التوقيعات المحفوظة مسبقاً</span>
            </div>
          )}

          {/* Save checkbox */}
          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={saveToProfile}
                onChange={(e) => setSaveToProfile(e.target.checked)}
                className="w-4 h-4 accent-primary"
              />

            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Activity Leader */}
            <div className="space-y-3">
              <label className="block text-sm text-slate-600 dark:text-white/60 flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
              </label>

              {/* Title Selection */}
              {/* Title Selection */}
              <select
                value={formData.activityLeaderTitle || "رائد النشاط"}
                onChange={(e) => handlePersonnelChange('activityLeaderTitle', e.target.value)}
                className="form-input text-sm bg-slate-50 border-slate-200"
              >
                <option value="رائد النشاط">رائد/ة النشاط</option>
                <option value="الموجه الطلابي">الموجه/ة الطلابي/ة</option>
                <option value="معلم المادة">معلم/ة المادة</option>
                <option value="وكيل المدرسة">وكيل/ة المدرسة</option>
                <option value="مسؤول النشاط">مسؤول/ة النشاط</option>
                <option value="منسق البرنامج">منسق/ة البرنامج</option>
                <option value="مشرف النادي">مشرف/ة النادي</option>
              </select>

              {/* Name Input */}
              <input
                type="text"
                value={formData.activityLeaderName || ""}
                onChange={(e) => handlePersonnelChange('activityLeaderName', e.target.value)}
                placeholder="اسم رائد/ة النشاط"
                className="form-input"
              />
            </div>

            {/* Principal */}
            <div className="space-y-3">
              <label className="block text-sm text-slate-600 dark:text-white/60 flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                <span>مدير/ة المدرسة</span>
                <span className="text-accent">*</span>
              </label>

              {/* Title Selection */}
              <select
                value={formData.principalTitle || "مدير المدرسة"}
                onChange={(e) => handlePersonnelChange('principalTitle', e.target.value)}
                className="form-input text-sm bg-slate-50 border-slate-200"
              >
                <option value="مدير المدرسة">مدير/ة المدرسة</option>
                <option value="وكيل المدرسة">وكيل/ة المدرسة</option>
                <option value="المشرف التربوي">المشرف/ة التربوي/ة</option>
                <option value="قائد المدرسة">قائد/ة المدرسة</option>
                <option value="المساعد الإداري">المساعد/ة الإداري/ة</option>
              </select>

              {/* Name Input */}
              <input
                type="text"
                value={formData.principalName || ""}
                onChange={(e) => handlePersonnelChange('principalName', e.target.value)}
                placeholder="اسم مدير المدرسة"
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-white/10" />

        {/* Evidence Link Section */}
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2 text-slate-700 dark:text-white">
            <LinkIcon className="w-4 h-4" />
            <span>رابط الشواهد</span>
            <span className="text-slate-400 dark:text-white/40">(اختياري - سيتم تحويله لباركود QR)</span>
          </label>
          <div className="relative">
            <input
              type="url"
              value={formData.evidenceLink || ""}
              onChange={(e) => updateFormData({ evidenceLink: e.target.value })}
              placeholder="https://drive.google.com/..."
              className="form-input pr-12"
              dir="ltr"
            />
            {formData.evidenceLink && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <QrCodeIcon className="w-5 h-5 text-primary" />
              </div>
            )}
          </div>

          {/* QR Code Preview */}
          {formData.evidenceLink && (
            <div className="mt-4 flex items-center gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
              <div className="w-24 h-24 relative bg-white rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={getQRCodeUrl(formData.evidenceLink)}
                  alt="QR Code"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-white mb-1">باركود QR للشواهد</p>
                <p className="text-xs text-slate-500 dark:text-white/50">امسح الباركود للوصول للشواهد الإضافية</p>
                <a
                  href={formData.evidenceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline mt-1 block truncate max-w-[200px]"
                >
                  {formData.evidenceLink}
                </a>
              </div>
            </div>
          )}

          <p className="text-slate-400 dark:text-white/40 text-sm mt-2">
            يمكنك وضع رابط Google Drive أو أي رابط آخر للشواهد الإضافية
          </p>
        </div>

        {/* Tip */}
        <div className="flex items-start gap-3 text-slate-500 dark:text-white/50 text-sm bg-slate-50 dark:bg-white/5 rounded-xl p-4 border border-slate-100 dark:border-transparent">
          <QrCodeIcon className="w-5 h-5 flex-shrink-0" />
          <p>عند إنشاء ملف PDF سيظهر باركود QR للرابط إن وجد، مما يتيح مشاهدة عدد لا نهائي من الشواهد.</p>
        </div>
      </div>
    </div>
  );
}
