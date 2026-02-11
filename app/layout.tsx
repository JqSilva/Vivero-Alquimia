// app/layout.tsx
import "./globals.css";
import { CartProvider } from '@/context/CartContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-100 antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}