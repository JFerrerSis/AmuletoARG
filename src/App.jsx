import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Servicios } from './components/Servicios';
import { Catalogo } from './components/Catalogo';
import { Contacto } from './components/Contacto';
import { CarritoModal } from './components/CarritoModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Toast } from './components/Toast';

export default function App() {
  // 1. Persistencia del carrito en localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('amuleto_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Estado para notificaciones Toast
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Estado para animar el icono del carrito en el Navbar
  const [animateCart, setAnimateCart] = useState(false);

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "5491100000000";

  // Guardar en localStorage ante cualquier cambio en el carrito
  useEffect(() => {
    localStorage.setItem('amuleto_cart', JSON.stringify(cart));
  }, [cart]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setAnimateCart(true);
    
    setTimeout(() => setShowToast(false), 3000);
    setTimeout(() => setAnimateCart(false), 600);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCart, { ...product, cantidad: 1 }];
    });

    triggerToast(`¡${product.nombre} agregado al carrito!`);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, cantidad: newQuantity } : item))
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalCartCount = cart.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <div className="min-h-screen flex flex-col bg-amuleto-cream text-slate-800 font-sans selection:bg-amuleto-pink selection:text-white">
      <Navbar 
        cartCount={totalCartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        animateCart={animateCart}
      />

      <main className="flex-1">
        <Hero />
        <Servicios />
        <Catalogo addToCart={addToCart} />
      </main>

      <Contacto />

      <CarritoModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        clearCart={clearCart}
        whatsappNumber={whatsappNumber}
      />

      <Toast 
        message={toastMessage} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
}