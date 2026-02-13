'use client';

import { Header } from '@/components/cart/Header';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const { cart, removeFromCart, addToCart, clearCart } = useCart();
    const router = useRouter();

    // 1. Cálculos de totales (usando las propiedades de tu entidad CartItem)
    const totalCompra = cart.reduce((acc, item) => acc + (item.total || 0), 0);
    const totalItems = cart.reduce((acc, item) => acc + (item.cantidad || 0), 0);
    
    // 2. Formateador de fecha para que se vea: "13 de Febrero"
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

    // 3. Estado de Carrito Vacío
    if (cart.length === 0) {
        return (
            <main className='relative flex min-h-svh w-full flex-col max-w-[480px] mx-auto bg-background-light border-x border-gray-100 shadow-2xl'>
                <Header />
                <div className="flex flex-col items-center justify-center px-4 text-center flex-1">
                    <span className="material-symbols-outlined text-6xl text-zinc-300 mb-4">shopping_cart_off</span>
                    <h2 className="text-xl font-bold text-zinc-800">Tu carrito está vacío</h2>
                    <p className="text-zinc-500 mb-6 text-sm">Parece que aún no has programado ninguna entrega.</p>
                    <Link href="/" className="bg-primary text-white px-8 py-3 rounded-xl font-bold active:scale-95 transition-transform">
                        Explorar Plantas
                    </Link>
                </div>
            </main> 
        );
    }

    // 4. Carrito con Items
    return (
        <main className='bg-background-light text-[#101913] antialiased'>
            <div className='relative flex h-screen w-full flex-col overflow-hidden max-w-[430px] mx-auto bg-background-light  border-x border-gray-100  shadow-2xl'>
                <Header />
                {/* Lista de productos con scroll independiente */}
                <div className='flex-1 overflow-y-auto px-4 pt-6 pb-40 space-y-4'>
                    {cart.map((item, index) => {
                        const esEncargo = item.esEncargo || false;
                        const precioParaMostrar = item.precioUnitario || 0;

                        return (
                            <div key={item.cartId || `${item.id}-${index}`} className='flex flex-col gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-50'>
                                <div className='flex gap-4'>
                                    <div className='size-20 rounded-xl overflow-hidden shadow-sm bg-zinc-100 border border-gray-100 rounded-lg shadow-inner'>
                                        <img 
                                            src={item.imageUrl} 
                                            alt={item.nombre} 
                                            /* h-full w-full obliga a la imagen a no salirse del div de 80px */
                                            /* object-cover hace que la imagen se recorte para llenar el espacio sin estirarse */
                                            className='h-full w-full object-cover' 
                                        />
                                    </div>

                                    <div className='flex flex-1 flex-col justify-between'>
                                        <div>
                                            <div className='text-base font-semibold leading-tight text-[#121716]'>
                                                {item.nombre}
                                            </div>
                                            <p className='text-[10px] font-bold uppercase tracking-wider mt-1 text-primary'>
                                                {esEncargo ? '🛒 Encargo (Seña 30%)' : item.categoria || 'Disponible'}
                                            </p>
                                        </div>
                                        <p className='text-[#101913] text-lg font-bold leading-none'>
                                            ${precioParaMostrar.toLocaleString('es-CL')}
                                        </p>
                                    </div>

                                    {/* Controles de cantidad */}
                                    <div className='shrink-0 self-center'>
                                        <div className='flex items-center gap-3 bg-background-light p-1 rounded-full border border-gray-100'>
                                            <button 
                                                onClick={() => removeFromCart(item.cartId)}
                                                className='flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm active:scale-90 transition-transform'
                                            >
                                                -
                                            </button>
                                            
                                            <span className='text-sm font-bold w-4 text-center'>
                                                {item.cantidad}
                                            </span>
                                            
                                            <button 
                                                onClick={() => addToCart(item, item.cantidad, item.fechaEntrega)}
                                                className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-md active:scale-90 transition-transform'
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Botón eliminar fila completa */}
                                    <div className='shrink-0 self-start'>
                                        <button 
                                            onClick={() => removeFromCart(item.cartId)}
                                            className='flex h-8 w-8 items-center justify-center rounded-full bg-zinc-50 text-zinc-400 hover:text-red-500 transition-colors'
                                        >
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Info de Entrega */}
                                <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
                                    <span className="material-symbols-outlined text-[18px] text-primary">local_shipping</span>
                                    <p className="text-primary text-xs font-normal">
                                        Entrega estimada: <span className="font-semibold">{formatearFecha(item.fechaEntrega)}</span>
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            

            {/* Footer de pago fijo abajo */}
            {cart.length > 0 && (
                <div className='z-70 absolute bottom-0 left-0 right-0 bg-white/90  backdrop-blur-xl border-t border-gray-100 p-6 pb-8 rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.05)]'>
                    <div className='space-y-3 mb-6'>
                        <div className='flex justify-between items-center'>
                            <p className='text-sm font-medium text-zinc-500'>Subtotal ({totalItems} items)</p>
                            <p className='text-[#101913] text-sm font-bold'>${totalCompra.toLocaleString('es-CL')}</p>
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
                            <p className='text-primary text-2xl font-extrabold'>${totalCompra.toLocaleString('es-CL')}</p>
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