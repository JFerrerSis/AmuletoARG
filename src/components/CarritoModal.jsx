import React, { useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { formatARS } from '../utils/formatters';

export const CarritoModal = ({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
  onOpenCheckout
}) => {
  // Bloquear el scroll de la página al abrir el carrito
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

  if (!isOpen) return null;

  const totalAmount = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div className="fixed inset-0 bg-amuleto-purple/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl relative border border-amuleto-lilac overflow-hidden">
        
        {/* Cabecera del Modal */}
        <div className="p-6 bg-amuleto-cream/70 border-b border-amuleto-lilac/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white border border-amuleto-gold/30 text-amuleto-purple shadow-xs">
              <ShoppingBag className="w-5 h-5 text-amuleto-gold" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-amuleto-purple">Tu Carrito de Compras</h3>
              <p className="text-xs text-slate-500">
                {cart.length === 0 ? 'Está vacío' : `${cart.reduce((a, b) => a + b.cantidad, 0)} accesorio(s) seleccionado(s)`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-amuleto-purple hover:bg-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de Productos */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 flex flex-col items-center justify-center text-center text-slate-400">
              <ShoppingBag className="w-16 h-16 stroke-1 text-amuleto-lilac mb-3" />
              <p className="text-sm font-semibold text-slate-600">Aún no has agregado productos</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Explora el catálogo y presiona el botón de la bolsa para sumarlos a tu pedido.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-amuleto-cream/30 rounded-2xl border border-amuleto-lilac/40 hover:border-amuleto-lilac transition-all"
                >
                  <img
                    src={item.imagen_url}
                    alt={item.nombre}
                    className="w-16 h-16 object-cover rounded-xl border border-amuleto-gold/30 shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-800 truncate">{item.nombre}</h4>
                    <span className="text-xs text-amuleto-purple font-medium block mt-0.5">
                      {formatARS(item.precio)} c/u
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-xl border border-amuleto-lilac/60">
                    <button
                      onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                      className="p-1 text-amuleto-purple hover:bg-amuleto-cream rounded-md transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold w-5 text-center text-slate-800">{item.cantidad}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                      className="p-1 text-amuleto-purple hover:bg-amuleto-cream rounded-md transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right min-w-[80px]">
                    <span className="text-xs font-bold text-amuleto-purple block">
                      {formatARS(item.precio * item.cantidad)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-slate-300 hover:text-rose-500 transition-colors"
                    title="Quitar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pie del Modal */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-amuleto-lilac/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Total de la Orden</span>
              <span className="text-2xl font-bold text-amuleto-purple">{formatARS(totalAmount)}</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-amuleto-purple hover:bg-amuleto-purple/90 text-white text-xs font-semibold uppercase tracking-wider rounded-2xl shadow-lg shadow-amuleto-purple/20 transition-all flex items-center justify-center gap-2 group"
            >
              Procesar Comanda
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};