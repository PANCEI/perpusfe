import React from 'react';
import Sidebar from './Sidebar';
import { Bell } from 'lucide-react';

const DashboardLayout = ({ children, role, userTitle }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar role={role} />
      
      <main className="ml-64 flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 capitalize">Dashboard {role}</h1>
            <p className="text-slate-500 text-sm">Sistem Manajemen Perpustakaan Terpadu</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800">{userTitle}</p>
                <p className="text-xs text-slate-500 capitalize">{role}</p>
              </div>
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                {userTitle.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <div className="animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;