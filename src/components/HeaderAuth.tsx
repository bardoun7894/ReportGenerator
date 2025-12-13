"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from '@/components/theme-toggle';

interface UserData {
          name: string;
          role?: string;
}

export default function HeaderAuth() {
          const [user, setUser] = useState<UserData | null>(null);
          const [mounted, setMounted] = useState(false);

          useEffect(() => {
                    setMounted(true);
                    const u = localStorage.getItem('user');
                    if (u) {
                              try {
                                        setUser(JSON.parse(u));
                              } catch (e) {
                                        console.error("Invalid user data in localStorage");
                              }
                    }
          }, []);

          if (!mounted) return null; // Avoid hydration mismatch

          if (user) {
                    return (
                              <div className="flex items-center gap-3 pl-2">
                                        <ThemeToggle />
                                        {user.role === 'admin' && (
                                                  <Link
                                                            href="/admin"
                                                            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                                                            title="لوحة التحكم"
                                                  >
                                                            <Cog6ToothIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                                  </Link>
                                        )}
                                        <div className="flex items-center gap-2">
                                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-amber-500 text-white flex items-center justify-center font-bold shadow-sm">
                                                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                                  </div>
                                                  <span className="text-sm font-medium hidden sm:block text-slate-700 dark:text-white truncate max-w-[150px]">
                                                            {user.name}
                                                  </span>
                                        </div>
                                        <button
                                                  onClick={() => {
                                                            localStorage.removeItem("user");
                                                            localStorage.removeItem("isLoggedIn");
                                                            localStorage.removeItem("reportsGenerated");
                                                            window.location.reload();
                                                  }}
                                                  className="text-xs text-slate-500 hover:text-red-500 transition-colors"
                                        >
                                                  (خروج)
                                        </button>
                              </div>
                    );
          }

          return (
                    <div className="flex items-center gap-3">
                              <ThemeToggle />
                              <Link
                                        href="/login"
                                        className="glass-card px-5 py-2 text-sm font-medium hover:bg-white dark:hover:bg-white/10 transition-all text-slate-700 dark:text-white"
                              >
                                        تسجيل الدخول
                              </Link>
                    </div>
          );
}
