import React from 'react';
import { Edit2, Trash2, Folder, File } from 'lucide-react';

const MenuTable = ({ menus, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-4 w-16 text-center">No</th>
              <th className="px-6 py-4">Nama Menu</th>
              <th className="px-6 py-4 w-32 text-center">Urutan</th>
              <th className="px-6 py-4 w-40">Jenis</th>
              <th className="px-6 py-4 w-32 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {menus.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 text-center font-medium text-slate-400">{index + 1}</td>
                <td className="px-6 py-4 font-semibold text-slate-800">{item.menu}</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">
                    {item.urutan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                    item.jenis === 'Folder' 
                      ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                      : 'bg-sky-50 text-sky-700 border border-sky-200'
                  }`}>
                    {item.jenis === 'Folder' ? <Folder size={14} /> : <File size={14} />}
                    {item.jenis}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit Menu"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus Menu"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuTable;