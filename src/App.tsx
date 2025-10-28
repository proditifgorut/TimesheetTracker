import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import TeamMemberCard from './components/TeamMemberCard';
import TimesheetEntryRow from './components/TimesheetEntryRow';
import AddTimesheetForm from './components/AddTimesheetForm';
import WeeklySummaryTable from './components/WeeklySummaryTable';
import { teamMembers, timesheetEntries } from './data/mockData';
import { WeeklySummary } from './types';
import { Clock, Users, CheckCircle, Plus, Filter, Download } from 'lucide-react';
import { formatHours } from './utils/timeCalculations';

function App() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'week'>('week');

  const stats = useMemo(() => {
    const activeMembers = teamMembers.filter(m => m.status === 'active').length;
    const totalHours = timesheetEntries
      .filter(e => e.status === 'completed')
      .reduce((sum, e) => sum + e.totalHours, 0);
    const completedEntries = timesheetEntries.filter(e => e.status === 'completed').length;
    const ongoingEntries = timesheetEntries.filter(e => e.status === 'ongoing').length;

    return {
      activeMembers,
      totalHours,
      completedEntries,
      ongoingEntries
    };
  }, []);

  const weeklySummary = useMemo((): WeeklySummary[] => {
    const summaryMap = new Map<string, WeeklySummary>();

    timesheetEntries
      .filter(e => e.status === 'completed')
      .forEach(entry => {
        const existing = summaryMap.get(entry.memberId);
        if (existing) {
          existing.totalHours += entry.totalHours;
          existing.daysWorked += 1;
        } else {
          summaryMap.set(entry.memberId, {
            memberId: entry.memberId,
            memberName: entry.memberName,
            totalHours: entry.totalHours,
            daysWorked: 1,
            avgHoursPerDay: 0
          });
        }
      });

    const summaries = Array.from(summaryMap.values());
    summaries.forEach(s => {
      s.avgHoursPerDay = s.totalHours / s.daysWorked;
    });

    return summaries.sort((a, b) => b.totalHours - a.totalHours);
  }, []);

  const filteredEntries = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split('T')[0];

    switch (selectedFilter) {
      case 'today':
        return timesheetEntries.filter(e => e.date === today);
      case 'week':
        return timesheetEntries.filter(e => e.date >= weekAgoStr);
      default:
        return timesheetEntries;
    }
  }, [selectedFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Tim Aktif"
            value={stats.activeMembers}
            icon={Users}
            color="bg-blue-500"
            subtitle="anggota sedang bekerja"
          />
          <StatsCard
            title="Total Jam Minggu Ini"
            value={formatHours(stats.totalHours)}
            icon={Clock}
            color="bg-purple-500"
            subtitle="akumulasi jam kerja"
          />
          <StatsCard
            title="Entri Selesai"
            value={stats.completedEntries}
            icon={CheckCircle}
            color="bg-green-500"
            subtitle="catatan waktu lengkap"
          />
          <StatsCard
            title="Sedang Berlangsung"
            value={stats.ongoingEntries}
            icon={Clock}
            color="bg-orange-500"
            subtitle="sesi aktif"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-lg font-bold text-gray-900">Catatan Timesheet</h2>
                <div className="flex gap-2">
                  <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                    <button
                      onClick={() => setSelectedFilter('today')}
                      className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                        selectedFilter === 'today'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Hari Ini
                    </button>
                    <button
                      onClick={() => setSelectedFilter('week')}
                      className={`px-3 py-1.5 text-xs font-medium transition-colors border-x border-gray-300 ${
                        selectedFilter === 'week'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Minggu Ini
                    </button>
                    <button
                      onClick={() => setSelectedFilter('all')}
                      className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                        selectedFilter === 'all'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Semua
                    </button>
                  </div>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Tambah</span>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-3">
                {filteredEntries.length > 0 ? (
                  filteredEntries.map(entry => (
                    <TimesheetEntryRow key={entry.id} entry={entry} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Belum ada catatan untuk filter ini</p>
                  </div>
                )}
              </div>
            </div>

            <WeeklySummaryTable summaries={weeklySummary} />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Anggota Tim
                </h2>
              </div>
              <div className="p-6 space-y-3 max-h-[600px] overflow-y-auto">
                {teamMembers.map(member => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-md p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Ekspor Laporan</h3>
              <p className="text-blue-100 text-sm mb-4">
                Download laporan timesheet dalam format Excel atau PDF
              </p>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                <Download className="w-5 h-5" />
                Download Laporan
              </button>
            </div>
          </div>
        </div>
      </main>

      {showAddForm && <AddTimesheetForm onClose={() => setShowAddForm(false)} />}
    </div>
  );
}

export default App;
