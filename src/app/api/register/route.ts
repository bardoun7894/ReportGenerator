import connectDB from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
          try {
                    const body = await req.json();
                    const { name, email, password } = body;

                    // Validate input
                    if (!name || !email || !password) {
                              return NextResponse.json(
                                        { message: 'الرجاء ملء جميع الحقول' },
                                        { status: 400 }
                              );
                    }

                    // Connect to DB
                    await connectDB();

                    // Check if user already exists
                    const existingUser = await User.findOne({ email });
                    if (existingUser) {
                              return NextResponse.json(
                                        { message: 'البريد الإلكتروني مستخدم مسبقاً' },
                                        { status: 400 }
                              );
                    }

                    // Hash password
                    const hashedPassword = await bcrypt.hash(password, 10);

                    // Create user
                    await User.create({
                              name,
                              email,
                              password: hashedPassword,
                    });

                    return NextResponse.json(
                              { message: 'تم إنشاء الحساب بنجاح' },
                              { status: 201 }
                    );
          } catch (error) {
                    console.error('Registration error:', error);
                    return NextResponse.json(
                              { message: 'حدث خطأ أثناء التسجيل' },
                              { status: 500 }
                    );
          }
}
