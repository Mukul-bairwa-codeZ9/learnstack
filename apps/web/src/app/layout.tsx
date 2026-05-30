import "./globals.css";
import { Toaster } from "sonner";
import { StoreProvider } from "@/providers/store-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <StoreProvider>
          <AuthProvider>
            {children}
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
