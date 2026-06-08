import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    // Simulasi menyimpan data user dan role ke localStorage
    localStorage.setItem('user_role', role);
    localStorage.setItem('is_logged_in', 'true');
    
    // Alihkan langsung ke halaman dashboard setelah login
    if (role === 'admin') navigate('/admin');
    else navigate('/siswa');
  };

  return (
    <main style={{ padding: '40px', textAlign: 'center' }}>
   
    </main>
  );
}