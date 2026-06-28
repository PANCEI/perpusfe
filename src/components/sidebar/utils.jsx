
// IMPORT THUNK DARI ACTION
import { fetchUserMenus } from '../../actions/menu/menuActions';
// helper untuk metahkan
/**
 * Helper Fungsi jembatan untuk memicu Thunk Action Redux 
 * @param {Function} dispatch - Fungsi dispatch dari useDispatch() di komponen
 * @param {string} token - JWT Token dari auth state
 */
export const loadSidebarMenu = (dispatch, token) => {
  if (!token) return;

  // Memanggil thunk action yang ada di gambar (mengelola START, SUCCESS, dan FAIL otomatis)
  dispatch(fetchUserMenus(token))
    .catch((err) => {
      console.error(" Gagal memicu action fetchUserMenus:", err);
    });
};