import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from "@/components/auth/require-auth";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RequireAuth>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col h-screen overflow-hidden">
          <Header />
          <div className="flex-1 overflow-auto p-6 bg-white">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </RequireAuth>
  );
}
