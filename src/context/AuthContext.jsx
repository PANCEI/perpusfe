import {createContext, useState , useEffect} from 'react';
// 1. Buat kontainer data globalnya
export const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek apakah ada sesi login aktif di browser saat pertama kali aplikasi dimuat
    const isLoggedIn = localStorage.getItem('is_logged_in') === 'true';
    const role = localStorage.getItem('user_role');

    if (isLoggedIn && role) {
      setUser({ role });
    }
    setLoading(false);
  }, []);

  // Fungsi Login Global
  const login = (role) => {
    localStorage.setItem('is_logged_in', 'true');
    localStorage.setItem('user_role', role);
    setUser({ role });
  };

  // Fungsi Logout Global
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}