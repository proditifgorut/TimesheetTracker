import React from 'react';
import { TimesheetEntry } from '../types';
import { Clock, FileText, CheckCircle, PlayCircle } from 'lucide-react';
import { formatDateShort, formatHours } from '../utils/timeCalculations';

interface TimesheetEntryRowProps {
  entry: TimesheetEntry;
}

const TimesheetEntryRow: React.FC<TimesheetEntryRowProps> = ({ entry }) => {
  const isOngoing = entry.status === 'ongoing';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-3">
          <div className="flex items-center gap-3">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(entry.memberName)}&background=random&color=fff`}
              alt={entry.memberName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-900">{entry.memberName}</p>
              <p className="text-xs text-gray-500">{formatDateShort(entry.date)}</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="font-medium text-gray-700">{entry.checkIn}</span>
            <span className="text-gray-400">-</span>
            <span className="font-medium text-gray-700">
              {entry.checkOut || '...'}
            </span>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            {isOngoing ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                <PlayCircle className="w-3 h-3" />
                Berlangsung
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                <CheckCircle className="w-3 h-3" />
                {formatHours(entry.totalHours)}
              </span>
            )}
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="flex items-start gap-2">
            <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900">{entry.project}</p>
              <p className="text-xs text-gray-500 line-clamp-1">{entry.notes}</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              Edit
            </button>
            <button className="flex-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimesheetEntryRow;
