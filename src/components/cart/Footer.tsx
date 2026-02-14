
'use client'

import { useCart } from '@/context/CartContext';

export const Footer = () => {
    const { cart } = useCart();

    // Lógica de cálculos centralizada en el footer [cite: 192, 193]
    const totalCompra = cart.reduce((acc, item) => acc + (item.total || 0), 0);
    const totalItems = cart.reduce((acc, item) => acc + (item.cantidad || 0), 0);

    if (cart.length === 0) return null;

    return (
        <div className='z-70 absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 p-6 pb-10 rounded-t-[32px] shadow-[0_-12px_40px_rgba(0,0,0,0.08)]'>
            <div className='space-y-3 mb-6'>
                {/* Detalle de items */}
                <div className='flex justify-between items-center'>
                    <p className='text-sm font-medium text-zinc-500'>Subtotal ({totalItems} productos)</p>
                    <p className='text-[#101913] text-sm font-bold'>${totalCompra.toLocaleString('es-CL')}</p>
                </div>

                {/* Info de Envío */}
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-1'>
                        <p className='text-primary text-sm font-medium'>Envío</p>
                        <span className="material-symbols-outlined text-sm text-primary">info</span>
                    </div>
                    <p className='text-primary text-sm font-bold uppercase tracking-tight'>Gratis</p>
                </div>

                {/* Total Final */}
                <div className='pt-3 mt-1 border-t border-gray-100 flex justify-between items-center'>
                    <p className='text-[#121716] text-lg font-bold'>Total</p>
                    <p className='text-primary text-2xl font-black'>${totalCompra.toLocaleString('es-CL')}</p>
                </div>
            </div>

            {/* Botón de Acción Principal [cite: 98] */}
            <button className='group relative w-full bg-primary active:scale-[0.98] transition-all text-white py-4 rounded-2xl font-bold text-base shadow-lg shadow-primary/25 flex items-center justify-center gap-3 overflow-hidden'>
                <span>Proceder al pago</span>
                <span className='material-symbols-outlined text-xl transition-transform group-hover:translate-x-1'>shopping_cart_checkout</span>
            </button>
        </div>
    );
};