import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { User, Truck, CreditCard, CheckCircle2, ArrowLeft, ArrowRight, Send, X } from 'lucide-react';
import { formatARS } from '../utils/formatters';
import { PAISES } from '../data/paises';

export const CheckoutModal = ({ isOpen, onClose, cart, clearCart }) => {
  // Carga el número de WhatsApp del .env
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "5491100000000";

  const [step, setStep] = useState(1);
  const stepRef = useRef(null);

  const [codigoPais, setCodigoPais] = useState('+54');
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    tipoServicio: 'Delivery',
    metodoPago: 'Transferencia / Mercado Pago',
    notas: ''
  });

  // Bloqueo del scroll en la ventana
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && stepRef.current) {
      gsap.fromTo(
        stepRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [step, isOpen]);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOrder = () => {
    const telefonoCompleto = `${codigoPais} ${formData.telefono}`;
    
    let mensaje = `✨ *NUEVA COMANDA - AMULETO ACCESORIOS* ✨\n\n`;
    mensaje += `👤 *Cliente:* ${formData.nombre || 'No especificado'}\n`;
    mensaje += `📞 *Teléfono:* ${telefonoCompleto}\n`;
    mensaje += `🛍️ *Servicio:* ${formData.tipoServicio}\n`;
    if (formData.tipoServicio === 'Delivery') {
      mensaje += `📍 *Dirección:* ${formData.direccion || 'Por acordar'}\n`;
    }
    mensaje += `💳 *Método de Pago:* ${formData.metodoPago}\n`;
    if (formData.notas) {
      mensaje += `📝 *Notas:* ${formData.notas}\n`;
    }
    mensaje += `\n🛒 *DETALLE DEL PEDIDO:*\n`;

    cart.forEach((item) => {
      mensaje += `• ${item.cantidad}x ${item.nombre} (${formatARS(item.precio * item.cantidad)})\n`;
    });

    mensaje += `\n💰 *TOTAL A PAGAR:* ${formatARS(totalAmount)}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    clearCart();
    onClose();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 bg-amuleto-purple/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative border border-amuleto-lilac">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-amuleto-purple hover:bg-amuleto-cream transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Indicador de Progreso */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-semibold text-slate-400 mb-3 px-1">
            <span className={`flex items-center gap-1 ${step >= 1 ? "text-amuleto-purple font-bold" : ""}`}>
              <User className="w-3.5 h-3.5" /> 1. Datos
            </span>
            <span className={`flex items-center gap-1 ${step >= 2 ? "text-amuleto-purple font-bold" : ""}`}>
              <Truck className="w-3.5 h-3.5" /> 2. Entrega
            </span>
            <span className={`flex items-center gap-1 ${step >= 3 ? "text-amuleto-purple font-bold" : ""}`}>
              <CreditCard className="w-3.5 h-3.5" /> 3. Pago
            </span>
            <span className={`flex items-center gap-1 ${step >= 4 ? "text-amuleto-purple font-bold" : ""}`}>
              <CheckCircle2 className="w-3.5 h-3.5" /> 4. Confirmar
            </span>
          </div>
          <div className="h-1.5 bg-amuleto-cream rounded-full overflow-hidden">
            <div 
              className="h-full bg-amuleto-purple transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <div ref={stepRef} className="min-h-[250px]">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-amuleto-purple">Datos del Cliente</h3>
              <p className="text-xs text-slate-500">Completa tus datos para armar la comanda.</p>
              
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Nombre y Apellido</label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Ej: Lucía Gómez"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full p-3 text-sm rounded-xl border border-amuleto-lilac focus:border-amuleto-purple outline-none bg-amuleto-cream/30"
                />
              </div>

              {/* Selector de Prefijos Telefónicos Internacionales */}
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Teléfono de Contacto</label>
                <div className="flex gap-2">
                  <select
                    value={codigoPais}
                    onChange={(e) => setCodigoPais(e.target.value)}
                    className="p-3 text-sm rounded-xl border border-amuleto-lilac bg-white font-semibold text-amuleto-purple outline-none cursor-pointer"
                  >
                    {PAISES.map((p) => (
                      <option key={p.codigo} value={p.codigo}>
                        {p.bandera} {p.codigo}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="telefono"
                    placeholder="Ej: 11 1234 5678"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="flex-1 p-3 text-sm rounded-xl border border-amuleto-lilac focus:border-amuleto-purple outline-none bg-amuleto-cream/30"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-amuleto-purple">Tipo de Servicio</h3>
              <div className="grid grid-cols-3 gap-2">
                {['Delivery', 'Pick-up', 'Presencial'].map((tipo) => (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => setFormData({ ...formData, tipoServicio: tipo })}
                    className={`py-3 px-2 rounded-xl text-xs font-semibold border transition-all ${
                      formData.tipoServicio === tipo
                        ? 'bg-amuleto-purple text-white border-amuleto-purple shadow-md'
                        : 'border-amuleto-lilac text-amuleto-purple bg-white hover:bg-amuleto-cream'
                    }`}
                  >
                    {tipo}
                  </button>
                ))}
              </div>

              {formData.tipoServicio === 'Delivery' && (
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Dirección de Entrega</label>
                  <textarea
                    name="direccion"
                    rows="3"
                    placeholder="Dirección, piso, número o punto de referencia"
                    value={formData.direccion}
                    onChange={handleChange}
                    className="w-full p-3 text-sm rounded-xl border border-amuleto-lilac focus:border-amuleto-purple outline-none bg-amuleto-cream/30"
                  />
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-amuleto-purple">Método de Pago</h3>
              <div className="space-y-2">
                {['Transferencia / Mercado Pago', 'Efectivo en mano', 'Pago Móvil / Divisas', 'A convenir'].map((metodo) => (
                  <label
                    key={metodo}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      formData.metodoPago === metodo
                        ? 'border-amuleto-purple bg-amuleto-cream/60'
                        : 'border-amuleto-lilac hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs font-semibold text-amuleto-purple">{metodo}</span>
                    <input
                      type="radio"
                      name="metodoPago"
                      value={metodo}
                      checked={formData.metodoPago === metodo}
                      onChange={handleChange}
                      className="accent-amuleto-purple"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-amuleto-purple">Resumen de Comanda</h3>
              <div className="bg-amuleto-cream/50 p-4 rounded-2xl border border-amuleto-lilac/50 space-y-2 text-xs text-slate-700">
                <p><strong className="text-amuleto-purple">Cliente:</strong> {formData.nombre || 'No especificado'}</p>
                <p><strong className="text-amuleto-purple">Teléfono:</strong> {codigoPais} {formData.telefono || 'No especificado'}</p>
                <p><strong className="text-amuleto-purple">Servicio:</strong> {formData.tipoServicio}</p>
                <p><strong className="text-amuleto-purple">Pago:</strong> {formData.metodoPago}</p>
                <div className="border-t border-amuleto-lilac/40 pt-2 flex justify-between items-center text-sm font-bold text-amuleto-purple">
                  <span>Total:</span>
                  <span className="text-base">{formatARS(totalAmount)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botones de Navegación */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
          {step > 1 ? (
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-amuleto-purple hover:bg-amuleto-cream transition-all flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Atrás
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-amuleto-purple hover:bg-amuleto-purple/90 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-1 ml-auto"
            >
              Siguiente <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSendOrder}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-1.5 ml-auto"
            >
              <Send className="w-4 h-4" /> Enviar por WhatsApp
            </button>
          )}
        </div>

      </div>
    </div>
  );
};