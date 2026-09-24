import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { fetchProductos } from '../services/sheetsService';
import { ProductoModal } from './ProductoModal';

export const Catalogo = ({ addToCart }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Estado para el modal
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('TODOS');
  const [selectedSubcategory, setSelectedSubcategory] = useState('TODAS');
  const [sortBy, setSortBy] = useState('default');

  const gridRef = useRef(null);
  const placeholderImage = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop';

  const cargarProductos = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await fetchProductos(true);
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos en el catálogo:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    cargarProductos(false);
  }, [cargarProductos]);

  const categorias = useMemo(() => {
    const catSet = new Set(productos.map((p) => p.categoria).filter(Boolean));
    return ['TODOS', ...Array.from(catSet)];
  }, [productos]);

  const subcategorias = useMemo(() => {
    const productosBase = selectedCategory === 'TODOS'
      ? productos
      : productos.filter((p) => p.categoria === selectedCategory);

    const subCatSet = new Set(productosBase.map((p) => p.subcategoria).filter(Boolean));
    return ['TODAS', ...Array.from(subCatSet)];
  }, [productos, selectedCategory]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setSelectedSubcategory('TODAS');
  };

  const productosFiltrados = useMemo(() => {
    return productos
      .filter((p) => {
        const matchesCategory = selectedCategory === 'TODOS' || p.categoria === selectedCategory;
        const matchesSubcategory = selectedSubcategory === 'TODAS' || p.subcategoria === selectedSubcategory;
        const query = searchQuery.toLowerCase();
        const nameMatch = (p.nombre || '').toLowerCase().includes(query);
        const descMatch = (p.descripcion || '').toLowerCase().includes(query);
        
        return matchesCategory && matchesSubcategory && (nameMatch || descMatch);
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return (a.precio || 0) - (b.precio || 0);
        if (sortBy === 'price-desc') return (b.precio || 0) - (a.precio || 0);
        return 0;
      });
  }, [productos, selectedCategory, selectedSubcategory, searchQuery, sortBy]);

  useEffect(() => {
    if (!loading && gridRef.current && gridRef.current.children.length > 0) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out' }
      );
    }
  }, [productosFiltrados, loading]);

  const abrirVistaPrevia = (producto) => {
    setSelectedProductModal(producto);
    setIsModalOpen(true);
  };

  return (
    <section id="catalogo" className="py-12 md:py-20 px-3 md:px-8 max-w-7xl mx-auto font-sans text-stone-800">
      {/* Encabezado */}
      <div className="text-center mb-8 md:mb-14 space-y-2">
        <span className="text-[10px] md:text-xs font-semibold tracking-widest text-amuleto-purple uppercase">
          Piezas Exclusivas
        </span>
        <h2 className="text-2xl md:text-5xl font-serif font-light text-stone-900 tracking-tight">
          Nuestra Colección
        </h2>
        <div className="w-10 md:w-12 h-px bg-amuleto-lilac mx-auto my-2"></div>
        <p className="text-xs md:text-sm text-stone-500 max-w-md mx-auto">
          Diseños atemporales creados para resaltar tu esencia en cada detalle.
        </p>
      </div>

      {/* Filtros y Controles */}
      <div className="space-y-3 mb-8 md:mb-12 bg-stone-50/80 backdrop-blur-md p-3.5 md:p-5 rounded-2xl md:rounded-3xl border border-stone-200/60 shadow-xs">
        <div className="flex flex-col lg:flex-row gap-3 md:gap-5 items-center justify-between">
          
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Buscar pieza..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3.5 py-2 pl-9 rounded-full bg-white border border-stone-200 text-xs text-stone-700 placeholder-stone-400 focus:outline-none focus:border-amuleto-purple transition-all"
              />
              <svg className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2 text-stone-400 text-xs">✕</button>
              )}
            </div>

            <button
              onClick={() => cargarProductos(true)}
              disabled={loading || refreshing}
              className="p-2 bg-amuleto-purple text-white rounded-full transition-all active:scale-95 disabled:opacity-50 shrink-0"
            >
              <svg className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          {/* Categorías Principales */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-medium tracking-wider uppercase whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-amuleto-purple text-white shadow-xs'
                    : 'bg-white text-stone-600 border border-stone-200/60 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Orden */}
          <div className="w-full sm:w-auto flex justify-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 rounded-full border border-stone-200 text-xs text-stone-600 bg-white focus:outline-none cursor-pointer"
            >
              <option value="default">Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        {/* Subcategorías */}
        {subcategorias.length > 1 && (
          <div className="pt-2.5 border-t border-stone-200/50 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-[9px] uppercase tracking-wider text-stone-400 mr-1 font-semibold shrink-0">
              Subcategoría:
            </span>
            {subcategorias.map((subCat) => (
              <button
                key={subCat}
                onClick={() => setSelectedSubcategory(subCat)}
                className={`px-2.5 py-0.5 rounded-full text-[9px] md:text-[10px] font-medium whitespace-nowrap transition-all ${
                  selectedSubcategory === subCat
                    ? 'bg-amuleto-purple/10 text-amuleto-purple border border-amuleto-purple/30 font-semibold'
                    : 'bg-white/70 text-stone-500 border border-stone-200/50'
                }`}
              >
                {subCat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid de Productos (2x2 en Móvil) */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-stone-50 rounded-2xl p-2.5 md:p-4 border border-stone-100 animate-pulse">
              <div className="w-full aspect-square bg-stone-200 rounded-xl mb-2.5"></div>
              <div className="h-3 bg-stone-200 rounded w-2/3 mb-1.5"></div>
              <div className="h-2.5 bg-stone-200 rounded w-1/2 mb-3"></div>
              <div className="h-6 bg-stone-200 rounded-full w-full"></div>
            </div>
          ))}
        </div>
      ) : productosFiltrados.length === 0 ? (
        <div className="text-center py-16 bg-stone-50/50 rounded-2xl border border-dashed border-stone-200">
          <p className="text-xs text-stone-500">Sin resultados para el filtro seleccionado.</p>
        </div>
      ) : (
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {productosFiltrados.map((producto) => (
            <TarjetaProducto
              key={producto.id}
              producto={producto}
              placeholderImage={placeholderImage}
              addToCart={addToCart}
              onOpenPreview={abrirVistaPrevia}
            />
          ))}
        </div>
      )}

      {/* Modal Reestructurado */}
      <ProductoModal
        producto={selectedProductModal}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addToCart={addToCart}
      />
    </section>
  );
};

