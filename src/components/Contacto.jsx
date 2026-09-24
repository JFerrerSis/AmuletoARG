import React from 'react';
import { MessageCircle, MapPin, Clock } from 'lucide-react'; // 👈 Quitamos 'Instagram' de aquí

export const Contacto = () => {
  return (
    <footer id="contacto" className="bg-amuleto-purple text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10 text-xs">
        
        {/* Identidad de la empresa */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-amuleto-gold p-0.5 bg-white">
              <img src="/logo.jpg" alt="Amuleto Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <span className="text-lg tracking-widest font-extralight uppercase">AMULETO</span>
          </div>
          <p className="text-amuleto-lilac leading-relaxed">
            Accesorios elaborados a mano para complementar tu estilo diario o regalar un detalle único y lleno de significado.
          </p>
        </div>

        {/* Canales de Contacto */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-amuleto-gold tracking-wider uppercase">Atención al Cliente</h4>
          <ul className="space-y-2 text-amuleto-lilac">
            <li className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-amuleto-pink" />
              <span>WhatsApp Directo para comandas</span>
            </li>
            
            {/* SVG nativo de Instagram para evitar el error de exportación */}
            <li className="flex items-center gap-2">
              <svg 
                className="w-4 h-4 text-amuleto-pink" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>@amuleto.accesorios</span>
            </li>

            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amuleto-pink" />
              <span>Lunes a Sábado: 9:00 AM - 6:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Ubicación / Entregas */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-amuleto-gold tracking-wider uppercase">Entregas</h4>
          <p className="text-amuleto-lilac leading-relaxed flex items-start gap-2">
            <MapPin className="w-4 h-4 text-amuleto-pink shrink-0 mt-0.5" />
            <span>Puntos de entrega personal en la ciudad y servicio de delivery a domicilio.</span>
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-6 text-center text-[11px] text-amuleto-lilac/60">
        <p>© {new Date().getFullYear()} Amuleto - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};