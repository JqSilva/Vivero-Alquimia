'use client';
import { useState, useMemo } from 'react';

export const DeliveryCalendar = () => {
  // Fecha de referencia para saber qué semana mostrar
  const [fechaReferencia, setFechaReferencia] = useState(new Date());
  const [diaSeleccionado, setDiaSeleccionado] = useState<number | null>(new Date().getDate());

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // Limpiamos horas para comparar solo fechas

  // Cálculo de los días de la semana actual
  const { diasSemana, nombreMes, anio } = useMemo(() => {
    const dias = [];
    const copiaFecha = new Date(fechaReferencia);
    
    // Encontrar el lunes de la semana actual
    const diaSemana = copiaFecha.getDay(); // 0 es domingo
    const diferenciaAlLunes = diaSemana === 0 ? -6 : 1 - diaSemana;
    copiaFecha.setDate(copiaFecha.getDate() + diferenciaAlLunes);

    // Generar los 7 días (Lunes a Domingo)
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

  // Funciones para navegar por semanas
  const cambiarSemana = (offset: number) => {
    const nuevaFecha = new Date(fechaReferencia);
    nuevaFecha.setDate(nuevaFecha.getDate() + (offset * 7));
    setFechaReferencia(nuevaFecha);
  };

  return (
    <div className="px-4 pt-6">
      <h2 className="text-[#121716] text-xl font-bold leading-tight mb-4 italic">Programar Pedido</h2>
      
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-100">
        <div className="flex justify-between items-center mb-6">
          <p className="font-bold text-sm text-primary">{nombreMes} {anio}</p>
          <div className="flex gap-4">
            <button 
              onClick={() => cambiarSemana(-1)}
              className="material-symbols-outlined text-xl text-zinc-400 hover:text-primary transition-colors"
            >
              chevron_left
            </button>
            <button 
              onClick={() => cambiarSemana(1)}
              className="material-symbols-outlined text-xl text-zinc-400 hover:text-primary transition-colors"
            >
              chevron_right
            </button>
          </div>
        </div>

        {/* Cabecera de días con keys únicas */}
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-zinc-400 mb-3">
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((dia, index) => (
            <div key={`${dia}-${index}`}>{dia}</div>
        ))}
        </div>

        {/* Grilla Semanal */}
        <div className="grid grid-cols-7 gap-2 text-center">
          {diasSemana.map((fecha) => {
            const esPasado = fecha < hoy;
            const esSeleccionado = diaSeleccionado === fecha.getDate() && fecha.getMonth() === hoy.getMonth();
            const diaDelMes = fecha.getDate();

            return (
              <button
                key={fecha.toISOString()}
                disabled={esPasado}
                onClick={() => setDiaSeleccionado(diaDelMes)}
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
          {diaSeleccionado 
            ? `Has seleccionado el día ${diaSeleccionado} para tu entrega.` 
            : "Selecciona un día disponible (en negro)."}
        </p>
      </div>
    </div>
  );
};