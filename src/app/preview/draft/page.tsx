"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWizardStore } from "@/stores/wizard-store";
import { getReportTypeConfig } from "@/config/report-types";
import { TEMPLATES, TemplateId, getFeaturedTemplates, getOtherTemplates } from "@/config/templates";
import {
    ArrowRightIcon,
    ArrowDownTrayIcon,
    PencilSquareIcon,
    DocumentTextIcon,
    Squares2X2Icon,
    ShareIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { ThemeToggle } from "@/components/theme-toggle";

// Import libraries
import { saveAs } from "file-saver";

// Import all templates
import {
    TemplateShahed,
    TemplateModernCards,
    TemplateProfessionalGrid,
    TemplateMinimalClean,
    TemplateBoldHeader,
    TemplateClassicReport,
    TemplateTealFrame,
    TemplateNavyExecutive,
    TemplateForestGreen,
    TemplateRoyalPurple,
    TemplateSunsetOrange,
    TemplateCorporateBlue,
    TemplateModernMinimal,
    TemplateAcademicExcellence,
    TemplateCreativeStudio,
    TemplateOfficialGov,
    TemplateExchangeVisit,
    TemplateShahedExact,
    TemplateShahedModern,
    TemplateShahedCompact,
    TemplateShahedDark,
    TemplateShahedElegant,
    TemplateShahedNew,
} from "@/components/templates";

// Font options
const FONT_OPTIONS = [
    { id: 'tajawal', name: 'Tajawal', family: "'Tajawal', sans-serif" },
    { id: 'cairo', name: 'Cairo', family: "'Cairo', sans-serif" },
    { id: 'noto-kufi', name: 'Noto Kufi', family: "'Noto Kufi Arabic', sans-serif" },
    { id: 'ibm-plex', name: 'IBM Plex', family: "'IBM Plex Sans Arabic', sans-serif" },
    { id: 'almarai', name: 'Almarai', family: "'Almarai', sans-serif" },
];

export default function PreviewDraftPage() {
    const router = useRouter();
    const { formData, reportType, reset } = useWizardStore();
    const [isClient, setIsClient] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('exchange-visit');
    const [showTemplateSelector, setShowTemplateSelector] = useState(false);
    const [showAllTemplates, setShowAllTemplates] = useState(false);
    const [selectedFont, setSelectedFont] = useState('tajawal');
    const [isExporting, setIsExporting] = useState(false);
    const reportRef = useRef<HTMLDivElement>(null);

    const featuredTemplates = getFeaturedTemplates();
    const otherTemplates = getOtherTemplates();

    useEffect(() => {
        setIsClient(true);
        if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
            setShowTemplateSelector(true);
        }

        // Mark usage for guest
        if (typeof window !== 'undefined') {
            const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
            if (!isLoggedIn) {
                const hasCounted = sessionStorage.getItem("hasCountedCurrentReport");
                if (!hasCounted) {
                    const current = parseInt(localStorage.getItem("reportsGenerated") || "0");
                    if (current < 1) { // Only increment if not already marked/blocked (though we block at entry)
                        // Actually just increment.
                        localStorage.setItem("reportsGenerated", (current + 1).toString());
                    }
                    // Mark as counted for this session so refresh doesn't double count
                    sessionStorage.setItem("hasCountedCurrentReport", "true");
                }
            }
        }
    }, []);

    const config = reportType ? getReportTypeConfig(reportType) : null;

    useEffect(() => {
        if (isClient && (!formData.title || !reportType)) {
            router.push("/select");
        }
    }, [isClient, formData, reportType, router]);

    if (!isClient || !formData.title || !reportType || !config) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Track report download to database
    const trackReport = async (format: 'pdf' | 'word') => {
        try {
            const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
            const userId = user ? JSON.parse(user).id : null;

            await fetch('/api/track-report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    type: reportType,
                    template: selectedTemplate,
                    userId,
                    data: {
                        format,
                        schoolName: formData.schoolName,
                        educationRegion: formData.educationRegion,
                    },
                }),
            });
        } catch (error) {
            console.error('Track report error:', error);
        }
    };

    const handleDownloadPDF = async () => {
        if (!reportRef.current) return;
        setIsExporting(true);

        try {
            // Dynamically import libraries for client-side PDF generation
            const html2canvas = (await import('html2canvas')).default;
            const { jsPDF } = await import('jspdf');
            // Note: saveAs is imported at file top from 'file-saver'

            // Create a temporary container with A4 width for print-quality rendering
            // A4 at 96 DPI = 794px width
            const A4_WIDTH = 794;

            const tempContainer = document.createElement('div');
            tempContainer.style.cssText = `
                position: absolute;
                left: -9999px;
                top: 0;
                width: ${A4_WIDTH}px;
                background: white;
            `;
            document.body.appendChild(tempContainer);

            // Clone the report element into the fixed-width container
            const clone = reportRef.current.cloneNode(true) as HTMLElement;
            clone.style.width = `${A4_WIDTH}px`;
            clone.style.maxWidth = `${A4_WIDTH}px`;
            tempContainer.appendChild(clone);

            // Helper to convert image URL to Base64
            const toDataURL = async (url: string): Promise<string> => {
                try {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    });
                } catch (e) {
                    console.warn('Failed to convert image:', url, e);
                    return url;
                }
            };

            // Process all images in the clone to use Base64
            // This bypasses CORS and loading issues during capture
            const images = clone.getElementsByTagName('img');
            await Promise.all(Array.from(images).map(async (img) => {
                if (img.src && !img.src.startsWith('data:')) {
                    // Handle Next.js transparent placeholder or actual src
                    const src = img.currentSrc || img.src;
                    if (src) {
                        const base64 = await toDataURL(src);
                        img.src = base64;
                        img.srcset = ''; // Clear srcset to force base64 usage
                    }
                }
            }));

            // Wait a moment for the base64 replacements to render
            await new Promise(resolve => setTimeout(resolve, 500));

            // Use html2canvas to capture the element at A4 width
            const canvas = await html2canvas(clone, {
                scale: 2, // Higher quality
                useCORS: true,
                backgroundColor: '#ffffff',
                width: A4_WIDTH,
                windowWidth: A4_WIDTH,
                logging: false, // Disable verbose logging
            });

            // Cleanup temporary container
            document.body.removeChild(tempContainer);

            // Calculate PDF dimensions (A4 width in mm: 210)
            const imgWidth = 210;
            // Calculate height based on aspect ratio of the captured canvas
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Create PDF with dynamic height (one long page)
            // 'p' = portrait, 'mm' = units, [width, height] = custom size
            const pdf = new jsPDF('p', 'mm', [imgWidth, imgHeight]);
            const imgData = canvas.toDataURL('image/png', 1.0);

            // Add image to the single long PDF page
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            // Download the PDF using native approach
            const pdfBlob = pdf.output('blob');
            const blobUrl = URL.createObjectURL(new Blob([pdfBlob], { type: 'application/pdf' }));
            const downloadLink = document.createElement('a');
            downloadLink.href = blobUrl;
            downloadLink.download = `${formData.title || 'report'}.pdf`;
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            // Cleanup after a short delay
            setTimeout(() => {
                document.body.removeChild(downloadLink);
                URL.revokeObjectURL(blobUrl);
            }, 100);

            // Track the download
            await trackReport('pdf');
        } catch (error) {
            console.error("PDF generation failed:", error);
            alert("حدث خطأ أثناء إنشاء ملف PDF");
        } finally {
            setIsExporting(false);
        }
    };

    const handleDownloadWord = async () => {
        if (!reportRef.current) return;
        setIsExporting(true);

        try {
            const { asBlob } = await import('html-docx-js-typescript');

            // 1. Setup temporary container for computed style calculation
            const tempContainer = document.createElement('div');
            tempContainer.style.position = 'absolute';
            tempContainer.style.left = '-9999px';
            tempContainer.style.top = '0';
            tempContainer.style.width = '794px'; // A4 width
            document.body.appendChild(tempContainer);

            // 2. Clone the report
            const clone = reportRef.current.cloneNode(true) as HTMLElement;
            tempContainer.appendChild(clone);

            // 3. Recursive function to inline styles with more properties
            const applyInlineStyles = (element: HTMLElement) => {
                const computed = window.getComputedStyle(element);

                // Essential properties to transfer from CSS to inline style
                element.style.color = computed.color;
                element.style.backgroundColor = computed.backgroundColor;
                element.style.fontSize = computed.fontSize;
                element.style.fontWeight = computed.fontWeight;
                element.style.fontFamily = 'Arial, sans-serif'; // Use Word-compatible font
                element.style.textAlign = computed.textAlign as any;
                element.style.lineHeight = computed.lineHeight;
                element.style.borderTop = computed.borderTop;
                element.style.borderBottom = computed.borderBottom;
                element.style.borderLeft = computed.borderLeft;
                element.style.borderRight = computed.borderRight;
                element.style.borderRadius = '0'; // Word doesn't support border-radius well
                element.style.padding = computed.padding;
                element.style.margin = computed.margin;
                element.style.width = computed.width;
                element.style.minHeight = computed.minHeight;
                element.style.display = computed.display === 'flex' ? 'block' : computed.display;

                // Convert flexbox to table-like layout for Word
                if (computed.display === 'flex') {
                    element.style.display = 'table';
                    Array.from(element.children).forEach((child) => {
                        (child as HTMLElement).style.display = 'table-cell';
                        (child as HTMLElement).style.verticalAlign = 'top';
                    });
                }

                // Handle grid as block
                if (computed.display === 'grid') {
                    element.style.display = 'block';
                }

                Array.from(element.children).forEach(child => applyInlineStyles(child as HTMLElement));
            };

            // Apply styles to the clone
            applyInlineStyles(clone);

            // 4. Get content
            const content = clone.innerHTML;

            // Cleanup
            document.body.removeChild(tempContainer);

            const htmlString = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <style>
        @page {
            size: A4;
            margin: 15mm;
        }
        body { 
            font-family: 'Arial', 'Tahoma', sans-serif; 
            direction: rtl; 
            text-align: right;
            font-size: 12pt;
            line-height: 1.6;
            color: #333;
        }
        table { 
            border-collapse: collapse; 
            width: 100%; 
            margin-bottom: 10px;
        }
        td, th { 
            border: 1px solid #ddd; 
            padding: 8px; 
            text-align: right;
        }
        img {
            max-width: 100%;
            height: auto;
        }
        h1, h2, h3 {
            color: #006747;
            margin-bottom: 10px;
        }
        p {
            margin-bottom: 8px;
        }
    </style>
</head>
<body>
    ${content}
</body>
</html>
      `;

            const blob = await asBlob(htmlString);
            saveAs(blob as Blob, `${formData.title || 'تقرير'}.docx`);

            // Track the download
            await trackReport('word');

        } catch (error) {
            console.error("Word generation failed:", error);
            alert("حدث خطأ أثناء إنشاء ملف Word");
        } finally {
            setIsExporting(false);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: formData.title,
                    text: `تقرير: ${formData.title}\nإعداد: ${formData.activityLeaderName}`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log("Error sharing:", error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert("تم نسخ رابط التقرير إلى الحافظة");
            } catch (err) {
                alert("المتصفح لا يدعم المشاركة");
            }
        }
    };

    const handleNewReport = () => {
        reset();
        router.push("/select");
    };

    const currentFontFamily = FONT_OPTIONS.find(f => f.id === selectedFont)?.family || FONT_OPTIONS[0].family;

    const renderTemplate = () => {
        const templateProps = {
            formData,
            reportTypeTitle: config.title,
        };

        switch (selectedTemplate) {
            case 'exchange-visit': return <TemplateExchangeVisit {...templateProps} />;
            case 'shahed': return <TemplateShahed {...templateProps} />;
            case 'modern-cards': return <TemplateModernCards {...templateProps} />;
            case 'professional-grid': return <TemplateProfessionalGrid {...templateProps} />;
            case 'minimal-clean': return <TemplateMinimalClean {...templateProps} />;
            case 'bold-header': return <TemplateBoldHeader {...templateProps} />;
            case 'classic-report': return <TemplateClassicReport {...templateProps} />;
            case 'teal-frame': return <TemplateTealFrame {...templateProps} />;
            case 'navy-executive': return <TemplateNavyExecutive {...templateProps} />;
            case 'forest-green': return <TemplateForestGreen {...templateProps} />;
            case 'royal-purple': return <TemplateRoyalPurple {...templateProps} />;
            case 'sunset-orange': return <TemplateSunsetOrange {...templateProps} />;
            case 'corporate-blue': return <TemplateCorporateBlue {...templateProps} />;
            case 'modern-minimal': return <TemplateModernMinimal {...templateProps} />;
            case 'academic-excellence': return <TemplateAcademicExcellence {...templateProps} />;
            case 'creative-studio': return <TemplateCreativeStudio {...templateProps} />;
            case 'official-gov': return <TemplateOfficialGov {...templateProps} />;
            case 'shahed-exact': return <TemplateShahedExact {...templateProps} />;
            case 'shahed-modern': return <TemplateShahedModern {...templateProps} />;
            case 'shahed-compact': return <TemplateShahedCompact {...templateProps} />;
            case 'shahed-dark': return <TemplateShahedDark {...templateProps} />;
            case 'shahed-elegant': return <TemplateShahedElegant {...templateProps} />;
            case 'shahed-new': return <TemplateShahedNew {...templateProps} />;
            default: return <TemplateExchangeVisit {...templateProps} />;
        }
    };

    const TemplateButton = ({ template }: { template: typeof TEMPLATES[0] }) => (
        <button
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={`w-full text-right p-3 rounded-xl transition-all ${selectedTemplate === template.id
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
                }`}
        >
            <div className="flex items-center gap-3">
                <span className="text-2xl">{template.icon}</span>
                <div>
                    <p className="font-medium text-sm">{template.nameAr}</p>
                    <p className={`text-xs ${selectedTemplate === template.id
                        ? 'text-white/70'
                        : 'text-slate-500 dark:text-slate-400'
                        }`}>
                        {template.name}
                    </p>
                </div>
            </div>
        </button>
    );

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
            {/* Mobile Overlay */}
            {showTemplateSelector && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setShowTemplateSelector(false)}
                />
            )}

            {/* Header */}
            <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center gap-2">
                    <Link
                        href={`/create/${reportType}`}
                        className="flex items-center gap-1 sm:gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors shrink-0"
                    >
                        <ArrowRightIcon className="w-5 h-5" />
                        <span className="hidden sm:inline">العودة للتعديل</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowTemplateSelector(!showTemplateSelector)}
                            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-colors ${showTemplateSelector
                                ? 'bg-primary text-white'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                }`}
                        >
                            <Squares2X2Icon className="w-5 h-5" />
                            <span>القوالب</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                        <ThemeToggle />
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 dark:bg-white/10 rounded-full flex items-center justify-center shadow-sm">
                            <span className="font-bold text-primary text-sm sm:text-base">RC</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex relative">
                {/* Sidebar */}
                <aside className={`
          fixed lg:sticky top-[57px] sm:top-[65px] lg:top-[73px] right-0 z-50 lg:z-auto
          w-[85vw] max-w-[280px] sm:w-64 bg-white dark:bg-slate-800 
          border-l border-slate-200 dark:border-slate-700 
          p-4 h-[calc(100vh-57px)] sm:h-[calc(100vh-65px)] lg:h-[calc(100vh-73px)] 
          overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${showTemplateSelector ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 lg:hidden'}
        `}>
                    <div className="flex justify-between items-center mb-4 lg:hidden">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">اختر القالب</h3>
                        <button
                            onClick={() => setShowTemplateSelector(false)}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    {/* Font Selector */}
                    <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl">
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">🔤 الخط</p>
                        <select
                            value={selectedFont}
                            onChange={(e) => setSelectedFont(e.target.value)}
                            className="w-full p-2 rounded-lg bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 text-sm text-slate-800 dark:text-white"
                        >
                            {FONT_OPTIONS.map((font) => (
                                <option key={font.id} value={font.id}>{font.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Featured Templates */}
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        ⭐ القوالب المميزة
                    </h3>
                    <div className="space-y-2 mb-4">
                        {featuredTemplates.map((template) => (
                            <TemplateButton key={template.id} template={template} />
                        ))}
                    </div>

                    {/* More Templates Button */}
                    <button
                        onClick={() => setShowAllTemplates(!showAllTemplates)}
                        className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors mb-3"
                    >
                        {showAllTemplates ? (
                            <>
                                <ChevronUpIcon className="w-4 h-4" />
                                <span className="text-sm">إخفاء القوالب الأخرى</span>
                            </>
                        ) : (
                            <>
                                <ChevronDownIcon className="w-4 h-4" />
                                <span className="text-sm">المزيد من القوالب ({otherTemplates.length})</span>
                            </>
                        )}
                    </button>

                    {/* Other Templates (Collapsible) */}
                    {showAllTemplates && (
                        <div className="space-y-2 animate-fadeIn">
                            {otherTemplates.map((template) => (
                                <TemplateButton key={template.id} template={template} />
                            ))}
                        </div>
                    )}

                    {/* Selected Template Info */}
                    <div className="mt-4 p-3 bg-primary/10 dark:bg-primary/20 rounded-xl border border-primary/20">
                        <p className="text-xs text-primary/70 dark:text-primary/80 mb-1">القالب المحدد</p>
                        <p className="font-bold text-primary">
                            {TEMPLATES.find(t => t.id === selectedTemplate)?.nameAr}
                        </p>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 sm:p-6 pb-24">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-primary rounded-full text-sm font-medium shadow-sm mb-2">
                            <DocumentTextIcon className="w-4 h-4" />
                            <span>معاينة {config.title}</span>
                        </div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                            {formData.title}
                        </h1>
                    </div>

                    {/* Template Rendering with Font Applied */}
                    <div className="mb-8" ref={reportRef} style={{ fontFamily: currentFontFamily }}>
                        {renderTemplate()}
                    </div>

                    {/* Action Toolbar */}
                    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-800 z-40">
                        <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
                            {/* PDF Button */}
                            <button
                                onClick={handleDownloadPDF}
                                disabled={isExporting}
                                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-medium transition-colors shadow-lg disabled:opacity-50"
                            >
                                <ArrowDownTrayIcon className="w-5 h-5" />
                                <span>PDF</span>
                            </button>

                            {/* Word Button */}
                            <button
                                onClick={handleDownloadWord}
                                disabled={isExporting}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition-colors shadow-lg disabled:opacity-50"
                            >
                                <DocumentTextIcon className="w-5 h-5" />
                                <span>Word</span>
                            </button>

                            {/* Share Button */}
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-5 py-3 rounded-xl font-medium transition-colors shadow-lg"
                            >
                                <ShareIcon className="w-5 h-5" />
                                <span>مشاركة</span>
                            </button>

                            <div className="w-px h-10 bg-slate-300 dark:bg-slate-700 mx-2 hidden sm:block"></div>

                            {/* Edit Button */}
                            <Link
                                href={`/create/${reportType}`}
                                className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-5 py-3 rounded-xl font-medium transition-colors border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                            >
                                <PencilSquareIcon className="w-5 h-5" />
                                <span>تعديل</span>
                            </Link>

                            {/* New Report Button */}
                            <button
                                onClick={handleNewReport}
                                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white px-4 py-3 font-medium transition-colors"
                            >
                                <span>جديد</span>
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
