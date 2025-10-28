import React from 'react';
import { Clock, Users, Calendar } from 'lucide-react';

const Header: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Timesheet Tracker</h1>
              <p className="text-blue-100 text-sm mt-1">Pelacak Jam Kerja Tim</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
            <Calendar className="w-4 h-4" />
            <span>{currentDate}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