// Tarjeta Adaptada a Móvil
const TarjetaProducto = ({ producto, placeholderImage, addToCart, onOpenPreview }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const imagenes = producto.imagenes && producto.imagenes.length > 0 ? producto.imagenes : [producto.imagen_url];

  return (
    <div className="group bg-white rounded-2xl md:rounded-3xl p-2.5 md:p-3.5 border border-stone-100/80 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        <div
          onClick={() => onOpenPreview(producto)}
          className="relative overflow-hidden rounded-xl md:rounded-2xl mb-2 md:mb-3 bg-stone-50 aspect-square cursor-pointer"
        >
          <img
            src={imagenes[currentImgIndex] || placeholderImage}
            alt={producto.nombre}
            onError={(e) => { e.target.src = placeholderImage; }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute top-1.5 left-1.5 flex flex-col gap-1 max-w-[85%]">
            <span className="bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[8px] md:text-[9px] font-semibold text-stone-700 uppercase truncate border border-stone-100 shadow-2xs">
              {producto.categoria}
            </span>
          </div>
        </div>

        <h3
          onClick={() => onOpenPreview(producto)}
          className="font-serif text-stone-800 text-xs md:text-sm font-medium mb-1 line-clamp-1 cursor-pointer hover:text-amuleto-purple transition-colors"
        >
          {producto.nombre}
        </h3>
        <p className="text-[10px] md:text-xs text-stone-400 font-light mb-2 line-clamp-1 md:line-clamp-2 leading-tight">
          {producto.descripcion}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-2 border-t border-stone-100">
        <span className="text-xs md:text-base font-medium text-stone-900">
          ${Number(producto.precio || 0).toLocaleString()}
        </span>
        <button
          onClick={() => addToCart(producto)}
          className="bg-stone-900 hover:bg-amuleto-purple text-white text-[9px] md:text-[10px] font-medium uppercase tracking-wider py-1.5 px-2.5 rounded-full transition-colors active:scale-95 text-center"
        >
          + Agregar
        </button>
      </div>
    </div>
  );
};