// src/types/index.ts

export type NivelCuidado = 'Bajo' | 'Medio' | 'Alto';
export type Ubicacion = 'Interior' | 'Exterior' | 'Ambos';

export interface Categoria {
  id: number;
  nombre: string;
}

export interface Planta {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  dias_reabastecimiento: number;
  categoria_id: number;
  imagen_url?: string;
  puntuacion: number;
  
  // Atributos para el usuario aprendiz
  ubicacion: Ubicacion;
  nivel_riego: NivelCuidado;
  nivel_luz: string;
  mes_plantacion?: string;
}

export interface ItemCarrito extends Planta {
  cantidad: number;
  es_encargo: boolean; // Si stock era 0 al momento de agregar
}