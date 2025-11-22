import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/hooks/useCart";
import { Header } from "@/components";

export const metadata: Metadata = {
  title: "Reglo - Comparateur de Prix",
  description: "Comparez les prix de vos produits dans différents magasins",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased bg-black min-h-screen font-sans">
        <CartProvider>
          <Header />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
