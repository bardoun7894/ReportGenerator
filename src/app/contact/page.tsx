"use client";

import { useState } from "react";
import Link from "next/link";
import {
          DocumentTextIcon,
          EnvelopeIcon,
          UserIcon,
          ChatBubbleLeftRightIcon,
          PaperAirplaneIcon,
          MapPinIcon,
          PhoneIcon,
} from "@heroicons/react/24/outline";
import { ThemeToggle } from "@/components/theme-toggle";

export default function ContactPage() {
          const [formData, setFormData] = useState({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
          });
          const [isSubmitting, setIsSubmitting] = useState(false);
          const [submitted, setSubmitted] = useState(false);

          const handleSubmit = async (e: React.FormEvent) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    // Placeholder for form submission
                    setTimeout(() => {
                              setIsSubmitting(false);
                              setSubmitted(true);
                    }, 1500);
          };

          return (
                    <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
                              {/* Background */}
                              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 dark:bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
                                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-100/40 dark:bg-amber-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
                              </div>

                              {/* Header */}
                              <header className="relative z-10 flex justify-between items-center px-6 lg:px-12 py-5">
                                        <Link href="/" className="flex items-center gap-3">
                                                  <div className="w-11 h-11 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 dark:shadow-none">
                                                            <DocumentTextIcon className="w-6 h-6 text-white" />
                                                  </div>
                                                  <div>
                                                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">نماذج تعليمية</span>
                                                            <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1">منصة تقاريرك</p>
                                                  </div>
                                        </Link>
                                        <ThemeToggle />
                              </header>

                              {/* Content */}
                              <main className="relative z-10 px-6 lg:px-12 py-12">
                                        <div className="max-w-6xl mx-auto">
                                                  {/* Title */}
                                                  <div className="text-center mb-12">
                                                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                                                                      <ChatBubbleLeftRightIcon className="w-8 h-8 text-primary" />
                                                            </div>
                                                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                                                      تواصل معنا
                                                            </h1>
                                                            <p className="text-slate-600 dark:text-slate-400">
                                                                      نسعد بتواصلك معنا. أرسل استفسارك وسنرد عليك في أقرب وقت.
                                                            </p>
                                                  </div>

                                                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                                            {/* Contact Info */}
                                                            <div className="lg:col-span-1 space-y-6">
                                                                      <div className="glass-card p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5">
                                                                                <div className="flex items-start gap-4">
                                                                                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                                                                                    <EnvelopeIcon className="w-6 h-6 text-primary" />
                                                                                          </div>
                                                                                          <div>
                                                                                                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">البريد الإلكتروني</h3>
                                                                                                    <p className="text-slate-600 dark:text-slate-400 text-sm">support@ta9rirak.com</p>
                                                                                          </div>
                                                                                </div>
                                                                      </div>

                                                                      <div className="glass-card p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5">
                                                                                <div className="flex items-start gap-4">
                                                                                          <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                                                                                    <PhoneIcon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                                                                          </div>
                                                                                          <div>
                                                                                                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">الهاتف</h3>
                                                                                                    <p className="text-slate-600 dark:text-slate-400 text-sm" dir="ltr">+966 50 XXX XXXX</p>
                                                                                          </div>
                                                                                </div>
                                                                      </div>

                                                                      <div className="glass-card p-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5">
                                                                                <div className="flex items-start gap-4">
                                                                                          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                                                                                    <MapPinIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                                                                          </div>
                                                                                          <div>
                                                                                                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">الموقع</h3>
                                                                                                    <p className="text-slate-600 dark:text-slate-400 text-sm">المملكة العربية السعودية</p>
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            </div>

                                                            {/* Contact Form */}
                                                            <div className="lg:col-span-2">
                                                                      <div className="glass-card p-8 border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5">
                                                                                {submitted ? (
                                                                                          <div className="text-center py-12">
                                                                                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                                                                                              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                                                              </svg>
                                                                                                    </div>
                                                                                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                                                                                              تم إرسال رسالتك بنجاح!
                                                                                                    </h3>
                                                                                                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                                                                                                              شكراً لتواصلك معنا. سنرد عليك في أقرب وقت ممكن.
                                                                                                    </p>
                                                                                                    <button
                                                                                                              onClick={() => {
                                                                                                                        setSubmitted(false);
                                                                                                                        setFormData({ name: "", email: "", subject: "", message: "" });
                                                                                                              }}
                                                                                                              className="text-primary hover:underline"
                                                                                                    >
                                                                                                              إرسال رسالة أخرى
                                                                                                    </button>
                                                                                          </div>
                                                                                ) : (
                                                                                          <form onSubmit={handleSubmit} className="space-y-6">
                                                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                                                              <div>
                                                                                                                        <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-white">
                                                                                                                                  الاسم الكامل
                                                                                                                        </label>
                                                                                                                        <div className="relative">
                                                                                                                                  <UserIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                                                                                                  <input
                                                                                                                                            type="text"
                                                                                                                                            value={formData.name}
                                                                                                                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                                                                                                            placeholder="أدخل اسمك"
                                                                                                                                            className="form-input pr-10"
                                                                                                                                            required
                                                                                                                                  />
                                                                                                                        </div>
                                                                                                              </div>
                                                                                                              <div>
                                                                                                                        <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-white">
                                                                                                                                  البريد الإلكتروني
                                                                                                                        </label>
                                                                                                                        <div className="relative">
                                                                                                                                  <EnvelopeIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                                                                                                  <input
                                                                                                                                            type="email"
                                                                                                                                            value={formData.email}
                                                                                                                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                                                                                                            placeholder="example@email.com"
                                                                                                                                            className="form-input pr-10"
                                                                                                                                            required
                                                                                                                                  />
                                                                                                                        </div>
                                                                                                              </div>
                                                                                                    </div>

                                                                                                    <div>
                                                                                                              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-white">
                                                                                                                        الموضوع
                                                                                                              </label>
                                                                                                              <select
                                                                                                                        value={formData.subject}
                                                                                                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                                                                                        className="form-input"
                                                                                                                        required
                                                                                                              >
                                                                                                                        <option value="">اختر الموضوع</option>
                                                                                                                        <option value="general">استفسار عام</option>
                                                                                                                        <option value="support">دعم فني</option>
                                                                                                                        <option value="feedback">اقتراح أو ملاحظة</option>
                                                                                                                        <option value="partnership">شراكة أو تعاون</option>
                                                                                                                        <option value="other">أخرى</option>
                                                                                                              </select>
                                                                                                    </div>

                                                                                                    <div>
                                                                                                              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-white">
                                                                                                                        الرسالة
                                                                                                              </label>
                                                                                                              <textarea
                                                                                                                        value={formData.message}
                                                                                                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                                                                                        placeholder="اكتب رسالتك هنا..."
                                                                                                                        rows={5}
                                                                                                                        className="form-input resize-none"
                                                                                                                        required
                                                                                                              />
                                                                                                    </div>

                                                                                                    <button
                                                                                                              type="submit"
                                                                                                              disabled={isSubmitting}
                                                                                                              className="w-full flex items-center justify-center gap-2 bg-gradient-to-l from-primary to-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-emerald-200 dark:hover:shadow-glow disabled:opacity-50"
                                                                                                    >
                                                                                                              {isSubmitting ? (
                                                                                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                                                                              ) : (
                                                                                                                        <>
                                                                                                                                  <span>إرسال الرسالة</span>
                                                                                                                                  <PaperAirplaneIcon className="w-5 h-5 rotate-180" />
                                                                                                                        </>
                                                                                                              )}
                                                                                                    </button>
                                                                                          </form>
                                                                                )}
                                                                      </div>
                                                            </div>
                                                  </div>
                                        </div>
                              </main>

                              {/* Footer */}
                              <footer className="relative z-10 border-t border-slate-200 dark:border-white/10 mt-16 bg-white/50 dark:bg-black/20">
                                        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
                                                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                                            <p className="text-slate-500 dark:text-slate-400 text-sm">© 2024 نماذج تعليمية - جميع الحقوق محفوظة</p>
                                                            <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
                                                                      <Link href="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link>
                                                                      <Link href="/terms" className="hover:text-primary transition-colors">الشروط والأحكام</Link>
                                                                      <Link href="/contact" className="hover:text-primary transition-colors">تواصل معنا</Link>
                                                            </div>
                                                  </div>
                                        </div>
                              </footer>
                    </div>
          );
}
