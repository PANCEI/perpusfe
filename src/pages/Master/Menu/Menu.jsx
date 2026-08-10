import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import MenuTable from './MenuTable';
import MenuModal from './MenuModal';
import { getMenuListAction } from '../../../actions/menu/MenuList';

const MasterMenu = () => {
  const dispatch = useDispatch();

  // 🚀 PERBAIKAN: Ambil state menuList dengan aman
const menuState = useSelector((state) => state.menuList);
console.log('State menuList:', menuState); // Debugging: Periksa struktur state menuList
// 🚀 PERBAIKAN: Ambil dari key 'items' sesuai struktur Reducer
const menus = menuState?.items || [];
const isLoading = menuState?.loading || menuState?.isLoading || false;
const error = menuState?.error || null;

console.log('State menuList:', menus); // Sekarang akan berisi Array 2 item
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    dispatch(getMenuListAction()).catch((err) => {
      console.error('Gagal mengambil data menu:', err.message);
    });
  }, [dispatch]);

  const handleAddClick = () => {
    setIsEditMode(false);
    setSelectedData({ id: '', menu: '', urutan: menus.length + 1, jenis: 'File' });
    setIsModalOpen(true);
  };

  const handleEditClick = (item) => {
    setIsEditMode(true);
    setSelectedData(item);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus menu ini?')) {
      console.log('Delete ID:', id);
    }
  };

  const handleModalSubmit = (formData) => {
    if (isEditMode) {
      console.log('Update Data:', formData);
    } else {
      console.log('Create Data:', formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Master Menu</h1>
          <p className="text-sm text-slate-500">Kelola menu utama, urutan, serta tipe navigasi aplikasi.</p>
        </div>
        <button
          onClick={handleAddClick}
          disabled={isLoading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all active:scale-95"
        >
          <Plus size={18} />
          Tambah Menu
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-slate-500 font-medium">Memuat data menu...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500 font-medium">{error}</div>
      ) : (
        <MenuTable 
          menus={menus} 
          onEdit={handleEditClick} 
          onDelete={handleDeleteClick} 
        />
      )}

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