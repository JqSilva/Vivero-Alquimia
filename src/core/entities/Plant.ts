// src/core/entities/Plant.ts
export interface Plant {
  id: string;          // El ID único
  name: string;        // Nombre de la planta
  price: number;       // Precio numérico
  imageUrl: string;    // Link a la foto
  category: string;    // Ej: "Interior", "Suculentas"
  stock: number;       // Cantidad disponible
  description?: string; // El '?' significa que es opcional
  stock: number;       // Para saber si puedes venderla
  rating?: number;     // Puntuación promedio (opcional)
  ubicacion?: string;  // Ej: "Sombra", "Sol directo" (opcional)
}