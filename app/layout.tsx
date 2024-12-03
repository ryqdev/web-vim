import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web Vim",
  description: "Be yourself",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
