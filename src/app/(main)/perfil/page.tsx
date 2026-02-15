'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Login } from '@/components/auth/login';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface UserProfile {
  id: string;
  full_name: string | null;
  address: string | null;
  phone: string | null;
  avatar_url: string | null;
}

export default function ProfilePage() {
  const router = useRouter();
  
  // Extraemos todo del Contexto Global
  const { user, profile, loading, signOut, updateProfileState } = useAuth();

  // Solo mantenemos estados locales para la INTERFAZ de edición
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');

  // Sincronizamos los inputs locales con los datos del perfil global cuando carguen
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setAddress(profile.address || '');
    }
  }, [profile]);

  const handleUpdate = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          address: address,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;
      
      updateProfileState({ ...profile!, full_name: fullName, address: address });
      setIsEditing(false); // Vuelve al estado original (lectura)
    } catch (error) {
      alert('Error al actualizar perfil');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) return null;

  if (!user) {
    return <Login />;
  }

  console.log("Perfil cargado:", user);

  return (
    <main className="min-h-screen bg-background-light font-display text-gray-800 flex items-center justify-center">
      <div className='w-full max-w-[430px] min-h-[932px] bg-white shadow-2xl relative overflow-hidden flex flex-col'>
        <header className="flex items-center justify-between px-6 py-4">
          <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined text-primary">arrow_back_ios_new</span>
          </button>
          <h1 className="text-lg font-bold">Mi Perfil</h1>
          <button 
            onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${isEditing ? 'bg-primary text-white' : 'hover:bg-primary/10 text-primary'}`}
          >
            <span className="material-symbols-outlined">{isEditing ? 'save' : 'edit'}</span>
          </button>
        </header>
        
        <section className="flex flex-col items-center pt-8 pb-10">
          <div className='relative mb-6'>
            <div className='w-32 h-32 rounded-full border-4 border-primary/20 p-1'>
              <img className='w-full h-full object-cover rounded-full' src={profile?.avatar_url || "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?w=300&ssl=1"} alt="usuario" />
            </div>
            <div className='absolute bottom-1 right-1 bg-primary text-white pt-2 pr-2 pl-2 pb-1 rounded-full shadow-lg border-2 border-white '>
              <span className="material-symbols-outlined text-sm ">photo_camera</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {isEditing ? (
                <input className="text-center border-b border-primary outline-none" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            ) : (
                profile?.full_name || "Nombre de usuario"
            )}
          </h2>
          <p className="text-gray-500 font-medium">{profile?.address || "Dirección no registrada"}</p>
        </section> 
        
        <main className='flex-grow px-6 space-y-4'>
          <div className='space-y-2'>
            <p className='text-xs font-bold text-primary uppercase tracking-wider px-2'>Información de Cuenta</p>
            <div className='bg-background-light rounded-xl overflow-hidden border border-primary/5'>
              <div className='w-full flex items-center justify-between p-4'>
                <div className='flex items-center gap-4'>
                  <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
                    <span className="material-symbols-outlined text-primary">person</span>
                  </div>
                  <div className='text-left'>
                    <p className='text-xs text-gray-400 font-medium'>Nombre de Perfil</p>
                    {isEditing ? (
                      <input className="text-sm font-semibold bg-transparent border-b border-primary outline-none" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    ) : (
                      <p className='text-sm font-semibold'>{profile?.full_name}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className='h-px bg-primary/5 mx-4'></div>
              <div className='w-full flex items-center justify-between p-4'>
                <div className='flex items-center gap-4'>
                  <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
                    <span className="material-symbols-outlined text-primary">email</span>
                  </div>
                  <div className='text-left'>
                    <p className='text-xs text-gray-400 font-medium'>Correo Electrónico</p>
                    <p className='text-sm font-semibold'>{user?.email}</p>
                  </div>
                </div>
              </div>
              <div className='h-px bg-primary/5 mx-4'></div>
              <div className='w-full flex items-center justify-between p-4'>
                <div className='flex items-center gap-4'>
                  <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
                    <span className="material-symbols-outlined text-primary">local_shipping</span>
                  </div>
                  <div className='text-left flex-1'>
                    <p className='text-xs text-gray-400 font-medium'>Dirección</p>
                    {isEditing ? (
                      <input className="text-sm font-semibold bg-transparent border-b border-primary outline-none w-full" value={address} onChange={(e) => setAddress(e.target.value)} />
                    ) : (
                      <p className='text-sm font-semibold'>{profile?.address}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-2'>
            <p className='text-xs font-bold text-primary uppercase tracking-wider px-2'>Preferencias</p>
            <div className='bg-background-light rounded-xl overflow-hidden border border-primary/5'>
              <button className='w-full flex items-center justify-between p-4 hover:bg-primary/5 transition-colors group'>
                <div className='flex items-center gap-4'>
                  <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
                    <span className="material-symbols-outlined text-primary">notifications</span>
                  </div>
                  <p className='text-sm font-semibold'>Notificaciones</p>
                </div>
                <div className='w-10 h-6 bg-primary rounded-full relative'>
                  <div className='absolute top-1 right-1 w-4 h-4 bg-white rounded-full'></div>
                </div>
              </button>
            </div>
          </div>
        </main>

        <footer className='p-6 mb-30'>
          <button onClick={handleSignOut} className='w-full bg-red-50 text-red-600 py-4 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-[0.98]'>
            <span className="material-symbols-outlined text-lg">logout</span>
            Cerrar Sesión
          </button>
        </footer>
      </div>
    </main>
  );
}