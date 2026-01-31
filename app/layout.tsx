import type { Metadata } from "next";
import { Inter, Hedvig_Letters_Serif } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import { Toaster } from "sonner";
import "./globals.css";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const hedvigLetters = Hedvig_Letters_Serif({
  variable: "--font-hedvig",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Taloo Admin",
  description: "Manage your WhatsApp and voice agents",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${hedvigLetters.variable} antialiased`}>
        <Theme accentColor="blue" grayColor="slate" radius="medium" scaling="100%">
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="flex flex-col h-screen overflow-hidden">
              <Header />
              <div className="flex-1 overflow-auto p-6 bg-white">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
          <Toaster position="bottom-right" richColors />
        </Theme>
      </body>
    </html>
  );
}
