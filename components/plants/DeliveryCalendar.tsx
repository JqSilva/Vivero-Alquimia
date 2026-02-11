'use client';
import { useState, useMemo } from 'react';
import { useCart } from '@/context/CartContext'; 

export const DeliveryCalendar = () => {
  // 1. Estados y Contexto
  const { setFechaEntrega } = useCart(); // Traemos la función del almacén global
  const [fechaReferencia, setFechaReferencia] = useState(new Date());
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(new Date());

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  // 2. Lógica para guardar y exportar al contexto
  const seleccionarDia = (fecha: Date) => {
    // Actualizamos el estado visual (lo que ves en pantalla)
    setFechaSeleccionada(fecha); 

    // Exportamos al Contexto (lo que leerá el ActionFooter y el Carrito)
    // Usamos toISOString().split('T')[0] para que guarde solo "YYYY-MM-DD"
    const fechaParaBD = fecha.toISOString().split('T')[0];
    setFechaEntrega(fechaParaBD);

    console.log("📤 Exportando fecha al CartContext:", fechaParaBD);
  };

  // 3. Cálculo de la grilla semanal
  const { diasSemana, nombreMes, anio } = useMemo(() => {
    const dias = [];
    const copiaFecha = new Date(fechaReferencia);
    const diaSemana = copiaFecha.getDay(); 
    const diferenciaAlLunes = diaSemana === 0 ? -6 : 1 - diaSemana;
    copiaFecha.setDate(copiaFecha.getDate() + diferenciaAlLunes);

    for (let i = 0; i < 7; i++) {
      dias.push(new Date(copiaFecha));
      copiaFecha.setDate(copiaFecha.getDate() + 1);
    }

    const mes = fechaReferencia.toLocaleString('es-ES', { month: 'long' });
    return {
      diasSemana: dias,
      nombreMes: mes.charAt(0).toUpperCase() + mes.slice(1),
      anio: fechaReferencia.getFullYear()
    };
  }, [fechaReferencia]);

  const cambiarSemana = (offset: number) => {
    const nuevaFecha = new Date(fechaReferencia);
    nuevaFecha.setDate(nuevaFecha.getDate() + (offset * 7));
    setFechaReferencia(nuevaFecha);
  };

  return (
    <div className="px-4 pt-6">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-100">
        <div className="flex justify-between items-center mb-6">
          <p className="font-bold text-sm text-primary">{nombreMes} {anio}</p>
          <div className="flex gap-4">
            <button onClick={() => cambiarSemana(-1)} className="material-symbols-outlined text-xl text-zinc-400 hover:text-primary transition-colors">
              chevron_left
            </button>
            <button onClick={() => cambiarSemana(1)} className="material-symbols-outlined text-xl text-zinc-400 hover:text-primary transition-colors">
              chevron_right
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-zinc-400 mb-3">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((dia, index) => (
            <div key={`${dia}-${index}`}>{dia}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {diasSemana.map((fecha) => {
            const esPasado = fecha < hoy;
            const esSeleccionado = fechaSeleccionada?.toDateString() === fecha.toDateString();
            const diaDelMes = fecha.getDate();

            return (
              <button
                key={fecha.toISOString()}
                disabled={esPasado}
                onClick={() => seleccionarDia(fecha)} // <-- USAMOS LA NUEVA FUNCIÓN AQUÍ
                className={`h-10 w-full flex flex-col items-center justify-center rounded-xl text-xs transition-all ${
                  esPasado 
                    ? "text-zinc-300 cursor-not-allowed opacity-40" 
                    : esSeleccionado
                      ? "bg-primary text-white font-bold shadow-md shadow-primary/30"
                      : "text-[#121716] font-semibold hover:bg-zinc-50"
                }`}
              >
                {diaDelMes}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 p-3 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center gap-3">
        <span className="material-symbols-outlined text-zinc-400 text-sm">schedule</span>
        <p className="text-[10px] text-zinc-500 font-medium">
          {fechaSeleccionada 
            ? `Has seleccionado el día ${fechaSeleccionada.getDate()} de ${fechaSeleccionada.toLocaleString('es-ES', {month: 'long'})} para tu entrega.` 
            : "Selecciona un día disponible (en negro)."}
        </p>
      </div>
    </div>
  );
};