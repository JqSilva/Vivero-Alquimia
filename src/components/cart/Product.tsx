/* src/components/cart/Product.tsx */

'use client';

import { CartItem } from '@/core/entities/CartItem';
import { useCart } from '@/context/CartContext';

interface ProductProps {
  item: CartItem;
}

export const Product = ({ item }: ProductProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const esEncargo = item.esEncargo || false;
  const precioParaMostrar = item.precioUnitario || 0;

  const formatearFecha = (fechaString: string) => {
    if (!fechaString) return "Fecha no definida";
    try {
      const [anio, mes, dia] = fechaString.split('-').map(Number);
      const fecha = new Date(anio, mes - 1, dia);
      const numeroDia = fecha.getDate();
      const nombreMes = fecha.toLocaleString('es-ES', { month: 'long' });
      return `${numeroDia} de ${nombreMes}`;
    } catch (e) {
      return fechaString;
    }
  };

  console.log(item);

  return (
    <div className='flex flex-col gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-50'>
      <div className='flex gap-4'>
        {/* Imagen */}
        <div className='size-20 rounded-xl overflow-hidden shadow-inner bg-zinc-100 border border-gray-100 shrink-0'>
          <img 
            src={item.imageUrl} 
            alt={item.nombre} 
            className='h-full w-full object-cover' 
          />
        </div>

        {/* Info */}
        <div className='flex flex-1 flex-col justify-between'>
          <div>
            <div className='text-base font-semibold leading-tight text-[#121716]'>
              {item.nombre}
            </div>
            <p className='text-[10px] font-bold uppercase tracking-wider mt-1 text-primary'>
              {esEncargo ? '🛒 Encargo (Seña 30%)' : 'Disponible'}
            </p>
          </div>
          <p className='text-[#101913] text-lg font-bold leading-none'>
            ${precioParaMostrar.toLocaleString('es-CL')}
          </p>
        </div>

        {/* Controles de cantidad */}
        <div className='shrink-0 self-center'>
          <div className='flex items-center gap-3 bg-zinc-50 p-1 rounded-full border border-gray-100'>
            <button 
              onClick={() => updateQuantity(item.cartId, -1)}
              className='flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm active:scale-90 transition-transform'
            >
              -
            </button>
            <span className='text-sm font-bold w-4 text-center'>{item.cantidad}</span>
            <button 
              onClick={() => updateQuantity(item.cartId, 1)}
              className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-md active:scale-90 transition-transform'
            >
              +
            </button>
          </div>
          
        </div>
      </div>

      {/* Entrega */}
      <div className='flex justify-between'>
        <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
            <span className="material-symbols-outlined text-[18px] text-primary">local_shipping</span>
            <p className="text-primary text-xs font-normal">
            Entrega estimada: <span className="font-semibold">{formatearFecha(item.fechaEntrega)}</span>
            </p>
        </div>
        <div className='flex items-center pt-2'>
            <button onClick={() => removeFromCart(item.cartId)} className='text-zinc-600 hover:text-red-500 transition-colors'>
                <span className="material-symbols-outlined">delete</span>
            </button>
        </div>
      </div>
    </div>
  );
};