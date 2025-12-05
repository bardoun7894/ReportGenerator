import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
          title: "ReportCreator - إنشاء تقارير احترافية",
          description: "حوّل بيانات فعاليتك إلى تقرير احترافي خلال ثوانٍ بمساعدة الذكاء الاصطناعي",
          keywords: ["تقارير", "مدرسة", "تعليم", "فعالية", "السعودية"],
};

export default function RootLayout({
          children,
}: {
          children: React.ReactNode;
}) {
          return (
                    <html lang="ar" dir="rtl">
                              <body className="font-cairo antialiased">
                                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                                                  {children}
                                        </ThemeProvider>
                              </body>
                    </html>
          );
}
