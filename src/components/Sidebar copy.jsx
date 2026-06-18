import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Book, Users, Repeat, FileText, Settings, Wallet, TrendingUp, LogOut } from 'lucide-react';

const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = {
    admin: [
      { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20}/> },
      { name: 'Books', path: '/admin/books', icon: <Book size={20}/> },
      { name: 'Users', path: '/admin/users', icon: <Users size={20}/> },
      { name: 'Transactions', path: '/admin/transactions', icon: <Repeat size={20}/> },
      { name: 'Reports', path: '/admin/reports', icon: <FileText size={20}/> },
      { name: 'Settings', path: '/admin/settings', icon: <Settings size={20}/> },
    ],
    staff: [
      { name: 'Dashboard', path: '/staff', icon: <LayoutDashboard size={20}/> },
      { name: 'Circulation', path: '/staff/circulation', icon: <Repeat size={20}/> },
      { name: 'Catalog', path: '/staff/catalog', icon: <Book size={20}/> },
      { name: 'Members', path: '/staff/members', icon: <Users size={20}/> },
    ],
    pimpinan: [
      { name: 'Performance', path: '/pimpinan', icon: <TrendingUp size={20}/> },
      { name: 'Budget', path: '/pimpinan/budget', icon: <Wallet size={20}/> },
    ],
    peminjam: [
      { name: 'Dashboard', path: '/peminjam', icon: <LayoutDashboard size={20}/> },
      { name: 'My Books', path: '/peminjam/my-books', icon: <Book size={20}/> },
      { name: 'Profile', path: '/peminjam/profile', icon: <Users size={20}/> },
    ]
  };

  const currentMenu = menus[role?.toLowerCase()] || [];
  
  return (
    <div className="w-64 bg-white h-screen border-r border-slate-200 flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3 border-b border-slate-100">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <Book size={24} />
        </div>
        <span className="text-xl font-bold text-slate-800 tracking-tight">PerpusWeb</span>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {currentMenu.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <button 
              key={idx} 
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-100">
        <button onClick={() => navigate('/login')} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;