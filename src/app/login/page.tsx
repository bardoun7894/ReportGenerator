"use client";

import { useState } from "react";
import Link from "next/link";
import {
          DocumentTextIcon,
          EnvelopeIcon,
          LockClosedIcon,
          ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginPage() {
          const [email, setEmail] = useState("");
          const [password, setPassword] = useState("");
          const [isLoading, setIsLoading] = useState(false);

          const handleSubmit = async (e: React.FormEvent) => {
                    e.preventDefault();
                    setIsLoading(true);
                    // Placeholder for login logic
                    setTimeout(() => {
                              setIsLoading(false);
                              alert("تم تسجيل الدخول بنجاح!");
                    }, 1500);
          };

          return (
                    <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
                              {/* Animated Gradient Background */}
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

                              {/* Login Form */}
                              <main className="relative z-10 px-6 lg:px-12 py-12 flex justify-center items-center min-h-[calc(100vh-120px)]">
                                        <div className="w-full max-w-md">
                                                  <div className="glass-card p-8 border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5">
                                                            <div className="text-center mb-8">
                                                                      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                                                                تسجيل الدخول
                                                                      </h1>
                                                                      <p className="text-slate-600 dark:text-slate-400">
                                                                                أدخل بياناتك للوصول إلى حسابك
                                                                      </p>
                                                            </div>

                                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                                      <div>
                                                                                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-white">
                                                                                          البريد الإلكتروني
                                                                                </label>
                                                                                <div className="relative">
                                                                                          <EnvelopeIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                                                          <input
                                                                                                    type="email"
                                                                                                    value={email}
                                                                                                    onChange={(e) => setEmail(e.target.value)}
                                                                                                    placeholder="example@email.com"
                                                                                                    className="form-input pr-10"
                                                                                                    required
                                                                                          />
                                                                                </div>
                                                                      </div>

                                                                      <div>
                                                                                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-white">
                                                                                          كلمة المرور
                                                                                </label>
                                                                                <div className="relative">
                                                                                          <LockClosedIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                                                          <input
                                                                                                    type="password"
                                                                                                    value={password}
                                                                                                    onChange={(e) => setPassword(e.target.value)}
                                                                                                    placeholder="••••••••"
                                                                                                    className="form-input pr-10"
                                                                                                    required
                                                                                          />
                                                                                </div>
                                                                      </div>

                                                                      <div className="flex items-center justify-between text-sm">
                                                                                <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                                                                          <input type="checkbox" className="rounded border-slate-300 dark:border-white/20" />
                                                                                          تذكرني
                                                                                </label>
                                                                                <a href="#" className="text-primary hover:underline">
                                                                                          نسيت كلمة المرور؟
                                                                                </a>
                                                                      </div>

                                                                      <button
                                                                                type="submit"
                                                                                disabled={isLoading}
                                                                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-l from-primary to-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-emerald-200 dark:hover:shadow-glow disabled:opacity-50"
                                                                      >
                                                                                {isLoading ? (
                                                                                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                                                ) : (
                                                                                          <>
                                                                                                    <span>تسجيل الدخول</span>
                                                                                                    <ArrowLeftIcon className="w-5 h-5" />
                                                                                          </>
                                                                                )}
                                                                      </button>
                                                            </form>

                                                            <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                                                                      ليس لديك حساب؟{" "}
                                                                      <a href="#" className="text-primary font-medium hover:underline">
                                                                                إنشاء حساب جديد
                                                                      </a>
                                                            </div>
                                                  </div>
                                        </div>
                              </main>
                    </div>
          );
}
