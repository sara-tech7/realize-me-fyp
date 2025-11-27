import type { Metadata } from "next";
import "../styles/global.css";

export const metadata: Metadata = {
  title: "Realize — Turn Sketches Into Fashion",
  description: "AI-powered sketch-to-fashion transformation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F8F9FA] antialiased">
        {children}
      </body>
    </html>
  );
}
