import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // 1. Hook Redux
import { Plus } from 'lucide-react';
import MenuTable from './MenuTable';
import MenuModal from './MenuModal';

// Action Redux Thunk
import { getMenuListAction } from '../../../actions/menu/MenuList';

const MasterMenu = () => {
  const dispatch = useDispatch();

  // 2. Ambil data dari Redux Store (ganti 'menuList' jika nama reducer Anda berbeda di rootReducer)
  const { items: menus = [], isLoading, error } = useSelector((state) => state.menuList || {});

  // State Pengendali Modal (Cukup simpan state UI lokal di sini)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // 3. Fetch data dari API saat halaman pertama kali dibuka
  useEffect(() => {
    dispatch(getMenuListAction()).catch((err) => {
      console.error('Gagal mengambil data menu:', err.message);
    });
  }, [dispatch]);

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
      // TODO: Panggil dispatch(deleteMenuAction(id)) nanti untuk memicu API DELETE
      console.log('Delete ID:', id);
    }
  };

  // Handler Kirim Data Form (Insert / Update)
  const handleModalSubmit = (formData) => {
    if (isEditMode) {
      // TODO: Panggil dispatch(updateMenuAction(formData)) nanti untuk memicu API PUT/PATCH
      console.log('Update Data:', formData);
    } else {
      // TODO: Panggil dispatch(createMenuAction(formData)) nanti untuk memicu API POST
      console.log('Create Data:', formData);
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
          disabled={isLoading}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all active:scale-95"
        >
          <Plus size={18} />
          Tambah Menu
        </button>
      </div>

      {/* Tampilan Loading / Error / Data Tabel */}
      {isLoading ? (
        <div className="text-center py-12 text-slate-500 font-medium">Memuat data menu...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500 font-medium">{error}</div>
      ) : (
        /* Komponen Tabel */
        <MenuTable 
          menus={menus} 
          onEdit={handleEditClick} 
          onDelete={handleDeleteClick} 
        />
      )}

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