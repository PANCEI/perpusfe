import React from 'react';

export default function SocialButton({ children, onClick, icon }) {
  return (
    <button 
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2 py-2 px-4 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-700 w-full"
    >
      {icon}
      {children}
    </button>
  );
}