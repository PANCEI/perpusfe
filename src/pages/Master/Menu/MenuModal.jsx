import React, { useState, useEffect } from 'react';

const MenuModal = ({ isOpen, isEditMode, initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
    menu: '',
    urutan: '',
    jenis: 'File'
  });

  // Sinkronisasikan data form ketika data inisial dari parent berubah (saat klik edit/tambah)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-100 transform transition-all">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          {isEditMode ? 'Ubah Menu Utama' : 'Tambah Menu Utama baru'}
        </h3>
        
        <form onSubmit={handleFormSubmit} className="space-y-4">
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

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <button
              type="button"
              onClick={onClose}
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
  );
};

export default MenuModal;