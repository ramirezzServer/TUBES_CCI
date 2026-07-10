import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spektra",
  description: "Lacak film yang ingin dan sudah kamu tonton.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
