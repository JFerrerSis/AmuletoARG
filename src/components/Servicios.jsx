import React from 'react';
import { HeartHandshake, Gem, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export const Servicios = () => {
  const caracteristicas = [
    {
      icon: <Gem className="w-5 h-5 text-amuleto-purple" />,
      titulo: 'Diseños Exclusivos',
      descripcion: 'Cada accesorio es elaborado a mano, garantizando piezas únicas con acabados de alta calidad.'
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-amuleto-purple" />,
      titulo: 'Personalización',
      descripcion: 'Creamos combinaciones de colores y detalles especiales según tus gustos o para obsequios.'
    },
    {
      icon: <Truck className="w-5 h-5 text-amuleto-purple" />,
      titulo: 'Envíos & Entregas',
      descripcion: 'Coordinamos la entrega de tu orden mediante delivery local o envíos seguros a nivel nacional.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-amuleto-purple" />,
      titulo: 'Atención Directa',
      descripcion: 'Gestión personalizada de tu pedido por WhatsApp para resolver dudas sobre tallas o materiales.'
    }
  ];

  return (
    <section id="servicios" className="py-20 px-6 sm:px-10 bg-gradient-to-b from-white via-stone-50/40 to-white border-y border-stone-200/60 relative overflow-hidden">
      
      {/* Resplandor ambiental de luz blanca/crema sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-50/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100/80 border border-stone-200/80 text-stone-600 text-[10px] tracking-[0.2em] uppercase font-semibold">
            <Sparkles className="w-3 h-3 text-amuleto-gold" />
            Experiencia & Valor
          </div>

          <h2 className="text-3xl sm:text-4xl font-extralight text-stone-900 tracking-tight">
            ¿Por qué elegir <span className="font-serif italic font-normal text-amuleto-purple">Amuleto</span>?
          </h2>

          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amuleto-gold to-transparent mx-auto mt-2 rounded-full" />
        </div>

        {/* Grid: 1 columna en móvil, 2 en 2 en pantallas medianas (sm/md), y 4 en escritorio (lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {caracteristicas.map((item, index) => (
            <div
              key={index}
              className="group relative p-7 rounded-2xl bg-white border border-stone-200/80 text-center shadow-xs hover:shadow-xl hover:shadow-stone-900/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-between"
            >
              {/* Resplandor hover en la tarjeta */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-amuleto-cream/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">
                {/* Icono con contenedor refinado */}
                <div className="w-13 h-13 rounded-2xl bg-stone-50 border border-stone-200/80 group-hover:border-amuleto-gold/50 flex items-center justify-center mb-5 shadow-xs transition-colors duration-300">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center ring-1 ring-stone-900/5">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-base font-semibold text-stone-800 mb-2.5 tracking-tight group-hover:text-amuleto-purple transition-colors">
                  {item.titulo}
                </h3>

                <p className="text-xs text-stone-500 leading-relaxed font-light">
                  {item.descripcion}
                </p>
              </div>

              {/* Indicador inferior decorativo */}
              <div className="w-8 h-[2px] bg-stone-100 group-hover:bg-amuleto-gold/60 mt-6 rounded-full transition-colors duration-300" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};