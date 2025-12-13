import connectDB from '@/lib/db';
import Report from '@/models/Report';
import { NextRequest, NextResponse } from 'next/server';

// Get IP geolocation data using free IP-API service
async function getGeoData(ip: string) {
          try {
                    // Skip localhost/private IPs
                    if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
                              return {
                                        ip,
                                        city: 'محلي',
                                        country: 'محلي',
                                        countryCode: 'LO',
                                        region: '',
                                        timezone: '',
                                        isp: '',
                                        mobile: false,
                                        proxy: false,
                                        lat: 0,
                                        lon: 0,
                              };
                    }

                    const response = await fetch(
                              `http://ip-api.com/json/${ip}?fields=status,city,country,countryCode,regionName,timezone,isp,mobile,proxy,lat,lon`,
                              { next: { revalidate: 3600 } } // Cache for 1 hour
                    );

                    if (!response.ok) {
                              return { ip, city: 'غير معروف', country: 'غير معروف', countryCode: '', region: '' };
                    }

                    const data = await response.json();
                    return {
                              ip,
                              city: data.city || 'غير معروف',
                              country: data.country || 'غير معروف',
                              countryCode: data.countryCode || '',
                              region: data.regionName || '',
                              timezone: data.timezone || '',
                              isp: data.isp || '',
                              mobile: data.mobile || false,
                              proxy: data.proxy || false,
                              lat: data.lat || 0,
                              lon: data.lon || 0,
                    };
          } catch (error) {
                    console.error('Geo lookup error:', error);
                    return { ip, city: 'غير معروف', country: 'غير معروف', countryCode: '', region: '' };
          }
}

export async function POST(req: NextRequest) {
          try {
                    await connectDB();
                    const body = await req.json();
                    const { title, type, template, data, userId } = body;

                    if (!title || !type) {
                              return NextResponse.json({ message: 'العنوان والنوع مطلوبان' }, { status: 400 });
                    }

                    // Get client IP
                    const forwarded = req.headers.get('x-forwarded-for');
                    const ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || '127.0.0.1';

                    // Get geo data
                    const geoData = await getGeoData(ip);

                    const report = await Report.create({
                              title,
                              type,
                              template,
                              userId: userId || null,
                              guestInfo: !userId ? geoData : undefined,
                              data,
                              status: 'completed',
                    });

                    return NextResponse.json({
                              message: 'تم حفظ التقرير بنجاح',
                              reportId: report._id,
                    }, { status: 201 });
          } catch (error) {
                    console.error('Track report error:', error);
                    return NextResponse.json({ message: 'حدث خطأ' }, { status: 500 });
          }
}
