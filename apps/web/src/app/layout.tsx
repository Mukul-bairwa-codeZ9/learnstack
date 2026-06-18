import "./globals.css";
import { Toaster } from "sonner";
import { StoreProvider } from "@/providers/store-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://learnstack.dev",
  ),

  title: {
    default: "LearnStack",
    template: "%s | LearnStack",
  },

  description:
    "Developer knowledge platform for creating documentation, organizing learning resources, and publishing technical content.",

  keywords: [
    "LearnStack",
    "documentation",
    "knowledge base",
    "developer platform",
    "technical documentation",
    "learning platform",
    "developer tools",
  ],

  openGraph: {
    title: "LearnStack",
    description:
      "Create documentation, organize knowledge, and publish learning resources.",
    siteName: "LearnStack",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "LearnStack",
    description:
      "Create documentation, organize knowledge, and publish learning resources.",
  },

  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body>
        <StoreProvider>
          <AuthProvider>
            <QueryProvider>
              <ThemeProvider>
                {children}
                <Toaster richColors position="top-right" />
              </ThemeProvider>
            </QueryProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
