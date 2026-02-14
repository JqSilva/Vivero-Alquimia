export interface CartItem {
  cartId: string;       // Identificador único de este pedido en el carrito
  plantaId: string;     // ID de la planta en la base de datos
  nombre: string;
  cantidad: number;
  fechaEntrega: string; // Formato YYYY-MM-DD
  precioUnitario: number;
  total: number;
  esEncargo: boolean;   // Si es seña (30%) o pago total
  imageUrl?: string;
}