"use client";

import { useState, useRef, useEffect } from "react";
import { CalendarDaysIcon, ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";

// Hijri month names
const HIJRI_MONTHS = [
          "محرم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأولى", "جمادى الآخرة",
          "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
];

// Arabic day names (short) - Week starts on Saturday in Islamic calendar
const ARABIC_DAYS = ["سبت", "أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة"];

// Convert number to Arabic numerals
const toArabicNumeral = (num: number): string => {
          const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
          return num.toString().split('').map(digit => arabicNumerals[parseInt(digit)] || digit).join('');
};

// Hijri to Gregorian conversion using Umm al-Qura algorithm approximation
function hijriToGregorian(hYear: number, hMonth: number, hDay: number): Date {
          // Approximate calculation based on Julian Day Number
          const jd = Math.floor((11 * hYear + 3) / 30) + 354 * hYear + 30 * hMonth - Math.floor((hMonth - 1) / 2) + hDay + 1948440 - 385;

          // Convert Julian Day to Gregorian
          const z = jd;
          const a = Math.floor((z - 1867216.25) / 36524.25);
          const b = z + 1 + a - Math.floor(a / 4);
          const c = b + 1524;
          const d = Math.floor((c - 122.1) / 365.25);
          const e = Math.floor(365.25 * d);
          const f = Math.floor((c - e) / 30.6001);

          const day = c - e - Math.floor(30.6001 * f);
          const month = f - (f > 13 ? 13 : 1);
          const year = d - (month > 2 ? 4716 : 4715);

          return new Date(year, month - 1, day);
}

// Gregorian to Hijri conversion
function gregorianToHijri(date: Date): { year: number; month: number; day: number } {
          const gYear = date.getFullYear();
          const gMonth = date.getMonth() + 1;
          const gDay = date.getDate();

          // Calculate Julian Day Number
          let jd: number;
          if (gMonth > 2) {
                    jd = Math.floor(365.25 * (gYear + 4716)) + Math.floor(30.6001 * (gMonth + 1)) + gDay - 1524.5;
          } else {
                    jd = Math.floor(365.25 * (gYear - 1 + 4716)) + Math.floor(30.6001 * (gMonth + 13)) + gDay - 1524.5;
          }

          jd = Math.floor(jd) + 1;

          // Convert Julian Day to Hijri
          const l = jd - 1948440 + 10632;
          const n = Math.floor((l - 1) / 10631);
          const l2 = l - 10631 * n + 354;
          const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) + Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
          const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
          const month = Math.floor((24 * l3) / 709);
          const day = l3 - Math.floor((709 * month) / 24);
          const year = 30 * n + j - 30;

          return { year, month, day };
}

// Get days in Hijri month (approximation: odd months have 30 days, even have 29, except in leap years)
function getDaysInHijriMonth(hYear: number, hMonth: number): number {
          // Hijri months alternate between 30 and 29 days
          // Month 12 has 30 days in leap years
          if (hMonth % 2 === 1) return 30; // Odd months have 30 days
          if (hMonth === 12 && isHijriLeapYear(hYear)) return 30;
          return 29;
}

// Check if Hijri year is a leap year (has 30 days in Dhul-Hijjah)
function isHijriLeapYear(hYear: number): boolean {
          return ((11 * hYear + 14) % 30) < 11;
}

// Get first day of week for Hijri month (0 = Saturday in our calendar)
function getFirstDayOfHijriMonth(hYear: number, hMonth: number): number {
          const gDate = hijriToGregorian(hYear, hMonth, 1);
          // Convert to Saturday-based week (0 = Saturday)
          return (gDate.getDay() + 1) % 7;
}

interface ArabicDatePickerProps {
          value: string; // ISO format: YYYY-MM-DD (Gregorian)
          onChange: (value: string) => void;
          placeholder?: string;
          className?: string;
}

export default function ArabicDatePicker({ value, onChange, placeholder = "اختر التاريخ", className = "" }: ArabicDatePickerProps) {
          const [isOpen, setIsOpen] = useState(false);
          const containerRef = useRef<HTMLDivElement>(null);

          // Current displayed Hijri month/year
          const today = new Date();
          const todayHijri = gregorianToHijri(today);
          const [currentHijriYear, setCurrentHijriYear] = useState(todayHijri.year);
          const [currentHijriMonth, setCurrentHijriMonth] = useState(todayHijri.month);

          // Parse the value to Hijri
          const selectedHijri = value ? gregorianToHijri(new Date(value)) : null;

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

          // Get days info for current Hijri month
          const daysInMonth = getDaysInHijriMonth(currentHijriYear, currentHijriMonth);
          const startingDay = getFirstDayOfHijriMonth(currentHijriYear, currentHijriMonth);

          // Format display value in Hijri
          const formatDisplayValue = () => {
                    if (!selectedHijri) return "";
                    const day = toArabicNumeral(selectedHijri.day);
                    const month = HIJRI_MONTHS[selectedHijri.month - 1];
                    const year = toArabicNumeral(selectedHijri.year);
                    return `${day} ${month} ${year}`;
          };

          // Handle day click
          const handleDayClick = (day: number) => {
                    const gDate = hijriToGregorian(currentHijriYear, currentHijriMonth, day);
                    const isoDate = gDate.toISOString().split('T')[0];
                    onChange(isoDate);
                    setIsOpen(false);
          };

          // Navigate months
          const prevMonth = () => {
                    if (currentHijriMonth === 1) {
                              setCurrentHijriMonth(12);
                              setCurrentHijriYear(currentHijriYear - 1);
                    } else {
                              setCurrentHijriMonth(currentHijriMonth - 1);
                    }
          };

          const nextMonth = () => {
                    if (currentHijriMonth === 12) {
                              setCurrentHijriMonth(1);
                              setCurrentHijriYear(currentHijriYear + 1);
                    } else {
                              setCurrentHijriMonth(currentHijriMonth + 1);
                    }
          };

          // Check if a day is selected
          const isSelected = (day: number) => {
                    if (!selectedHijri) return false;
                    return (
                              selectedHijri.day === day &&
                              selectedHijri.month === currentHijriMonth &&
                              selectedHijri.year === currentHijriYear
                    );
          };

          // Check if a day is today
          const isToday = (day: number) => {
                    return (
                              todayHijri.day === day &&
                              todayHijri.month === currentHijriMonth &&
                              todayHijri.year === currentHijriYear
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
                                                  {value ? formatDisplayValue() : placeholder}
                                        </span>
                                        <CalendarDaysIcon className="w-5 h-5 text-slate-400 dark:text-white/50" />
                              </div>

                              {/* Calendar Dropdown */}
                              {isOpen && (
                                        <div className="absolute z-50 top-full mt-2 right-0 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 w-80 animate-in fade-in slide-in-from-top-2 duration-200">
                                                  {/* Month/Year Header */}
                                                  <div className="flex items-center justify-between mb-4">
                                                            <button
                                                                      type="button"
                                                                      onClick={nextMonth}
                                                                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                                                            >
                                                                      <ChevronRightIcon className="w-5 h-5 text-slate-600 dark:text-white" />
                                                            </button>

                                                            <span className="font-bold text-slate-900 dark:text-white text-center">
                                                                      {HIJRI_MONTHS[currentHijriMonth - 1]} {toArabicNumeral(currentHijriYear)} هـ
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
                                                                      setCurrentHijriYear(todayHijri.year);
                                                                      setCurrentHijriMonth(todayHijri.month);
                                                                      handleDayClick(todayHijri.day);
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
