import { useNavigate } from 'react-router-dom';

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <main style={{ padding: '40px', textAlign: 'left' }}>
      <h2 style={{ color: 'var(--accent)' }}>🔒 Dashboard Admin</h2>
      <h1>Halo Petugas Perpustakaan</h1>
      <p>Di sini kamu bisa: Kelola Buku, Setujui Peminjaman, dan Atur Pengembalian.</p>
      <button onClick={handleLogout} style={{ marginTop: '20px', padding: '8px 16px', background: 'var(--code-bg)', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer' }}>
        Logout
      </button>
    </main>
  );
}