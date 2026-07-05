import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Folder, File, ArrowUp, ArrowDown } from 'lucide-react';

const MasterMenu = () => {
  // Data dummy simulasi state dari Redux / API
  const [menus, setMenus] = useState([
    { id: 1, menu: 'Dashboard', urutan: 1, jenis: 'File' },
    { id: 2, menu: 'Master Data', urutan: 2, jenis: 'Folder' },
    { id: 3, menu: 'Transaksi', urutan: 3, jenis: 'Folder' },
  ]);

  // State Pengendali Modal Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    menu: '',
    urutan: '',
    jenis: 'File'
  });

  // Handler buka modal tambah
  const handleAddClick = () => {
    setIsEditMode(false);
    setFormData({ id: '', menu: '', urutan: menus.length + 1, jenis: 'File' });
    setIsModalOpen(true);
  };

  // Handler buka modal edit
  const handleEditClick = (item) => {
    setIsEditMode(true);
    setFormData({
      id: item.id,
      menu: item.menu,
      urutan: item.urutan,
      jenis: item.jenis
    });
    setIsModalOpen(true);
  };

  // Handler Hapus Data
  const handleDeleteClick = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus menu ini?')) {
      setMenus(menus.filter(menu => menu.id !== id));
    }
  };

  // Handler Simpan Data (Submit Form)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      // Logika Update
      setMenus(menus.map(m => m.id === formData.id ? { ...formData } : m));
    } else {
      // Logika Insert / Create
      const newMenu = { ...formData, id: Date.now() };
      setMenus([...menus, newMenu]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* 🏷️ Header Halaman */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Master Menu</h1>
          <p className="text-sm text-slate-500">Kelola menu utama, urutan, serta tipe navigasi aplikasi.</p>
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all shadow-indigo-600/10 active:scale-95"
        >
          <Plus size={18} />
          Tambah Menu
        </button>
      </div>

      {/* 📊 Kontainer Tabel */}
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
                        onClick={() => handleEditClick(item)}
                        className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit Menu"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item.id)}
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

      {/* 📜 MODAL COMPONENT (Form Add/Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-100 transform transition-all">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {isEditMode ? 'Ubah Menu Utama' : 'Tambah Menu Utama baru'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Input Nama Menu */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Nama Menu</label>
                <input
                  type="text"
                  required
                  value={formData.menu}
                  onChange={(e) => setFormData({ ...formData, menu: e.target.value })}
                  placeholder="Contoh: Master Buku"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Input Urutan */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Urutan Tampil</label>
                <input
                  type="number"
                  required
                  value={formData.urutan}
                  onChange={(e) => setFormData({ ...formData, urutan: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Select Jenis Menu */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Jenis Menu</label>
                <select
                  value={formData.jenis}
                  onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                >
                  <option value="File">File (Menu Tunggal / Langsung Halaman)</option>
                  <option value="Folder">Folder (Memiliki Sub-Menu / Dropdown)</option>
                </select>
              </div>

              {/* Action Buttons Modal */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-all"
                >
                  {isEditMode ? 'Simpan Perubahan' : 'Tambahkan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterMenu;