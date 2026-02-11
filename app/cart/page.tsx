'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const { cart, totalPrice, totalItems, removeFromCart } = useCart(); 
    const router = useRouter();

    const formatearFecha = (fechaString: string) => {
        if (!fechaString) return "Fecha no definida";
        
        const [anio, mes, dia] = fechaString.split('-').map(Number);
        const fecha = new Date(anio, mes - 1, dia);

        const numeroDia = fecha.getDate();
        const nombreMes = fecha.toLocaleString('es-ES', { month: 'long' });

        return `${numeroDia} de ${nombreMes}`;
    };

    return (
        <main className='relative flex h-screen w-full flex-col overflow-hidden max-w-[430px] mx-auto bg-background-light border-x border-gray-100 shadow-2xl'>
            
            {/* topBar */}
            <div className="sticky top-0 z-50 flex items-center bg-background-light/80 backdrop-blur-md p-4 pb-2 justify-between">
                <button 
                    onClick={() => router.back()}
                    className="text-primary flex size-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm active:scale-90 transition-transform"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                
                <h2 className="text-[#121716] text-sm font-bold leading-tight flex-1 text-center uppercase tracking-[0.2em]">
                    Carrito De Compras
                </h2>

                <div className="flex w-10 items-center justify-end">
                    <span className="material-symbols-outlined !text-2xl mr-2 text-primary" style={{fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>shopping_cart</span>
                </div>
            </div>

            <div className='flex-1 overflow-y-auto px-4 pt-6 pb-64 space-y-4'>
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <span className="material-symbols-outlined text-6xl text-zinc-200 mb-4">shopping_basket</span>
                        <p className="text-zinc-500 font-medium">Tu carrito está vacío</p>
                        <Link href="/" className="text-primary font-bold text-sm mt-2 underline">Ir a buscar plantas</Link>
                    </div>
                ) : (
                    cart.map((item, index) => {
                        const esEncargo = item.stock === 0;
                        const precioAMostrar = esEncargo ? item.precio * 0.3 : item.precio;

                        return (
                            <div key={`${item.id}-${index}`} className='flex flex-col gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-50'>
                                <div className='flex gap-4'>
                                    <div 
                                        className='bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-20 shadow-inner' 
                                        style={{ backgroundImage: `url(${item.imagen_url})` }}
                                    ></div>
                                    <div className='flex flex-1 flex-col justify-between py-1'>
                                        <div>
                                            <div className='text-base font-semibold leading-tight text-[#121716]'>
                                                {item.nombre}
                                            </div>
                                            <p className='text-[10px] font-bold uppercase tracking-wider mt-1 text-primary'>
                                                {esEncargo ? '🛒 Encargo (Seña 30%)' : item.categoria || 'Disponible'}
                                            </p>
                                        </div>
                                        <p className='text-[#101913] text-lg font-bold leading-none'>
                                            ${precioAMostrar.toLocaleString('es-CL')}
                                        </p>
                                    </div>
                                    <div className='shrink-0 self-center'>
                                        <div className='flex items-center gap-3 bg-background-light p-1 rounded-full border border-gray-100'>
                                            {/* BOTÓN RESTAR: Pasa ID y Fecha para saber cuál restar */}
                                            <button 
                                                onClick={() => removeFromCart(item.id, item.fechaEntregaItem)}
                                                className='flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 hover:text-primary shadow-sm active:scale-90'
                                            >
                                                -
                                            </button>
                                            
                                            <span className='text-sm font-bold w-4 text-center'>
                                                {item.cantidad}
                                            </span>
                                            
                                            {/* BOTÓN SUMAR: Pasa la planta, la fecha y cantidad 1 */}
                                            <button 
                                                onClick={() => addToCart(item, item.fechaEntregaItem, 1)}
                                                className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-md active:scale-90'
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className='shrink-0 self-start'>
                                        <button 
                                            onClick={() => removeFromCart(item.id)}
                                            className='flex h-8 w-8 items-center justify-center rounded-full bg-zinc-50 text-zinc-400 hover:text-red-500 transition-colors'
                                        >
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
                                    <span className="material-symbols-outlined text-[18px] text-primary">local_shipping</span>
                                    <p className="text-primary text-xs font-normal">
                                        Entrega estimada: <span className="font-semibold">{formatearFecha(item.fechaEntregaItem)}</span>
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* footer pago */}
            {cart.length > 0 && (
                <div className='absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 p-6 pb-10 rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.05)]'>
                    <div className='space-y-3 mb-6'>
                        <div className='flex justify-between items-center'>
                            <p className='text-sm font-medium text-zinc-500'>Subtotal ({totalItems} items)</p>
                            <p className='text-[#101913] text-sm font-bold'>${totalPrice.toLocaleString('es-CL')}</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-1'>
                                <p className='text-primary text-sm font-medium'>Envío</p>
                                <span className='material-symbols-outlined text-sm text-primary'>info</span>
                            </div>
                            <p className='text-primary text-sm font-bold uppercase tracking-tight'>Gratis</p>
                        </div>
                        <div className='pt-3 mt-1 border-t border-gray-100 flex justify-between items-center'>
                            <p className='text-[#121716] text-lg font-bold'>Total</p>
                            <p className='text-primary text-2xl font-extrabold'>${totalPrice.toLocaleString('es-CL')}</p>
                        </div>
                    </div>
                    <button className='w-full bg-primary active:scale-[0.98] transition-all text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-primary/20 flex items-center justify-center gap-2'>
                        <span>Proceder al pago</span>
                        <span className='material-symbols-outlined text-[20px]'>shopping_cart_checkout</span>
                    </button>
                </div>
            )}
        </main> 
    );
}