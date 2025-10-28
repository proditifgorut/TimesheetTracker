import React from 'react';
import { TeamMember } from '../types';
import { Mail, Circle } from 'lucide-react';

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const statusConfig = {
    active: { color: 'bg-green-500', text: 'Aktif', textColor: 'text-green-700' },
    inactive: { color: 'bg-gray-400', text: 'Tidak Aktif', textColor: 'text-gray-700' },
    'on-break': { color: 'bg-yellow-500', text: 'Istirahat', textColor: 'text-yellow-700' }
  };

  const status = statusConfig[member.status];

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all hover:border-blue-200">
      <div className="flex items-start gap-4">
        <img
          src={member.avatar}
          alt={member.name}
          className="w-14 h-14 rounded-full ring-2 ring-gray-100"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg truncate">{member.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{member.role}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Mail className="w-3 h-3" />
            <span className="truncate">{member.email}</span>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-${status.color}/10`}>
          <Circle className={`w-2 h-2 ${status.color} fill-current`} />
          <span className={`text-xs font-medium ${status.textColor}`}>{status.text}</span>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
