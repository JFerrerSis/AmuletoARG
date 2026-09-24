import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Sparkles, Check } from 'lucide-react';
import { formatARS } from '../utils/formatters';

export const ProductoModal = ({ producto, isOpen, onClose, addToCart }) => {
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCantidad(1);
      setAgregado(false);
    }
  }, [isOpen]);

  if (!isOpen || !producto) return null;

  const handleAgregar = () => {
    for (let i = 0; i < cantidad; i++) {
      addToCart(producto);
    }
    setAgregado(true);
    setTimeout(() => {
      setAgregado(false);
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 md:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl md:rounded-4xl max-w-xl w-full overflow-hidden shadow-2xl relative border border-stone-100 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-stone-500 hover:text-stone-900 backdrop-blur-md border border-stone-100 transition-all shadow-xs active:scale-95"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Imagen principal */}
        <div className="w-full md:w-1/2 relative bg-stone-50 aspect-4/3 md:aspect-auto shrink-0 overflow-hidden">
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1 items-start max-w-[80%]">
            <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold text-amuleto-purple tracking-wider uppercase border border-stone-100 shadow-2xs">
              {producto.categoria}
            </span>
            {producto.subcategoria && (
              <span className="bg-amuleto-purple/90 text-white px-2.5 py-0.5 rounded-full text-[8px] font-medium tracking-wider uppercase backdrop-blur-xs">
                {producto.subcategoria}
              </span>
            )}
          </div>
        </div>

        {/* Detalles e interacción */}
        <div className="w-full md:w-1/2 p-5 md:p-7 flex flex-col justify-between overflow-y-auto space-y-4">
          <div>
            <div className="flex items-center gap-1.5 text-amber-600 text-[10px] font-semibold tracking-wider uppercase mb-1.5">
              <Sparkles className="w-3 h-3" />
              <span>Accesorio Hecho a Mano</span>
            </div>

            <h3 className="text-lg md:text-2xl font-serif font-medium text-stone-900 leading-snug mb-2">
              {producto.nombre}
            </h3>

            <div className="text-xl md:text-2xl font-light text-stone-900 mb-3">
              {formatARS ? formatARS(producto.precio) : `$${Number(producto.precio || 0).toLocaleString()}`}
            </div>

            <p className="text-xs text-stone-500 font-light leading-relaxed border-t border-stone-100 pt-3">
              {producto.descripcion || 'Pieza artesanal elaborada cuidadosamente con materiales seleccionados para garantizar durabilidad y elegancia.'}
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t border-stone-100">
            {/* Control de Cantidad */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-stone-600">Cantidad</span>
              <div className="flex items-center gap-3 bg-stone-50 px-3 py-1 rounded-full border border-stone-200/80">
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  className="p-1 text-stone-600 hover:text-stone-900 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-semibold w-5 text-center text-stone-800">{cantidad}</span>
                <button
                  onClick={() => setCantidad(cantidad + 1)}
                  className="p-1 text-stone-600 hover:text-stone-900 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Botón Acción */}
            <button
              onClick={handleAgregar}
              disabled={agregado}
              className={`w-full py-3 rounded-full text-xs font-medium uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 ${
                agregado
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-900 hover:bg-amuleto-purple text-white'
              }`}
            >
              {agregado ? (
                <>
                  <Check className="w-4 h-4" /> Agregado correctamente
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Agregar • {formatARS ? formatARS(producto.precio * cantidad) : `$${Number(producto.precio * cantidad).toLocaleString()}`}
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};