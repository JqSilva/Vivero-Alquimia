import type { Metadata } from "next";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { FloatingCart } from "@/components/cart/FloatingCart";

export const metadata: Metadata = {
  title: "Tienda de Plantas y Árboles",
  description: "Botanica - Encuentra tu compañera verde",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="light">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
          rel="stylesheet" 
        />
      </head>
      {/* Cambiamos el fondo del body a un gris para que resalte el 'celular' blanco */}
      <body className="bg-gray-100 antialiased font-display">
        <TopBar />
        <div className="relative flex min-h-screen w-full flex-col max-w-[480px] mx-auto shadow-2xl bg-background-light overflow-x-hidden">
          {children}
        </div>
        <FloatingCart itemCount={2} totalPrice={83000} isVisible={true} />
        <BottomNav />
      </body>
    </html>
  );
}