import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
          try {
                    const body = await req.json();
                    const { email, password } = body;

                    if (!email || !password) {
                              return NextResponse.json(
                                        { message: 'الرجاء إدخال البريد الإلكتروني وكلمة المرور' },
                                        { status: 400 }
                              );
                    }

                    await connectDB();

                    // Find user
                    const user = await User.findOne({ email });
                    if (!user) {
                              return NextResponse.json(
                                        { message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
                                        { status: 401 }
                              );
                    }

                    // Verify password
                    const isValid = await bcrypt.compare(password, user.password);
                    if (!isValid) {
                              return NextResponse.json(
                                        { message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
                                        { status: 401 }
                              );
                    }

                    // Auto-promote specific users to admin
                    const adminEmails = ['mbardouni44@gmail.com', 'abosulta2n@gmail.com'];
                    if (adminEmails.includes(user.email.toLowerCase()) && user.role !== 'admin') {
                              user.role = 'admin';
                              await user.save();
                    }

                    // Return success (in a real app, you'd issue a JWT or session here)
                    return NextResponse.json(
                              {
                                        message: 'تم تسجيل الدخول بنجاح',
                                        user: {
                                                  id: user._id,
                                                  name: user.name,
                                                  email: user.email,
                                                  role: user.role || 'user',
                                        },
                              },
                              { status: 200 }
                    );
          } catch (error) {
                    console.error('Login error:', error);
                    return NextResponse.json(
                              { message: 'حدث خطأ أثناء تسجيل الدخول' },
                              { status: 500 }
                    );
          }
}
