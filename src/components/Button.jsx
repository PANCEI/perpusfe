import React from 'react';

export default function Button({ children, type = 'submit', onClick }) {
  return (
    <div className="pt-2">
      <button
        type={type}
        onClick={onClick}
        className="w-full py-2.5 bg-gradient-to-r from-[#ff7e40] to-[#ff4b72] text-white font-bold rounded-full text-sm shadow-lg shadow-orange-500/20 hover:opacity-95 transform active:scale-[0.98] transition-all tracking-wide"
      >
        {children}
      </button>
    </div>
  );
}