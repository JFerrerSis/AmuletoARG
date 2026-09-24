import React from 'react';

export const Toast = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl transition-all duration-300 transform translate-y-0 opacity-100 animate-bounce">
      <span className="text-xl">✨</span>
      <p className="text-sm font-medium">{message}</p>
      <button 
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white font-bold text-sm"
      >
        ✕
      </button>
    </div>
  );
};