import connectDB from '@/lib/db';
import Visitor from '@/models/Visitor';
import { NextResponse } from 'next/server';

export async function GET() {
          try {
                    await connectDB();
                    let visitor = await Visitor.findOne();
                    if (!visitor) {
                              visitor = await Visitor.create({ count: 0 });
                    }
                    return NextResponse.json({ count: visitor.count }, { status: 200 });
          } catch (error) {
                    console.error('Get visitor count error:', error);
                    return NextResponse.json({ message: 'حدث خطأ' }, { status: 500 });
          }
}

export async function POST() {
          try {
                    await connectDB();
                    let visitor = await Visitor.findOne();
                    if (!visitor) {
                              visitor = await Visitor.create({ count: 1 });
                    } else {
                              visitor.count += 1;
                              visitor.lastUpdated = new Date();
                              await visitor.save();
                    }
                    return NextResponse.json({ count: visitor.count }, { status: 200 });
          } catch (error) {
                    console.error('Increment visitor count error:', error);
                    return NextResponse.json({ message: 'حدث خطأ' }, { status: 500 });
          }
}
