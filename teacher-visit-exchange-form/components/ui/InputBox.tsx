import React from 'react';

interface InputBoxProps {
  label: string;
  value?: string;
  placeholder?: string;
  className?: string;
}

export const InputBox: React.FC<InputBoxProps> = ({ label, value, placeholder, className = "" }) => {
  return (
    <div className={`relative border border-teal-500 rounded-lg pt-3 pb-2 px-3 mt-4 ${className}`}>
      <label className="absolute -top-3 right-4 bg-white px-2 text-teal-600 font-bold text-sm sm:text-base whitespace-nowrap">
        {label}
      </label>
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        className="w-full outline-none bg-transparent text-gray-800 text-right placeholder-gray-400"
      />
    </div>
  );
};

export const TextAreaBox: React.FC<InputBoxProps> = ({ label, value, className = "" }) => {
    return (
      <div className={`relative border border-teal-500 rounded-lg pt-6 pb-2 px-3 mt-5 h-32 ${className}`}>
        <label className="absolute -top-3 right-4 bg-white px-2 text-teal-600 font-bold text-sm sm:text-base whitespace-nowrap">
          {label}
        </label>
        <textarea
          defaultValue={value}
          className="w-full h-full outline-none bg-transparent text-gray-800 text-right resize-none border-b border-dashed border-gray-200"
          style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 32px)',
              lineHeight: '32px',
              paddingTop: '0px'
          }}
        />
      </div>
    );
  };