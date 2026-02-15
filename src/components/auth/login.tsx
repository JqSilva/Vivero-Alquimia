'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase'; 
import { useRouter } from 'next/navigation';

export const Login = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Nuevos estados
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
      else router.push('/perfil');
    } else {
      // Registro incluyendo metadatos para que el Trigger de la DB los capture
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            address: address
          }
        }
      });
      if (error) alert(error.message);
      else alert("¡Cuenta creada! Revisa tu email para confirmar.");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/perfil' },
    });
    if (error) alert(error.message);
  };

  return (
    <div className="font-display bg-background-light text-slate-800 min-h-screen flex items-center justify-center">
      <div className='relative z-10 w-full max-w-[400px] px-6 py-12 flex flex-col min-h-screen justify-center'>
        <div className='bg-white/95 p-8 rounded-xl shadow-2xl border border-white/20'>
          
          <div className='flex flex-col items-center mb-8'>
            <div className='w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4'>
              <span className='material-symbols-outlined text-primary' style={{ fontSize: "36px" }}>eco</span>
            </div>
            <h1 className='text-2xl font-bold tracking-tight text-slate-900'>
              {isLogin ? 'Bienvenido' : 'Crear Cuenta'}
            </h1>
            <p className='text-sm text-slate-500 mt-1 text-center'>
              {isLogin ? 'Inicia sesión para cuidar de tus plantas' : 'Completa tus datos para unirte'}
            </p>
          </div>

          <form onSubmit={handleAuth} className='space-y-5'>
            {/* Campo de Nombre (Solo en registro) */}
            {!isLogin && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label htmlFor="fullName" className='block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 ml-1'>
                  Nombre Completo
                </label>
                <div className='relative'>
                  <span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' style={{ fontSize: '14px' }}>
                    person
                  </span>
                  <input 
                    required
                    className='w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400' 
                    id='fullName' 
                    type="text" 
                    placeholder='Ej: Juan Pérez'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Campo de Email */}
            <div>
              <label htmlFor="email" className='block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 ml-1'>
                Correo Electrónico
              </label>
              <div className='relative'>
                <span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' style={{ fontSize: '14px' }}>
                  alternate_email
                </span>
                <input 
                  required
                  className='w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400' 
                  id='email' 
                  type="email" 
                  placeholder='tu@email.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Campo de Dirección (Solo en registro) */}
            {!isLogin && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label htmlFor="address" className='block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 ml-1'>
                  Dirección de Entrega
                </label>
                <div className='relative'>
                  <span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' style={{ fontSize: '14px' }}>
                    local_shipping
                  </span>
                  <input 
                    required
                    className='w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400' 
                    id='address' 
                    type="text" 
                    placeholder='Ej: Calle Falsa 123'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Campo de Contraseña */}
            <div>
              <div className='flex justify-between items-center mb-2 ml-1'>
                <label htmlFor="password" className='block text-xs font-semibold uppercase tracking-wider text-slate-400'>Contraseña</label>
                {isLogin && <button type="button" className='text-xs font-medium text-primary hover:text-primary/80'>¿Olvidaste tu contraseña?</button>}
              </div>
              <div className='relative'>
                <span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' style={{ fontSize: '14px' }}>
                  lock_outline
                </span>
                <input 
                  required
                  className='w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400' 
                  id='password' 
                  type="password" 
                  placeholder='••••••••'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className='material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer' style={{ fontSize: '14px' }}>visibility</span>
              </div>
            </div>

            <div className='flex items-center space-x-2 px-1'>
              <input className='w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary/50 cursor-pointer' type="checkbox" id="remember" />
              <label className='text-sm text-slate-600 cursor-pointer select-none' htmlFor="remember">Recordarme</label>
            </div>

            <button 
              disabled={loading}
              className='w-full py-4 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center space-x-2' 
              type='submit'
            >
              <span>{loading ? 'PROCESANDO...' : (isLogin ? 'ENTRAR' : 'CREAR MI CUENTA')}</span>
            </button>
          </form>

          <div className='relative my-8'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t border-slate-200'></span>
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-white px-4 text-slate-400'>o continuar con</span>
            </div>
          </div>

          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3.5 bg-white border border-slate-200 rounded-lg flex items-center justify-center space-x-3 hover:bg-slate-50 transition-colors"
          >
            <svg className="w-5 h-5" height="20" viewBox="0 0 24 24" width="20">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            <span className="text-sm font-semibold text-slate-700">Iniciar con Google</span>
          </button>

          <p className="mt-8 text-center text-sm text-slate-500">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-primary ml-1 hover:underline"
            >
              {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
            </button>
          </p>
        </div>

        <div className='mt-auto pt-8 text-center'>
          <div className='flex items-center justify-center space-x-2 text-primary'>
            <span className='material-symbols-outlined' style={{ fontSize: '14px' }}>verified_user</span>
            <span className='text-[10px] uppercase tracking-[0.2em] font-medium'>Alquimia • 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};