import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="relative mb-8">
      {/* Top Gradient Bar */}
      <div className="h-32 w-full bg-gradient-to-r from-emerald-500 to-sky-600 rounded-t-xl relative overflow-hidden flex items-start justify-between p-6 text-white">
        
        {/* Right Side: Ministry Logo Placeholder */}
        <div className="flex flex-col items-center">
            {/* Using a placeholder SVG for the Ministry of Education KSA logo concept */}
            <div className="flex items-center gap-3">
               <div className="text-right">
                   <p className="text-sm opacity-90">الإدارة العامة للتعليم</p>
                   <p className="text-sm opacity-90">بالمنطقة .............</p>
                   <p className="text-sm opacity-90">مدرسة .............</p>
               </div>
               <div className="border-r border-white/30 pr-3">
                   {/* Abstract representation of the logo dots/palm */}
                   <svg width="60" height="50" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 10 C 20 5, 30 5, 40 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="15" cy="20" r="2" fill="white" />
                        <circle cx="22" cy="18" r="2" fill="white" />
                        <circle cx="29" cy="16" r="2" fill="white" />
                        <circle cx="36" cy="18" r="2" fill="white" />
                        <circle cx="43" cy="20" r="2" fill="white" />
                        <path d="M15 35 L 45 35" stroke="white" strokeWidth="1" />
                        <text x="12" y="45" fill="white" fontSize="8" fontWeight="bold">وزارة التعليم</text>
                   </svg>
               </div>
            </div>
        </div>
      </div>

      {/* Centered Title Box */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-6 w-3/4 md:w-1/2">
        <div className="bg-[#1f4e5f] text-white text-center py-3 rounded-xl shadow-lg border-2 border-white">
          <h1 className="text-lg md:text-xl font-bold">استمارة تبادل زيارات بين المعلمين</h1>
        </div>
      </div>
    </div>
  );
};