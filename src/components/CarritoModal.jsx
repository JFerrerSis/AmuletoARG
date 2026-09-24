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
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] flex flex-col shadow-2xl relative border border-stone-200/80 overflow-hidden">
        
        {/* Cabecera del Modal */}
        <div className="p-4 sm:p-6 bg-stone-50/80 border-b border-stone-200/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-white border border-amuleto-gold/40 text-amuleto-purple shadow-xs">
              <ShoppingBag className="w-5 h-5 text-amuleto-gold" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900">Tu Carrito de Compras</h3>
              <p className="text-xs text-stone-500">
                {cart.length === 0 ? 'Está vacío' : `${cart.reduce((a, b) => a + b.cantidad, 0)} accesorio(s) seleccionado(s)`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-200/50 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de Productos */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 flex flex-col items-center justify-center text-center text-stone-400">
              <ShoppingBag className="w-16 h-16 stroke-1 text-stone-300 mb-3" />
              <p className="text-sm font-semibold text-stone-600">Aún no has agregado productos</p>
              <p className="text-xs text-stone-400 mt-1 max-w-xs">
                Explora el catálogo y presiona el botón de la bolsa para sumarlos a tu pedido.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3.5 sm:p-4 bg-stone-50/50 rounded-2xl border border-stone-200/70 hover:border-amuleto-purple/30 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <img
                      src={item.imagen_url}
                      alt={item.nombre}
                      className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-xl border border-stone-200/80 shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-stone-800 line-clamp-2 leading-snug">
                        {item.nombre}
                      </h4>
                      <span className="text-[11px] sm:text-xs text-amuleto-purple font-medium block mt-1">
                        {formatARS(item.precio)} c/u
                      </span>
                    </div>
                  </div>

                  {/* Acciones e importes */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200/50">
                    
                    {/* Control de cantidad */}
                    <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-xl border border-stone-200 shadow-xs">
                      <button
                        onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                        className="p-1 text-stone-600 hover:text-amuleto-purple hover:bg-stone-100 rounded-md transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold w-6 text-center text-stone-800">{item.cantidad}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                        className="p-1 text-stone-600 hover:text-amuleto-purple hover:bg-stone-100 rounded-md transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subtotal del item */}
                    <div className="text-right min-w-[90px] shrink-0">
                      <span className="text-xs sm:text-sm font-bold text-amuleto-purple block">
                        {formatARS(item.precio * item.cantidad)}
                      </span>
                    </div>

                    {/* Eliminar */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-500 transition-colors shrink-0"
                      title="Quitar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pie del Modal */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-6 bg-white border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div className="w-full sm:w-auto text-center sm:text-left">
              <span className="text-[11px] text-stone-400 block font-medium uppercase tracking-wider">Total de la Orden</span>
              <span className="text-xl sm:text-2xl font-bold text-stone-900">{formatARS(totalAmount)}</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-stone-900 hover:bg-amuleto-purple text-white text-xs font-semibold uppercase tracking-widest rounded-2xl shadow-lg shadow-stone-900/10 hover:shadow-amuleto-purple/20 transition-all flex items-center justify-center gap-2 group"
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