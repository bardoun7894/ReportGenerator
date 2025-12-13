import connectDB from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
          try {
                    await connectDB();
                    const { searchParams } = new URL(req.url);
                    const page = parseInt(searchParams.get('page') || '1');
                    const limit = parseInt(searchParams.get('limit') || '20');
                    const skip = (page - 1) * limit;

                    const [users, total] = await Promise.all([
                              User.find({}, { password: 0 }).sort({ createdAt: -1 }).skip(skip).limit(limit),
                              User.countDocuments(),
                    ]);

                    return NextResponse.json({
                              users,
                              total,
                              page,
                              totalPages: Math.ceil(total / limit),
                    }, { status: 200 });
          } catch (error) {
                    console.error('Get users error:', error);
                    return NextResponse.json({ message: 'حدث خطأ' }, { status: 500 });
          }
}

export async function DELETE(req: Request) {
          try {
                    await connectDB();
                    const { searchParams } = new URL(req.url);
                    const userId = searchParams.get('id');

                    if (!userId) {
                              return NextResponse.json({ message: 'معرف المستخدم مطلوب' }, { status: 400 });
                    }

                    const deleted = await User.findByIdAndDelete(userId);
                    if (!deleted) {
                              return NextResponse.json({ message: 'المستخدم غير موجود' }, { status: 404 });
                    }

                    return NextResponse.json({ message: 'تم حذف المستخدم بنجاح' }, { status: 200 });
          } catch (error) {
                    console.error('Delete user error:', error);
                    return NextResponse.json({ message: 'حدث خطأ' }, { status: 500 });
          }
}

export async function PATCH(req: Request) {
          try {
                    await connectDB();
                    const body = await req.json();
                    const { userId, role } = body;

                    if (!userId || !role) {
                              return NextResponse.json({ message: 'معرف المستخدم والدور مطلوبان' }, { status: 400 });
                    }

                    if (!['user', 'admin'].includes(role)) {
                              return NextResponse.json({ message: 'دور غير صالح' }, { status: 400 });
                    }

                    const updated = await User.findByIdAndUpdate(userId, { role }, { new: true });
                    if (!updated) {
                              return NextResponse.json({ message: 'المستخدم غير موجود' }, { status: 404 });
                    }

                    return NextResponse.json({ message: 'تم تحديث الدور بنجاح', user: { id: updated._id, role: updated.role } }, { status: 200 });
          } catch (error) {
                    console.error('Update user role error:', error);
                    return NextResponse.json({ message: 'حدث خطأ' }, { status: 500 });
          }
}
