import { NextRequest, NextResponse } from 'next/server';

/**
 * PDF Export API Route
 * 
 * @deprecated This endpoint is deprecated. PDF generation is now handled client-side.
 * 
 * The client-side approach uses html2canvas and jsPDF directly in the browser,
 * eliminating the need for server-side Puppeteer and Chromium dependencies.
 * 
 * See: src/app/preview/draft/page.tsx - handleDownloadPDF function
 */
export async function POST(req: NextRequest) {
    return NextResponse.json(
        {
            error: 'This API endpoint is deprecated. PDF generation is now handled client-side.',
            message: 'Please use the client-side PDF download feature in the preview page.'
        },
        { status: 410 } // 410 Gone - Resource is no longer available
    );
}
