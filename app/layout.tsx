import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarDemo } from "./blocks/Sidebar-ui";
import ClientProvider from "./ClientProvider";
import MenuDetail from "./blocks/MenuDetail";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Menu Management",
  description: "Project by Chittaranjan",
  authors: [{ name: "Chittaranjan" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

     
          <ClientProvider>
                      <SidebarDemo />
                       <main className="flex-1 ml-[300px] mt-[50px] p-10">{children}</main>
                       <div className="flex-1 ml-[900px] top-20">
                       <MenuDetail />
                       </div>
        </ClientProvider>
        
    </html>
  );
}
