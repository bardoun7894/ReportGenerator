import puppeteer from 'puppeteer';

export interface PDFGeneratorOptions {
  html: string;
  title?: string;
}

/**
 * Generate PDF from HTML using Puppeteer (headless Chrome)
 * Provides excellent Arabic text rendering with proper RTL support
 */
export async function generatePDFFromHTML(options: PDFGeneratorOptions): Promise<Buffer> {
  const { html, title = 'تقرير' } = options;

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--font-render-hinting=none',
    ],
  });

  try {
    const page = await browser.newPage();

    // Set viewport for A4 sizing
    await page.setViewport({
      width: 794,  // A4 width at 96 DPI
      height: 1123, // A4 height at 96 DPI
    });

    // Wrap HTML with proper styling for Arabic fonts
    // Using locally installed Noto Sans Arabic from Docker container
    const fullHTML = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      box-sizing: border-box;
    }
    
    @page {
      size: A4;
      margin: 0;
    }
    
    html, body {
      margin: 0;
      padding: 0;
      /* Use locally installed Arabic fonts from Docker */
      font-family: 'Noto Sans Arabic', 'Noto Kufi Arabic', 'DejaVu Sans', 'FreeSans', sans-serif;
      direction: rtl;
      text-align: right;
      background: white;
      -webkit-font-smoothing: antialiased;
    }
    
    /* Ensure all elements use RTL */
    * {
      direction: rtl;
      text-align: right;
    }
    
    /* Hide scrollbars */
    ::-webkit-scrollbar {
      display: none;
    }
  </style>
</head>
<body>
  ${html}
</body>
</html>`;

    await page.setContent(fullHTML, {
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 60000,
    });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');

    // Extra delay to ensure fonts are fully rendered
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Additional wait for images
    await page.evaluate(() => {
      return Promise.all(
        Array.from(document.querySelectorAll('img'))
          .filter(img => !img.complete)
          .map(img => new Promise(resolve => {
            img.onload = img.onerror = resolve;
          }))
      );
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
      },
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}
