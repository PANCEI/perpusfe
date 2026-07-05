import React, { useState } from "react";
import { renderDynamicIcon } from "../../helpers/iconRenderer";

const MenuItem = ({ item, currentPath, onClick }) => {
  const menuIcon = item.icon || item.sub_menu?.[0]?.icon || 'FileText';
  const menuUrl  = item.url && item.url !== '#' ? item.url : item.sub_menu?.[0]?.url || '';
  const targetUrl = `/${menuUrl.toLowerCase()}`;
  const isActive = currentPath === targetUrl;

  // 🚀 Buat state untuk mendeteksi apakah mouse sedang hover atau tidak
  const [isHovered, setIsHovered] = useState(false);

  // Fungsi yang dipicu saat mouse masuk
  const handleMouseEnter = () => {
    setIsHovered(true);
    // Anda bisa memicu fungsi log atau animasi di sini jika perlu
  };

  // Fungsi yang dipicu saat mouse keluar
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => onClick(targetUrl)}
        // 🚀 Pasang event listener onMouseEnter dan onMouseLeave di sini
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
          isActive 
            ? 'bg-indigo-50 text-indigo-600 font-semibold' 
            : isHovered 
              ? 'bg-slate-50 text-slate-800' // Sifat hover yang diatur via JS state
              : 'text-slate-500'
        }`}
      >
        {renderDynamicIcon(menuIcon)}
        <span className="truncate">{item.name}</span>
      </button>

      {/* 💡 Contoh Efek: Tampilkan teks melayang (Tooltip) jika mouse sedang hover */}
      {isHovered && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded shadow-md z-50 whitespace-nowrap">
          Buka {item.name}
        </div>
      )}
    </div>
  );
};

export default MenuItem;