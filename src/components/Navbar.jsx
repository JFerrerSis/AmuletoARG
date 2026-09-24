import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

export const Navbar = ({ cartCount, onOpenCart, animateCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-4 md:bottom-auto md:top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-300">
      <header
        className={`pointer-events-auto transition-all duration-300 ease-out flex flex-col items-center overflow-hidden rounded-3xl ${
          mobileMenuOpen
            ? 'w-full max-w-xs bg-white/95 backdrop-blur-md border border-amuleto-purple/30 shadow-2xl shadow-amuleto-purple/15'
            : scrolled
            ? 'w-auto bg-white/85 backdrop-blur-md border border-amuleto-lilac/60 shadow-lg shadow-amuleto-purple/10 hover:shadow-amuleto-purple/20'
            : 'w-auto md:bg-transparent md:border-transparent md:shadow-none bg-white/85 backdrop-blur-md border border-amuleto-lilac/60 shadow-lg shadow-amuleto-purple/10'
        }`}
      >
        {/* Desplegable Móvil (Animación fluida mediante Grid de 0fr a 1fr) */}
        <div
          className={`md:hidden w-full grid transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? 'grid-rows-[1fr] opacity-100 border-b border-amuleto-lilac/30'
              : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col items-center py-4 space-y-3.5 text-[10px] uppercase tracking-[0.2em] font-bold text-stone-700">
              <a
                href="#inicio"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amuleto-purple transition-all duration-200 hover:scale-105"
              >
                Inicio
              </a>
              <a
                href="#catalogo"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amuleto-purple transition-all duration-200 hover:scale-105"
              >
                Catálogo
              </a>
              <a
                href="#servicios"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amuleto-purple transition-all duration-200 hover:scale-105"
              >
                Servicios
              </a>
              <a
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amuleto-purple transition-all duration-200 hover:scale-105"
              >
                Contacto
              </a>
            </div>
          </div>
        </div>

        {/* Barra de Navegación Principal */}
        <div className="flex items-center justify-between gap-6 px-6 py-2.5 min-h-12 w-full">

          {/* Menú Desktop */}
          <nav className="hidden md:flex items-center gap-7 text-[11px] tracking-[0.2em] uppercase font-semibold">
            {[
              { label: 'Inicio', href: '#inicio' },
              { label: 'Catálogo', href: '#catalogo' },
              { label: 'Servicios', href: '#servicios' },
              { label: 'Contacto', href: '#contacto' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`relative py-1 transition-all duration-300 group ${
                  scrolled ? 'text-stone-700' : 'text-stone-800'
                } hover:text-amuleto-purple`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-amuleto-purple to-amuleto-pink transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
            ))}
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-2 justify-end w-full md:w-auto">
            
            {/* Botón Carrito */}
            <button
              onClick={onOpenCart}
              className={`relative p-2.5 rounded-full transition-all duration-300 active:scale-90 group ${
                scrolled
                  ? 'bg-amuleto-cream/80 hover:bg-amuleto-purple text-amuleto-purple hover:text-white shadow-xs hover:shadow-md hover:shadow-amuleto-purple/30'
                  : 'bg-white/90 md:bg-white/80 hover:bg-amuleto-purple text-amuleto-purple hover:text-white shadow-xs hover:shadow-md hover:shadow-amuleto-purple/30 border border-amuleto-lilac/40'
              } ${animateCart ? 'scale-125 bg-amuleto-purple text-white shadow-lg shadow-amuleto-purple/40 ring-2 ring-amuleto-pink/50' : ''}`}
              aria-label="Ver carrito"
            >
              <ShoppingBag className="w-4 h-4 stroke-2 transition-transform duration-300 group-hover:rotate-6" />
              
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-linear-to-r from-amuleto-purple to-amuleto-pink text-white text-[8px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-xs animate-scaleIn group-hover:scale-110 transition-transform">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Menú Hamburguesa Móvil */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-amuleto-purple hover:bg-amuleto-cream/80 rounded-full transition-all active:scale-90"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 stroke-2" /> : <Menu className="w-5 h-5 stroke-2" />}
            </button>

          </div>

        </div>
      </header>
    </div>
  );
};