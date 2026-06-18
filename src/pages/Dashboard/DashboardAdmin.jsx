import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Book, Users, Repeat, AlertCircle } from 'lucide-react';

const DashboardAdmin = () => {
  return (
    <DashboardLayout role="Admin" userTitle="Super Admin">
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-6">
          {[
            { label: 'Total Books', val: '15,432', icon: <Book />, color: 'bg-blue-500' },
            { label: 'Active Users', val: '2,108', icon: <Users />, color: 'bg-emerald-500' },
            { label: 'Active Loans', val: '450', icon: <Repeat />, color: 'bg-indigo-500' },
            { label: 'Overdue Items', val: '35', icon: <AlertCircle />, color: 'bg-red-500' },
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500 font-medium">{s.label}</p>
                  <h3 className="text-2xl font-bold mt-1">{s.val}</h3>
                </div>
                <div className={`${s.color} p-2 rounded-lg text-white`}>{s.icon}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white p-6 rounded-2xl border border-slate-100 h-64 flex items-center justify-center text-slate-400">
            [ Grafik Monthly Loan Trends ]
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 h-64 flex items-center justify-center text-slate-400">
            [ Donut Chart Fines Overview ]
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAdmin;