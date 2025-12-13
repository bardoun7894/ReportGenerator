'use client';

import { useEffect, useState } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline';

export default function VisitorCounter() {
          const [count, setCount] = useState<number | null>(null);
          const [mounted, setMounted] = useState(false);

          useEffect(() => {
                    setMounted(true);
                    // Check if already counted this session
                    const counted = sessionStorage.getItem('visitorCounted');

                    if (!counted) {
                              // Increment visitor count
                              fetch('/api/visit', { method: 'POST' })
                                        .then((res) => res.json())
                                        .then((data) => {
                                                  setCount(data.count);
                                                  sessionStorage.setItem('visitorCounted', 'true');
                                        })
                                        .catch(console.error);
                    } else {
                              // Just get the count
                              fetch('/api/visit')
                                        .then((res) => res.json())
                                        .then((data) => setCount(data.count))
                                        .catch(console.error);
                    }
          }, []);

          if (!mounted || count === null) return null;

          return (
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 bg-white/50 dark:bg-white/5 px-4 py-2 rounded-full border border-slate-100 dark:border-white/10">
                              <EyeIcon className="w-4 h-4 text-purple-500" />
                              <span className="text-sm">
                                        <span className="font-semibold text-slate-900 dark:text-white">{count.toLocaleString('ar-SA')}</span> زائر
                              </span>
                    </div>
          );
}
