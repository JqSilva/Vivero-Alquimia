'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '@/core/entities/CartItem';
import { Plant } from '@/core/entities/Plant';


interface CartContextType {
  cart: CartItem[];
  fechaEntrega: string | null;
  setFechaEntrega: (fecha: string) => void;
  addToCart: (planta: Plant, cantidad: number) => void;
  updateQuantity: (cartId: string, cambio: number) => void; 
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Default: Hoy
  const [fechaEntrega, setFechaEntrega] = useState<string | null>(new Date().toISOString().split('T')[0]);


  // CARGA INICIAL: Solo una vez al montar
  useEffect(() => {
    const localCart = localStorage.getItem('alquimia_cart');
    if (localCart) {
      try {
        setCart(JSON.parse(localCart));
      } catch (e) {
        console.error("Error al parsear carrito:", e);
      }
    }
  }, []);

  // PERSISTENCIA: Cada vez que el carrito cambia
  useEffect(() => {
    localStorage.setItem('alquimia_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (planta: Plant, cantidad: number) => {
    if (!fechaEntrega) {
      alert("Por favor, selecciona una fecha de entrega en el calendario.");
      return;
    }

    const idPedido = `${planta.id}-${fechaEntrega}`;

    console.log("planta:", planta);

    setCart((prev) => {
      // 1. Buscamos si ya existe la misma planta para la misma fecha [cite: 187]
      const existe = prev.find(item => item.cartId === idPedido);

      if (existe) {
        return prev.map(item => 
          item.cartId === idPedido 
            ? { ...item, cantidad: item.cantidad + cantidad, total: item.precioUnitario * (item.cantidad + cantidad) }
            : item
        );
      }

      // 3. Si no existe, creamos el pedido nuevo 
      const sinStock = planta.stock === 0; 
      const precioBase = planta.price || (planta as any).price;
      const precioUnitario = sinStock ? (precioBase * 0.3) : precioBase; 

      const nuevoPedido: CartItem = {
        cartId: idPedido,
        plantaId: String(planta.id),
        nombre: planta.name,
        cantidad: cantidad,
        fechaEntrega: fechaEntrega,
        precioUnitario: precioUnitario,
        total: precioUnitario * cantidad,
        esEncargo: sinStock,
        imageUrl: planta.imageUrl
      };

      return [...prev, nuevoPedido];
    });
  };

  const updateQuantity = (cartId: string, cambio: number) => {
    setCart((prev) =>
      prev.map(item => {
        if (item.cartId === cartId) {
          const nuevaCantidad = Math.max(1, item.cantidad + cambio);
          return { ...item, cantidad: nuevaCantidad, total: item.precioUnitario * nuevaCantidad };
        }
        return item;
      })
    );
  };
  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => setCart([]);
  
  return (
    <CartContext.Provider value={{ cart, fechaEntrega, setFechaEntrega, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  console.log("Contexto CartContext:", context); // Debug para verificar que el contexto se está proporcionando correctamente
  if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
};