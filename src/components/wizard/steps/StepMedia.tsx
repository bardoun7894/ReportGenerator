"use client";

import { useState } from "react";
import {
  ArrowUpTrayIcon,
  XMarkIcon,
  LinkIcon,
  QrCodeIcon,
  CameraIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { PhotoIcon, UserIcon } from "@heroicons/react/24/solid";
import { useWizardStore } from "@/stores/wizard-store";

export default function StepMedia() {
  const { formData, updateFormData } = useWizardStore();
  const [dragOver, setDragOver] = useState(false);

  const photos = formData.photos || [];
  const MAX_PHOTOS = 2;

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
            <span className="text-slate-400 dark:text-white/40 mr-2">(صورة واحدة كحد أدنى - صورتين كحد أقصى)</span>
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
              <p className="text-slate-400 dark:text-white/40 text-sm">PNG, JPG حتى 5MB</p>
            </label>
          </div>

          {/* Photo Preview Grid */}
          {photos.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-4">
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
                  <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-white/30">
                    <PhotoIcon className="w-12 h-12" />
                  </div>
                  <div className="absolute bottom-2 right-2 text-sm text-white/60 bg-black/50 px-2 py-1 rounded">
                    صورة الشاهد {index === 0 ? 'الأول' : 'الثاني'}
                  </div>
                </div>
              ))}
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Activity Leader */}
            <div>
              <label className="block text-sm text-slate-600 dark:text-white/60 mb-2 flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                رائد النشاط <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                value={formData.activityLeaderName || ""}
                onChange={(e) => updateFormData({ activityLeaderName: e.target.value })}
                placeholder="اسم رائد النشاط"
                className="form-input"
              />
            </div>
            {/* Principal */}
            <div>
              <label className="block text-sm text-slate-600 dark:text-white/60 mb-2 flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                مدير المدرسة <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                value={formData.principalName || ""}
                onChange={(e) => updateFormData({ principalName: e.target.value })}
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
