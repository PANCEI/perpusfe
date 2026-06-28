import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { renderDynamicIcon } from '../../helpers/iconRenderer';
const MenuFolder = ({ folder, currentPath, onSubItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-xl transition-all"
      >
        <div className="flex items-center gap-3">
          {renderDynamicIcon(folder.icon)}
          <span className="text-sm font-medium truncate">{folder.name}</span>
        </div>
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>

      {isOpen && (
        <div className="pl-6 space-y-1 border-l-2 border-slate-100 ml-6">
          {folder.sub_menu.map((sub) => {
            const targetUrl = `/${sub.url?.toLowerCase()}`;
            const isActive = currentPath === targetUrl;

            return (
              <button
                key={sub.id}
                onClick={() => onSubItemClick(targetUrl)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
                  isActive ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {renderDynamicIcon(sub.icon)}
                <span className="truncate">{sub.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MenuFolder;