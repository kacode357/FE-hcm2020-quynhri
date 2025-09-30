// app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import MainHeader from "@/components/main-header";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hành trình tư tưởng",
  description: "Scrollytelling timeline – Bản đồ – Quiz",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      {/* NOTE: bọc grid 2 hàng: header (auto) + content (1fr) */}
      <body className={`${playfair.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <div className="min-h-screen grid grid-rows-[auto_1fr] overflow-x-hidden">
            <MainHeader />
            {/* vùng content chiếm toàn bộ phần còn lại dưới header */}
            <div className="row-start-2 row-end-3">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
