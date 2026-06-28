import React  from "react";
import { renderDynamicIcon } from "../../helpers/iconRenderer";
const MenuItem = ({ item, currentPath, onClick }) => {
  const targetUrl = `/${item.url?.toLowerCase()}`;
  const isActive = currentPath === targetUrl;

  return (
    <button
      onClick={() => onClick(targetUrl)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
        isActive ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-500 hover:bg-slate-50'
      }`}
    >
      {renderDynamicIcon(item.icon)}
      <span className="truncate">{item.name}</span>
    </button>
  );
};

export default MenuItem;