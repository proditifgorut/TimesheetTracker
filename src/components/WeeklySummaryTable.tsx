import React from 'react';
import { WeeklySummary } from '../types';
import { TrendingUp, Award } from 'lucide-react';
import { formatHours } from '../utils/timeCalculations';

interface WeeklySummaryTableProps {
  summaries: WeeklySummary[];
}

const WeeklySummaryTable: React.FC<WeeklySummaryTableProps> = ({ summaries }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Ringkasan Mingguan
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Anggota Tim
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total Jam
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Hari Kerja
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Rata-rata/Hari
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {summaries.map((summary, index) => {
              const isTopPerformer = index === 0;
              return (
                <tr key={summary.memberId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {isTopPerformer && (
                        <Award className="w-5 h-5 text-yellow-500" />
                      )}
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(summary.memberName)}&background=random&color=fff`}
                          alt={summary.memberName}
                          className="w-10 h-10 rounded-full"
                        />
                        <span className="font-medium text-gray-900">{summary.memberName}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                      {formatHours(summary.totalHours)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-900 font-medium">{summary.daysWorked} hari</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-700">{formatHours(summary.avgHoursPerDay)}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklySummaryTable;
