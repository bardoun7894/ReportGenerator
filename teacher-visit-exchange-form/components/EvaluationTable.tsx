import React from 'react';
import { EVALUATION_SECTIONS } from '../constants';

export const EvaluationTable: React.FC = () => {
  return (
    <div className="mt-8 px-4">
      <div className="border border-teal-500 rounded-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-white border-b border-teal-500 py-2 text-center relative">
           <span className="bg-white px-4 text-teal-600 font-bold text-lg relative z-10">عناصر التقويم</span>
           <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-teal-500 -z-0"></div>
           <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center -z-0">
               <div className="bg-white px-4 h-full"></div>
           </div>
        </div>

        {/* Content */}
        <div className="bg-gray-50/50 p-4 space-y-4">
            {EVALUATION_SECTIONS.map((section, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:items-start border-b border-gray-200 last:border-0 pb-3 last:pb-0">
                    
                    {/* Items Text Column */}
                    <div className="flex-1 text-right pl-4">
                        <h3 className="font-bold text-gray-800 mb-1">{section.title}</h3>
                        {section.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="text-gray-600 text-sm mb-1 pr-2">
                                {item}
                            </div>
                        ))}
                    </div>

                    {/* Checkboxes Column */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center space-y-2 mt-2 md:mt-0">
                        {section.items.map((_, itemIdx) => (
                            <div key={itemIdx} className="flex items-center justify-end gap-2 md:gap-4 text-xs sm:text-sm">
                                <label className="flex items-center gap-1 cursor-pointer hover:bg-teal-50 p-1 rounded">
                                    <input type="checkbox" className="accent-teal-600 w-4 h-4 rounded border-gray-300" />
                                    <span>متحقق</span>
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer hover:bg-teal-50 p-1 rounded">
                                    <input type="checkbox" className="accent-teal-600 w-4 h-4 rounded border-gray-300" />
                                    <span>متحقق جزئياً</span>
                                </label>
                                <label className="flex items-center gap-1 cursor-pointer hover:bg-teal-50 p-1 rounded">
                                    <input type="checkbox" className="accent-teal-600 w-4 h-4 rounded border-gray-300" />
                                    <span>غير متحقق</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};