"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
          DocumentTextIcon,
          EnvelopeIcon,
          LockClosedIcon,
          UserIcon,
          ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { ThemeToggle } from "@/components/theme-toggle";

export default function RegisterPage() {
          const [name, setName] = useState("");
          const [email, setEmail] = useState("");
          const [password, setPassword] = useState("");
          const [confirmPassword, setConfirmPassword] = useState("");
          const [isLoading, setIsLoading] = useState(false);
          const [error, setError] = useState("");

          const handleSubmit = async (e: React.FormEvent) => {
                    e.preventDefault();
                    setIsLoading(true);
                    setError("");

                    if (password !== confirmPassword) {
                              setError("كلمات المرور غير متطابقة");
                              setIsLoading(false);
                              return;
                    }

                    try {
                              const res = await fetch("/api/register", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ name, email, password }),
                              });

                              const data = await res.json();

                              if (!res.ok) {
                                        throw new Error(data.message || "فشل إنشاء للحساب");
                              }

                              // Auto-login after successful registration
                              const loginRes = await fetch("/api/login", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ email, password }),
                              });

                              const loginData = await loginRes.json();

                              if (loginRes.ok && loginData.user) {
                                        localStorage.setItem("isLoggedIn", "true");
                                        localStorage.setItem("user", JSON.stringify(loginData.user));
                                        window.location.href = "/";
                              } else {
                                        // Fallback to login page if auto-login fails
                                        window.location.href = "/login";
                              }
                    } catch (err: any) {
                              setError(err.message);
                    } finally {
                              setIsLoading(false);
                    }
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
                                                  <Image
                                                            src="/logo.svg"
                                                            alt="Logo"
                                                            width={44}
                                                            height={44}
                                                            className="w-11 h-11 hover:scale-105 transition-transform duration-300"
                                                  />
                                                  <div>
                                                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">نماذج تعليمية</span>
                                                            <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1">منصة تقاريرك</p>
                                                  </div>
                                        </Link>
                                        <ThemeToggle />
                              </header>

                              {/* Register Form */}
                              <main className="relative z-10 px-6 lg:px-12 py-12 flex justify-center items-center min-h-[calc(100vh-120px)]">
                                        <div className="w-full max-w-md">
                                                  <div className="glass-card p-8 border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5">
                                                            <div className="text-center mb-8">
                                                                      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                                                                إنشاء حساب جديد
                                                                      </h1>
                                                                      <p className="text-slate-600 dark:text-slate-400">
                                                                                انضم إلينا لإنشاء تقارير احترافية
                                                                      </p>
                                                            </div>

                                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                                      {error && (
                                                                                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                                                                                          {error}
                                                                                </div>
                                                                      )}

                                                                      <div>
                                                                                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-white">
                                                                                          الاسم الكامل
                                                                                </label>
                                                                                <div className="relative">
                                                                                          <UserIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                                                          <input
                                                                                                    type="text"
                                                                                                    value={name}
                                                                                                    onChange={(e) => setName(e.target.value)}
                                                                                                    placeholder="الاسم الكامل"
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

                                                                      <div>
                                                                                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-white">
                                                                                          تأكيد كلمة المرور
                                                                                </label>
                                                                                <div className="relative">
                                                                                          <LockClosedIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                                                          <input
                                                                                                    type="password"
                                                                                                    value={confirmPassword}
                                                                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                                                                    placeholder="••••••••"
                                                                                                    className="form-input pr-10"
                                                                                                    required
                                                                                          />
                                                                                </div>
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
                                                                                                    <span>إنشاء حساب</span>
                                                                                                    <ArrowLeftIcon className="w-5 h-5" />
                                                                                          </>
                                                                                )}
                                                                      </button>
                                                            </form>

                                                            <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                                                                      لديك حساب بالفعل؟{" "}
                                                                      <Link href="/login" className="text-primary font-medium hover:underline">
                                                                                تسجيل الدخول
                                                                      </Link>
                                                            </div>
                                                  </div>
                                        </div>
                              </main>
                    </div>
          );
}
