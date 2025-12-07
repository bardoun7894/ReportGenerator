"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarDaysIcon, ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";

// Arabic month names
const ARABIC_MONTHS = [
          "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
          "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

// Arabic day names (short)
const ARABIC_DAYS = ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];

// Convert number to Arabic numerals
const toArabicNumeral = (num: number): string => {
          const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
          return num.toString().split('').map(digit => arabicNumerals[parseInt(digit)] || digit).join('');
};

interface ArabicDatePickerProps {
          value: string; // ISO format: YYYY-MM-DD
          onChange: (value: string) => void;
          placeholder?: string;
          className?: string;
}

export default function ArabicDatePicker({ value, onChange, placeholder = "اختر التاريخ", className = "" }: ArabicDatePickerProps) {
          const [isOpen, setIsOpen] = useState(false);
          const [currentMonth, setCurrentMonth] = useState(new Date());
          const containerRef = useRef<HTMLDivElement>(null);

          // Parse the value to Date
          const selectedDate = value ? new Date(value) : null;

          // Close on outside click
          useEffect(() => {
                    const handleClickOutside = (event: MouseEvent) => {
                              if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                                        setIsOpen(false);
                              }
                    };
                    document.addEventListener("mousedown", handleClickOutside);
                    return () => document.removeEventListener("mousedown", handleClickOutside);
          }, []);

          // Get days in month
          const getDaysInMonth = (date: Date) => {
                    const year = date.getFullYear();
                    const month = date.getMonth();
                    const firstDay = new Date(year, month, 1);
                    const lastDay = new Date(year, month + 1, 0);
                    const daysInMonth = lastDay.getDate();
                    const startingDay = firstDay.getDay();
                    return { daysInMonth, startingDay };
          };

          const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);

          // Format display value
          const formatDisplayValue = (date: Date | null) => {
                    if (!date) return "";
                    const day = toArabicNumeral(date.getDate());
                    const month = toArabicNumeral(date.getMonth() + 1);
                    const year = toArabicNumeral(date.getFullYear());
                    return `${day}/${month}/${year}`;
          };

          // Handle day click
          const handleDayClick = (day: number) => {
                    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                    const isoDate = newDate.toISOString().split('T')[0];
                    onChange(isoDate);
                    setIsOpen(false);
          };

          // Navigate months
          const prevMonth = () => {
                    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
          };

          const nextMonth = () => {
                    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
          };

          // Check if a day is selected
          const isSelected = (day: number) => {
                    if (!selectedDate) return false;
                    return (
                              selectedDate.getDate() === day &&
                              selectedDate.getMonth() === currentMonth.getMonth() &&
                              selectedDate.getFullYear() === currentMonth.getFullYear()
                    );
          };

          // Check if a day is today
          const isToday = (day: number) => {
                    const today = new Date();
                    return (
                              today.getDate() === day &&
                              today.getMonth() === currentMonth.getMonth() &&
                              today.getFullYear() === currentMonth.getFullYear()
                    );
          };

          // Generate calendar days
          const renderDays = () => {
                    const days = [];

                    // Empty cells for days before the first day of month
                    for (let i = 0; i < startingDay; i++) {
                              days.push(<div key={`empty-${i}`} className="h-8 w-8" />);
                    }

                    // Days of the month
                    for (let day = 1; day <= daysInMonth; day++) {
                              days.push(
                                        <button
                                                  key={day}
                                                  type="button"
                                                  onClick={() => handleDayClick(day)}
                                                  className={`
            h-8 w-8 rounded-lg text-sm font-medium transition-all
            ${isSelected(day)
                                                                      ? "bg-primary text-white shadow-md"
                                                                      : isToday(day)
                                                                                ? "bg-primary/20 text-primary"
                                                                                : "hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white"
                                                            }
          `}
                                        >
                                                  {toArabicNumeral(day)}
                                        </button>
                              );
                    }

                    return days;
          };

          return (
                    <div ref={containerRef} className={`relative ${className}`}>
                              {/* Input Field */}
                              <div
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="form-input flex items-center justify-between cursor-pointer"
                              >
                                        <span className={value ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-white/40"}>
                                                  {value ? formatDisplayValue(selectedDate) : placeholder}
                                        </span>
                                        <CalendarDaysIcon className="w-5 h-5 text-slate-400 dark:text-white/50" />
                              </div>

                              {/* Calendar Dropdown */}
                              {isOpen && (
                                        <div className="absolute z-50 top-full mt-2 right-0 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-white/10 p-4 w-72 animate-in fade-in slide-in-from-top-2 duration-200">
                                                  {/* Month/Year Header */}
                                                  <div className="flex items-center justify-between mb-4">
                                                            <button
                                                                      type="button"
                                                                      onClick={nextMonth}
                                                                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                                                            >
                                                                      <ChevronRightIcon className="w-5 h-5 text-slate-600 dark:text-white" />
                                                            </button>

                                                            <span className="font-bold text-slate-900 dark:text-white">
                                                                      {ARABIC_MONTHS[currentMonth.getMonth()]} {toArabicNumeral(currentMonth.getFullYear())}
                                                            </span>

                                                            <button
                                                                      type="button"
                                                                      onClick={prevMonth}
                                                                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                                                            >
                                                                      <ChevronLeftIcon className="w-5 h-5 text-slate-600 dark:text-white" />
                                                            </button>
                                                  </div>

                                                  {/* Day Names */}
                                                  <div className="grid grid-cols-7 gap-1 mb-2">
                                                            {ARABIC_DAYS.map((day) => (
                                                                      <div key={day} className="h-8 w-8 flex items-center justify-center text-xs font-medium text-slate-400 dark:text-white/50">
                                                                                {day}
                                                                      </div>
                                                            ))}
                                                  </div>

                                                  {/* Days Grid */}
                                                  <div className="grid grid-cols-7 gap-1">
                                                            {renderDays()}
                                                  </div>

                                                  {/* Today Button */}
                                                  <button
                                                            type="button"
                                                            onClick={() => {
                                                                      const today = new Date();
                                                                      setCurrentMonth(today);
                                                                      handleDayClick(today.getDate());
                                                            }}
                                                            className="w-full mt-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                  >
                                                            اليوم
                                                  </button>
                                        </div>
                              )}
                    </div>
          );
}
