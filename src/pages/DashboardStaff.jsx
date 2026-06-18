import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const DashboardStaff = () => {
  return (
    <DashboardLayout role="Staff" userTitle="Staff Sarah">
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-600 text-white p-6 rounded-2xl">
            <p className="opacity-80">Ready for Pickup</p>
            <h2 className="text-3xl font-bold">12</h2>
          </div>
          <div className="bg-white border border-slate-100 p-6 rounded-2xl">
            <p className="text-slate-500">New Loan Requests</p>
            <h2 className="text-3xl font-bold">28</h2>
          </div>
          <div className="bg-white border border-slate-100 p-6 rounded-2xl">
            <p className="text-slate-500">Overdue Today</p>
            <h2 className="text-3xl font-bold text-red-500">9</h2>
          </div>
          <div className="bg-white border border-slate-100 p-6 rounded-2xl">
            <p className="text-slate-500">Pending Returns</p>
            <h2 className="text-3xl font-bold text-orange-500">15</h2>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-lg">Current Circulation Activity</h3>
          </div>
          <div className="p-6 text-center text-slate-400">Tabel Sirkulasi Buku</div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardStaff;