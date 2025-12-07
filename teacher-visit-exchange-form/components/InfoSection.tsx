import React from 'react';
import { InputBox } from './ui/InputBox';

export const InfoSection: React.FC = () => {
  return (
    <div className="mt-10 px-4 space-y-2">
      {/* Row 1: Teachers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <InputBox label="اسم المعلم الزائر:" placeholder="اسم المعلم الأول" />
        <InputBox label="اسم المعلم المزار:" placeholder="اسم المعلم" />
      </div>

      {/* Row 2: Date & Class */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputBox label="اليوم / التاريخ:" placeholder="الأحد - 12/12/1447هـ" />
        <InputBox label="الصف / الفصل:" placeholder="الصف" />
        <InputBox label="الفصل الدراسي:" placeholder="الأول" />
      </div>

      {/* Row 3: Subject & Lesson */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputBox label="المادة:" placeholder="مادة" className="md:col-span-1" />
        <InputBox label="الوحدة / عنوان الدرس:" placeholder="عنوان الدرس" className="md:col-span-2" />
      </div>
    </div>
  );
};