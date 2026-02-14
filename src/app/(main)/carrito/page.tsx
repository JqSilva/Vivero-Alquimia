/* src/app/(main)/carrito/page.tsx */
'use client';

import { Header } from '@/components/cart/Header';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import  { Product } from '@/components/cart/Product';
import { Footer } from '@/components/cart/Footer';

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
                    {cart.map((item) => (
                        <Product key={item.cartId} item={item} />
                    ))}
                </div>
            </div>
        <Footer />
        </main> 
    );
}