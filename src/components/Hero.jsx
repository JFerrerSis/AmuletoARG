import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Sparkles, ArrowRight, Gem, ShieldCheck, Heart } from 'lucide-react';

export const Hero = () => {
  const containerRef = useRef(null);
  const logoCardRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animación de entrada escalonada para elementos
      gsap.from('.hero-anim', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      });

      // 2. Rotación sutil del anillo orbital exterior
      gsap.to(ringRef.current, {
        rotate: 360,
        duration: 30,
        repeat: -1,
        ease: 'none',
      });

      // 3. Flotación vertical suave del contenedor del logo
      gsap.to(logoCardRef.current, {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Parallax 3D interactivo con el cursor sobre la tarjeta del logo
  const handleMouseMove = (e) => {
    if (!containerRef.current || !logoCardRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);

    gsap.to(logoCardRef.current, {
      rotateY: x * 12,
      rotateX: -y * 12,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!logoCardRef.current) return;
    gsap.to(logoCardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={containerRef}
      id="inicio"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-16 px-6 lg:px-12 overflow-hidden bg-linear-to-b from-amuleto-cream/40 via-white to-stone-50/70 perspective-[1000px]"
    >
      {/* Resplandores orgánicos de fondo */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-amuleto-pink/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-amuleto-lilac/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* COLUMNA IZQUIERDA: Logo Principal en Grande (Estático) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-start transform-3d">
          <div
            ref={logoCardRef}
            className="hero-anim relative w-full max-w-sm sm:max-w-md aspect-square rounded-3xl bg-white/80 backdrop-blur-xl border border-stone-200/80 p-8 sm:p-12 shadow-2xl shadow-stone-900/5 ring-1 ring-stone-900/5 flex flex-col items-center justify-center text-center transition-shadow duration-500 hover:shadow-amuleto-purple/10"
          >
            {/* Anillo orbital decorativo punteado */}
            <div
              ref={ringRef}
              className="absolute -inset-4 sm:-inset-6 rounded-[36px] border border-dashed border-amuleto-gold/40 pointer-events-none"
            />

            {/* Contenedor del Logo sin rotación */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center p-4">
              <img
                src="/logo.png"
                alt="Amuleto Logo"
                className="w-full h-full object-contain filter "
              />
            </div>

            {/* Leyenda inferior sutil */}
            <div className="mt-4 pt-4 border-t border-stone-100 w-full flex items-center justify-between text-stone-400 text-[10px] tracking-[0.25em] uppercase font-semibold">
              <span>Joyería & Accesorios</span>
              <span>Piezas de Autor</span>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Texto Reorganizado y Jerárquico */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Badge Superior */}
          <div className="hero-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-stone-200 text-stone-700 text-[10px] tracking-[0.22em] uppercase font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amuleto-gold" />
            Colección Exclusiva
          </div>

          {/* Encabezado Principal */}
          <h1 className="hero-anim text-4xl sm:text-5xl lg:text-6xl font-extralight text-stone-900 tracking-tight leading-[1.12]">
            Diseños únicos que <br />
            <span className="font-serif italic font-normal text-amuleto-purple relative inline-block mt-1">
              resaltan tu brillo personal
              <span className="absolute bottom-1 left-0 w-full h-[1.5px] bg-linear-to-r from-amuleto-gold via-amuleto-purple/50 to-transparent" />
            </span>
          </h1>

          {/* Descripción */}
          <p className="hero-anim text-base sm:text-lg text-stone-600 max-w-xl font-light leading-relaxed">
            Cada pieza de <strong className="font-semibold text-stone-800">Amuleto</strong> está elaborada artesanalmente con acabados de alta calidad, diseñadas para complementar tu estilo en cada ocasión.
          </p>

          {/* Puntos clave / Valores de marca */}
          <div className="hero-anim grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 w-full max-w-lg border-y border-stone-200/60 py-4 my-2">
            <div className="flex items-center gap-2.5 text-stone-700">
              <Heart className="w-4 h-4 text-amuleto-purple shrink-0" />
              <span className="text-xs font-medium tracking-wide">Hecho a mano</span>
            </div>
            <div className="flex items-center gap-2.5 text-stone-700">
              <Gem className="w-4 h-4 text-amuleto-gold shrink-0" />
              <span className="text-xs font-medium tracking-wide">Edición limitada</span>
            </div>
            <div className="flex items-center gap-2.5 text-stone-700">
              <ShieldCheck className="w-4 h-4 text-stone-800 shrink-0" />
              <span className="text-xs font-medium tracking-wide">Garantía de calidad</span>
            </div>
          </div>

          {/* Llamados a la acción (Botones) */}
          <div className="hero-anim pt-2 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="#catalogo"
              className="w-full sm:w-auto px-8 py-4 bg-stone-900 hover:bg-amuleto-purple text-white text-[11px] tracking-[0.2em] uppercase font-semibold rounded-full shadow-lg shadow-stone-900/10 hover:shadow-amuleto-purple/20 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group"
            >
              Explorar Catálogo
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            <a
              href="#servicios"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-stone-50 border border-stone-200 hover:border-amuleto-gold/60 text-stone-800 text-[11px] tracking-[0.2em] uppercase font-semibold rounded-full shadow-xs hover:shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              Ver Servicios
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};