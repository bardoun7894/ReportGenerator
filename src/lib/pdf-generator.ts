/**
 * PDF Generator - Client-side implementation
 * 
 * PDF generation is now handled on the client-side using html2canvas and jsPDF.
 * This file is kept for potential server-side fallback scenarios but is no longer
 * the primary PDF generation method.
 * 
 * The client-side approach was adopted for:
 * - Faster performance (no server round-trip)
 * - Reduced server load and complexity
 * - No need for Puppeteer/Chromium dependencies
 * - Better deployment compatibility (no Chrome binary needed)
 */

export interface PDFGeneratorOptions {
  html: string;
  title?: string;
}

/**
 * @deprecated This function is no longer used. PDF generation is now handled client-side.
 * See: src/app/preview/draft/page.tsx - handleDownloadPDF function
 * 
 * The client-side implementation uses:
 * - html2canvas: Captures the DOM element as a canvas
 * - jsPDF: Converts the canvas to a downloadable PDF
 */
export async function generatePDFFromHTML(options: PDFGeneratorOptions): Promise<Buffer> {
  throw new Error(
    'Server-side PDF generation has been deprecated. ' +
    'Please use the client-side pdf generation in the preview page. ' +
    'See: src/app/preview/draft/page.tsx'
  );
}
