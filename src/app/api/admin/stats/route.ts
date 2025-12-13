import connectDB from '@/lib/db';
import User from '@/models/User';
import Report from '@/models/Report';
import Visitor from '@/models/Visitor';
import { NextResponse } from 'next/server';

export async function GET() {
          try {
                    await connectDB();

                    const [userCount, reportCount, visitor] = await Promise.all([
                              User.countDocuments(),
                              Report.countDocuments(),
                              Visitor.findOne(),
                    ]);

                    return NextResponse.json({
                              users: userCount,
                              reports: reportCount,
                              visitors: visitor?.count || 0,
                    }, { status: 200 });
          } catch (error) {
                    console.error('Get admin stats error:', error);
                    return NextResponse.json({ message: 'حدث خطأ' }, { status: 500 });
          }
}
