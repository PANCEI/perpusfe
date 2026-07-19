import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import MenuTable from './MenuTable';
import MenuModal from './MenuModal';// import MenuTable from '../components/MenuTable';
// import MenuModal from '../components/MenuModal';

const MasterMenu = () => {
  // State Utama Data
  const [menus, setMenus] = useState([
    { id: 1, menu: 'Dashboard', urutan: 1, jenis: 'File' },
    { id: 2, menu: 'Master Data', urutan: 2, jenis: 'Folder' },
    { id: 3, menu: 'Transaksi', urutan: 3, jenis: 'Folder' },
  ]);

  // State Pengendali Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // Handler Buka Modal Tambah
  const handleAddClick = () => {
    setIsEditMode(false);
    setSelectedData({ id: '', menu: '', urutan: menus.length + 1, jenis: 'File' });
    setIsModalOpen(true);
  };

  // Handler Buka Modal Edit
  const handleEditClick = (item) => {
    setIsEditMode(true);
    setSelectedData(item);
    setIsModalOpen(true);
  };

  // Handler Hapus Data
  const handleDeleteClick = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus menu ini?')) {
      setMenus(menus.filter(menu => menu.id !== id));
    }
  };

  // Handler Kirim Data Form (Insert / Update)
  const handleModalSubmit = (formData) => {
    if (isEditMode) {
      setMenus(menus.map(m => m.id === formData.id ? { ...formData } : m));
    } else {
      const newMenu = { ...formData, id: Date.now() };
      setMenus([...menus, newMenu]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Master Menu</h1>
          <p className="text-sm text-slate-500">Kelola menu utama, urutan, serta tipe navigasi aplikasi.</p>
        </div>
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all active:scale-95"
        >
          <Plus size={18} />
          Tambah Menu
        </button>
      </div>

      {/* Komponen Tabel */}
      <MenuTable 
        menus={menus} 
        onEdit={handleEditClick} 
        onDelete={handleDeleteClick} 
      />

      {/* Komponen Modal */}
      <MenuModal 
        isOpen={isModalOpen}
        isEditMode={isEditMode}
        initialData={selectedData}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default MasterMenu;