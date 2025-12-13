'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
          UsersIcon,
          DocumentTextIcon,
          EyeIcon,
          ArrowRightOnRectangleIcon,
          HomeIcon,
          TrashIcon,
          ChevronLeftIcon,
          ChevronRightIcon,
          ShieldCheckIcon,
          UserIcon,
} from '@heroicons/react/24/outline';

interface Stats {
          users: number;
          reports: number;
          visitors: number;
}

interface User {
          _id: string;
          name: string;
          email: string;
          role: string;
          createdAt: string;
}

interface Report {
          _id: string;
          title: string;
          type: string;
          status: string;
          template?: string;
          userId?: { name: string; email: string };
          guestInfo?: {
                    ip: string;
                    city: string;
                    country: string;
                    countryCode?: string;
                    region?: string;
                    timezone?: string;
                    isp?: string;
                    mobile?: boolean;
                    proxy?: boolean;
                    lat?: number;
                    lon?: number;
          };
          createdAt: string;
}

export default function AdminDashboard() {
          const router = useRouter();
          const [loading, setLoading] = useState(true);
          const [stats, setStats] = useState<Stats>({ users: 0, reports: 0, visitors: 0 });
          const [activeTab, setActiveTab] = useState<'users' | 'reports'>('users');
          const [users, setUsers] = useState<User[]>([]);
          const [reports, setReports] = useState<Report[]>([]);
          const [userPage, setUserPage] = useState(1);
          const [reportPage, setReportPage] = useState(1);
          const [userTotalPages, setUserTotalPages] = useState(1);
          const [reportTotalPages, setReportTotalPages] = useState(1);
          const [isAdmin, setIsAdmin] = useState(false);

          useEffect(() => {
                    // Check if user is admin
                    const userData = localStorage.getItem('user');
                    if (userData) {
                              const user = JSON.parse(userData);
                              if (user.role === 'admin') {
                                        setIsAdmin(true);
                              } else {
                                        router.push('/');
                              }
                    } else {
                              router.push('/login');
                    }
          }, [router]);

          useEffect(() => {
                    if (isAdmin) {
                              fetchStats();
                              fetchUsers();
                              fetchReports();
                    }
          }, [isAdmin]);

          useEffect(() => {
                    if (isAdmin) {
                              fetchUsers();
                    }
          }, [userPage, isAdmin]);

          useEffect(() => {
                    if (isAdmin) {
                              fetchReports();
                    }
          }, [reportPage, isAdmin]);

          const fetchStats = async () => {
                    try {
                              const res = await fetch('/api/admin/stats');
                              const data = await res.json();
                              setStats(data);
                    } catch (error) {
                              console.error('Error fetching stats:', error);
                    }
          };

          const fetchUsers = async () => {
                    try {
                              setLoading(true);
                              const res = await fetch(`/api/admin/users?page=${userPage}&limit=10`);
                              const data = await res.json();
                              setUsers(data.users || []);
                              setUserTotalPages(data.totalPages || 1);
                    } catch (error) {
                              console.error('Error fetching users:', error);
                    } finally {
                              setLoading(false);
                    }
          };

          const fetchReports = async () => {
                    try {
                              setLoading(true);
                              const res = await fetch(`/api/admin/reports?page=${reportPage}&limit=10`);
                              const data = await res.json();
                              setReports(data.reports || []);
                              setReportTotalPages(data.totalPages || 1);
                    } catch (error) {
                              console.error('Error fetching reports:', error);
                    } finally {
                              setLoading(false);
                    }
          };

          const handleDeleteUser = async (userId: string) => {
                    if (!confirm('هل أنت متأكد(ة) من حذف هذا المستخدم(ة)؟')) return;
                    try {
                              await fetch(`/api/admin/users?id=${userId}`, { method: 'DELETE' });
                              fetchUsers();
                              fetchStats();
                    } catch (error) {
                              console.error('Error deleting user:', error);
                    }
          };

          const handleToggleRole = async (userId: string, currentRole: string) => {
                    const newRole = currentRole === 'admin' ? 'user' : 'admin';
                    const confirmMsg = newRole === 'admin' ? 'هل تريد ترقية هذا المستخدم(ة) إلى مدير(ة)؟' : 'هل تريد إزالة صلاحيات المدير(ة) من هذا المستخدم(ة)؟';
                    if (!confirm(confirmMsg)) return;
                    try {
                              await fetch('/api/admin/users', {
                                        method: 'PATCH',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ userId, role: newRole }),
                              });
                              fetchUsers();
                    } catch (error) {
                              console.error('Error updating role:', error);
                    }
          };

          const handleDeleteReport = async (reportId: string) => {
                    if (!confirm('هل أنت متأكد من حذف هذا التقرير؟')) return;
                    try {
                              await fetch(`/api/admin/reports?id=${reportId}`, { method: 'DELETE' });
                              fetchReports();
                              fetchStats();
                    } catch (error) {
                              console.error('Error deleting report:', error);
                    }
          };

          const handleLogout = () => {
                    localStorage.removeItem('user');
                    router.push('/');
          };

          if (!isAdmin) {
                    return (
                              <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                              </div>
                    );
          }

          return (
                    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors" dir="rtl">
                              {/* Header */}
                              <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
                                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                                                  <div className="flex items-center justify-between">
                                                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">لوحة التحكم</h1>
                                                            <div className="flex items-center gap-4">
                                                                      <Link
                                                                                href="/"
                                                                                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
                                                                      >
                                                                                <HomeIcon className="w-5 h-5" />
                                                                                <span className="hidden sm:inline">الرئيسية</span>
                                                                      </Link>
                                                                      <button
                                                                                onClick={handleLogout}
                                                                                className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
                                                                      >
                                                                                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                                                                <span className="hidden sm:inline">تسجيل خروج</span>
                                                                      </button>
                                                            </div>
                                                  </div>
                                        </div>
                              </header>

                              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                                        {/* Stats Cards */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                                                            <div className="flex items-center gap-4">
                                                                      <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                                                                                <UsersIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                                                                      </div>
                                                                      <div>
                                                                                <p className="text-sm text-slate-500 dark:text-slate-400">المستخدمون</p>
                                                                                <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.users}</p>
                                                                      </div>
                                                            </div>
                                                  </div>
                                                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                                                            <div className="flex items-center gap-4">
                                                                      <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center">
                                                                                <DocumentTextIcon className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                                                                      </div>
                                                                      <div>
                                                                                <p className="text-sm text-slate-500 dark:text-slate-400">التقارير</p>
                                                                                <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.reports}</p>
                                                                      </div>
                                                            </div>
                                                  </div>
                                                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                                                            <div className="flex items-center gap-4">
                                                                      <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                                                                                <EyeIcon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                                                                      </div>
                                                                      <div>
                                                                                <p className="text-sm text-slate-500 dark:text-slate-400">الزيارات</p>
                                                                                <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.visitors}</p>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        </div>

                                        {/* Tabs */}
                                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                                                  <div className="flex border-b border-slate-200 dark:border-slate-700">
                                                            <button
                                                                      onClick={() => setActiveTab('users')}
                                                                      className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === 'users'
                                                                                ? 'text-primary border-b-2 border-primary bg-primary/5'
                                                                                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                                                                                }`}
                                                            >
                                                                      <UsersIcon className="w-5 h-5 inline-block ml-2" />
                                                                      المستخدمون
                                                            </button>
                                                            <button
                                                                      onClick={() => setActiveTab('reports')}
                                                                      className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === 'reports'
                                                                                ? 'text-primary border-b-2 border-primary bg-primary/5'
                                                                                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                                                                                }`}
                                                            >
                                                                      <DocumentTextIcon className="w-5 h-5 inline-block ml-2" />
                                                                      التقارير
                                                            </button>
                                                  </div>

                                                  {/* Users Tab */}
                                                  {activeTab === 'users' && (
                                                            <div className="p-6">
                                                                      {loading ? (
                                                                                <div className="flex justify-center py-8">
                                                                                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                                                                                </div>
                                                                      ) : users.length === 0 ? (
                                                                                <p className="text-center text-slate-500 dark:text-slate-400 py-8">لا يوجد مستخدمون</p>
                                                                      ) : (
                                                                                <>
                                                                                          <div className="overflow-x-auto">
                                                                                                    <table className="w-full">
                                                                                                              <thead>
                                                                                                                        <tr className="border-b border-slate-200 dark:border-slate-700">
                                                                                                                                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">الاسم</th>
                                                                                                                                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">البريد الإلكتروني</th>
                                                                                                                                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">الدور</th>
                                                                                                                                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">تاريخ التسجيل</th>
                                                                                                                                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">إجراءات</th>
                                                                                                                        </tr>
                                                                                                              </thead>
                                                                                                              <tbody>
                                                                                                                        {users.map((user) => (
                                                                                                                                  <tr key={user._id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                                                                                                                                            <td className="py-3 px-4 text-slate-900 dark:text-white font-medium">{user.name}</td>
                                                                                                                                            <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{user.email}</td>
                                                                                                                                            <td className="py-3 px-4">
                                                                                                                                                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${user.role === 'admin'
                                                                                                                                                                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                                                                                                                                                                : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                                                                                                                                                                }`}>
                                                                                                                                                                {user.role === 'admin' ? 'مدير(ة)' : 'مستخدم(ة)'}
                                                                                                                                                      </span>
                                                                                                                                            </td>
                                                                                                                                            <td className="py-3 px-4 text-slate-600 dark:text-slate-300 text-sm">
                                                                                                                                                      {new Date(user.createdAt).toLocaleDateString('ar-SA')}
                                                                                                                                            </td>
                                                                                                                                            <td className="py-3 px-4">
                                                                                                                                                      <div className="flex items-center gap-2">
                                                                                                                                                                <button
                                                                                                                                                                          onClick={() => handleToggleRole(user._id, user.role)}
                                                                                                                                                                          className={`p-1 rounded transition-colors ${user.role === 'admin' ? 'text-purple-500 hover:text-purple-700' : 'text-slate-400 hover:text-purple-500'}`}
                                                                                                                                                                          title={user.role === 'admin' ? 'إزالة صلاحيات المدير(ة)' : 'ترقية إلى مدير(ة)'}
                                                                                                                                                                >
                                                                                                                                                                          {user.role === 'admin' ? <ShieldCheckIcon className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
                                                                                                                                                                </button>
                                                                                                                                                                <button
                                                                                                                                                                          onClick={() => handleDeleteUser(user._id)}
                                                                                                                                                                          className="text-red-500 hover:text-red-700 transition-colors p-1"
                                                                                                                                                                          disabled={user.role === 'admin'}
                                                                                                                                                                          title={user.role === 'admin' ? 'لا يمكن حذف المدير(ة)' : 'حذف'}
                                                                                                                                                                >
                                                                                                                                                                          <TrashIcon className={`w-5 h-5 ${user.role === 'admin' ? 'opacity-30' : ''}`} />
                                                                                                                                                                </button>
                                                                                                                                                      </div>
                                                                                                                                            </td>
                                                                                                                                  </tr>
                                                                                                                        ))}
                                                                                                              </tbody>
                                                                                                    </table>
                                                                                          </div>
                                                                                          {/* Pagination */}
                                                                                          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                                                                                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                                                                                              صفحة {userPage} من {userTotalPages}
                                                                                                    </p>
                                                                                                    <div className="flex gap-2">
                                                                                                              <button
                                                                                                                        onClick={() => setUserPage((p) => Math.max(1, p - 1))}
                                                                                                                        disabled={userPage === 1}
                                                                                                                        className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                                                                                              >
                                                                                                                        <ChevronRightIcon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                                                                                                              </button>
                                                                                                              <button
                                                                                                                        onClick={() => setUserPage((p) => Math.min(userTotalPages, p + 1))}
                                                                                                                        disabled={userPage === userTotalPages}
                                                                                                                        className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                                                                                              >
                                                                                                                        <ChevronLeftIcon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                                                                                                              </button>
                                                                                                    </div>
                                                                                          </div>
                                                                                </>
                                                                      )}
                                                            </div>
                                                  )}

                                                  {/* Reports Tab */}
                                                  {activeTab === 'reports' && (
                                                            <div className="p-6">
                                                                      {loading ? (
                                                                                <div className="flex justify-center py-8">
                                                                                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                                                                                </div>
                                                                      ) : reports.length === 0 ? (
                                                                                <p className="text-center text-slate-500 dark:text-slate-400 py-8">لا يوجد تقارير</p>
                                                                      ) : (
                                                                                <>
                                                                                          <div className="overflow-x-auto">
                                                                                                    <table className="w-full">
                                                                                                              <thead>
                                                                                                                        <tr className="border-b border-slate-200 dark:border-slate-700">
                                                                                                                                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">العنوان</th>
                                                                                                                                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">النوع</th>
                                                                                                                                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">المستخدم(ة)</th>
                                                                                                                                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">الموقع</th>
                                                                                                                                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">التاريخ</th>
                                                                                                                                  <th className="text-right py-3 px-4 text-sm font-medium text-slate-500 dark:text-slate-400">إجراءات</th>
                                                                                                                        </tr>
                                                                                                              </thead>
                                                                                                              <tbody>
                                                                                                                        {reports.map((report) => (
                                                                                                                                  <tr key={report._id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                                                                                                                                            <td className="py-3 px-4 text-slate-900 dark:text-white font-medium">{report.title}</td>
                                                                                                                                            <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{report.type}</td>
                                                                                                                                            <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{report.userId?.name || 'زائر'}</td>
                                                                                                                                            <td className="py-3 px-4 text-slate-600 dark:text-slate-300 text-sm">
                                                                                                                                                      {report.guestInfo ? (
                                                                                                                                                                <div className="flex flex-col">
                                                                                                                                                                          <span>{report.guestInfo.city}, {report.guestInfo.country}</span>
                                                                                                                                                                          <span className="text-xs text-slate-400">{report.guestInfo.ip}</span>
                                                                                                                                                                </div>
                                                                                                                                                      ) : (
                                                                                                                                                                <span className="text-slate-400">-</span>
                                                                                                                                                      )}
                                                                                                                                            </td>
                                                                                                                                            <td className="py-3 px-4 text-slate-600 dark:text-slate-300 text-sm">
                                                                                                                                                      {new Date(report.createdAt).toLocaleDateString('ar-SA')}
                                                                                                                                            </td>
                                                                                                                                            <td className="py-3 px-4">
                                                                                                                                                      <button
                                                                                                                                                                onClick={() => handleDeleteReport(report._id)}
                                                                                                                                                                className="text-red-500 hover:text-red-700 transition-colors p-1"
                                                                                                                                                                title="حذف"
                                                                                                                                                      >
                                                                                                                                                                <TrashIcon className="w-5 h-5" />
                                                                                                                                                      </button>
                                                                                                                                            </td>
                                                                                                                                  </tr>
                                                                                                                        ))}
                                                                                                              </tbody>
                                                                                                    </table>
                                                                                          </div>
                                                                                          {/* Pagination */}
                                                                                          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                                                                                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                                                                                              صفحة {reportPage} من {reportTotalPages}
                                                                                                    </p>
                                                                                                    <div className="flex gap-2">
                                                                                                              <button
                                                                                                                        onClick={() => setReportPage((p) => Math.max(1, p - 1))}
                                                                                                                        disabled={reportPage === 1}
                                                                                                                        className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                                                                                              >
                                                                                                                        <ChevronRightIcon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                                                                                                              </button>
                                                                                                              <button
                                                                                                                        onClick={() => setReportPage((p) => Math.min(reportTotalPages, p + 1))}
                                                                                                                        disabled={reportPage === reportTotalPages}
                                                                                                                        className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                                                                                              >
                                                                                                                        <ChevronLeftIcon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                                                                                                              </button>
                                                                                                    </div>
                                                                                          </div>
                                                                                </>
                                                                      )}
                                                            </div>
                                                  )}
                                        </div>
                              </main>
                    </div>
          );
}
