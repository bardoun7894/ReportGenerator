import connectDB from '@/lib/db';
import Report from '@/models/Report';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
          try {
                    await connectDB();
                    const { searchParams } = new URL(req.url);
                    const page = parseInt(searchParams.get('page') || '1');
                    const limit = parseInt(searchParams.get('limit') || '20');
                    const skip = (page - 1) * limit;

                    const [reports, total] = await Promise.all([
                              Report.find({}).populate('userId', 'name email').sort({ createdAt: -1 }).skip(skip).limit(limit),
                              Report.countDocuments(),
                    ]);

                    return NextResponse.json({
                              reports,
                              total,
                              page,
                              totalPages: Math.ceil(total / limit),
                    }, { status: 200 });
          } catch (error) {
                    console.error('Get reports error:', error);
                    return NextResponse.json({ message: 'حدث خطأ' }, { status: 500 });
          }
}

export async function DELETE(req: Request) {
          try {
                    await connectDB();
                    const { searchParams } = new URL(req.url);
                    const reportId = searchParams.get('id');

                    if (!reportId) {
                              return NextResponse.json({ message: 'معرف التقرير مطلوب' }, { status: 400 });
                    }

                    const deleted = await Report.findByIdAndDelete(reportId);
                    if (!deleted) {
                              return NextResponse.json({ message: 'التقرير غير موجود' }, { status: 404 });
                    }

                    return NextResponse.json({ message: 'تم حذف التقرير بنجاح' }, { status: 200 });
          } catch (error) {
                    console.error('Delete report error:', error);
                    return NextResponse.json({ message: 'حدث خطأ' }, { status: 500 });
          }
}
