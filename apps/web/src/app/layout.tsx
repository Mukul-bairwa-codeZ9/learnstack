import './globals.css';

import { StoreProvider } from '@/providers/store-provider';
import { UIProvider } from '@/providers/heroui-provider';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
           <UIProvider>
          {children}
          </UIProvider>
        </StoreProvider>
      </body>
    </html>
  );
}