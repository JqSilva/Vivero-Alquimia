'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Planta, CartItem } from '@/core/entities';

interface CartContextType {
  cart: CartItem[];
  fechaEntrega: string | null;
  setFechaEntrega: (fecha: string) => void;
  addToCart: (planta: Planta, cantidad: number) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [fechaEntrega, setFechaEntrega] = useState<string | null>(null);

  const addToCart = (planta: Planta, cantidad: number) => {
    if (!fechaEntrega) {
      alert("Por favor, selecciona una fecha de entrega en el calendario.");
      return;
    }

    const sinStock = planta.stock === 0;
    const precioUnitario = sinStock ? (planta.price * 0.3) : planta.price;

    const nuevoPedido: CartItem = {
      cartId: Date.now().toString(), // ID único basado en tiempo
      plantaId: planta.id,
      nombre: planta.name,
      cantidad: cantidad,
      fechaEntrega: fechaEntrega,
      precioUnitario: precioUnitario,
      total: precioUnitario * cantidad,
      esEncargo: sinStock,
      imageUrl: planta.imageUrl
    };

    setCart((prev) => [...prev, nuevoPedido]);
    console.log("🛒 Producto añadido al carrito global:", nuevoPedido);
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => setCart([]);

  // 1. Al cargar por primera vez: Recuperar del LocalStorage
  useEffect(() => {
    const localCart = localStorage.getItem('alquimia_cart');
    if (localCart) {
      setCart(JSON.parse(localCart));
    }
  }, []);

  // 2. Cada vez que el carrito cambie: Guardar en LocalStorage
  useEffect(() => {
    localStorage.setItem('alquimia_cart', JSON.stringify(cart));
  }, [cart]);


  return (
    <CartContext.Provider value={{ cart, fechaEntrega, setFechaEntrega, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
  
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
};

