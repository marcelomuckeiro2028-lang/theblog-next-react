import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "The Blog - Este é um blog com next.js",
  description: "Essa seria a descrição da minha página",
};

// ✅ Apenas use React.ReactNode
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-br"    
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}