import { NextRequest, NextResponse } from 'next/server';
import { generatePDFFromHTML } from '@/lib/pdf-generator';

export async function POST(req: NextRequest) {
    try {
        const { html, title } = await req.json();

        if (!html) {
            return NextResponse.json(
                { error: 'HTML content is required' },
                { status: 400 }
            );
        }

        const pdfBuffer = await generatePDFFromHTML({ html, title });

        // Convert Buffer to Uint8Array for NextResponse
        const uint8Array = new Uint8Array(pdfBuffer);

        return new NextResponse(uint8Array, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${encodeURIComponent(title || 'تقرير')}.pdf"`,
                'Content-Length': pdfBuffer.length.toString(),
            },
        });
    } catch (error) {
        console.error('PDF generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate PDF' },
            { status: 500 }
        );
    }
}
