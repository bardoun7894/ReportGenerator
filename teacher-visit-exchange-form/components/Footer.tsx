import React from 'react';
import { TextAreaBox } from './ui/InputBox';

export const Footer: React.FC = () => {
  return (
    <div className="px-4 mt-2 mb-8">
        {/* Feedback Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextAreaBox label="نقاط تميز أداء المعلم المزار:" />
            <TextAreaBox label="التوصيات:" />
        </div>

        {/* Signatures */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
                <p className="text-teal-700 font-bold mb-8">المعلم المزار</p>
                <div className="w-3/4 border-b border-gray-400"></div>
                <p className="text-gray-500 mt-2 text-sm">اسم المعلم</p>
            </div>
            <div className="flex flex-col items-center">
                <p className="text-teal-700 font-bold mb-8">المعلم الزائر</p>
                <div className="w-3/4 border-b border-gray-400"></div>
                <p className="text-gray-500 mt-2 text-sm">اسم المعلم الأول</p>
            </div>
            <div className="flex flex-col items-center">
                <p className="text-teal-700 font-bold mb-8">مدير المدرسة</p>
                <div className="w-3/4 border-b border-gray-400"></div>
                <p className="text-gray-500 mt-2 text-sm">اسم المدير</p>
            </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-[#1f4e5f] text-white text-center py-2 rounded-b-xl text-sm">
            موقع نماذج تعليمية - www.edu-forms.com
        </div>
    </div>
  );
};