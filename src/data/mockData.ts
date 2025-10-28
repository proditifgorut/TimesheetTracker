import { TeamMember, TimesheetEntry } from '../types';

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    role: 'Frontend Developer',
    avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=3b82f6&color=fff',
    email: 'budi@company.com',
    status: 'active'
  },
  {
    id: '2',
    name: 'Siti Nurhaliza',
    role: 'Backend Developer',
    avatar: 'https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=8b5cf6&color=fff',
    email: 'siti@company.com',
    status: 'active'
  },
  {
    id: '3',
    name: 'Ahmad Wijaya',
    role: 'UI/UX Designer',
    avatar: 'https://ui-avatars.com/api/?name=Ahmad+Wijaya&background=ec4899&color=fff',
    email: 'ahmad@company.com',
    status: 'on-break'
  },
  {
    id: '4',
    name: 'Dewi Lestari',
    role: 'Project Manager',
    avatar: 'https://ui-avatars.com/api/?name=Dewi+Lestari&background=10b981&color=fff',
    email: 'dewi@company.com',
    status: 'active'
  },
  {
    id: '5',
    name: 'Rudi Hartono',
    role: 'QA Engineer',
    avatar: 'https://ui-avatars.com/api/?name=Rudi+Hartono&background=f59e0b&color=fff',
    email: 'rudi@company.com',
    status: 'inactive'
  }
];

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const twoDaysAgo = new Date(today);
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

export const timesheetEntries: TimesheetEntry[] = [
  {
    id: '1',
    memberId: '1',
    memberName: 'Budi Santoso',
    date: today.toISOString().split('T')[0],
    checkIn: '08:30',
    checkOut: null,
    totalHours: 0,
    project: 'Website Redesign',
    notes: 'Mengerjakan landing page',
    status: 'ongoing'
  },
  {
    id: '2',
    memberId: '2',
    memberName: 'Siti Nurhaliza',
    date: today.toISOString().split('T')[0],
    checkIn: '09:00',
    checkOut: null,
    totalHours: 0,
    project: 'API Development',
    notes: 'Integrasi payment gateway',
    status: 'ongoing'
  },
  {
    id: '3',
    memberId: '1',
    memberName: 'Budi Santoso',
    date: yesterday.toISOString().split('T')[0],
    checkIn: '08:45',
    checkOut: '17:30',
    totalHours: 8.75,
    project: 'Website Redesign',
    notes: 'Menyelesaikan komponen navbar',
    status: 'completed'
  },
  {
    id: '4',
    memberId: '2',
    memberName: 'Siti Nurhaliza',
    date: yesterday.toISOString().split('T')[0],
    checkIn: '09:00',
    checkOut: '18:00',
    totalHours: 9,
    project: 'API Development',
    notes: 'Testing endpoint user management',
    status: 'completed'
  },
  {
    id: '5',
    memberId: '4',
    memberName: 'Dewi Lestari',
    date: yesterday.toISOString().split('T')[0],
    checkIn: '08:00',
    checkOut: '17:00',
    totalHours: 9,
    project: 'Sprint Planning',
    notes: 'Meeting dengan klien dan tim',
    status: 'completed'
  },
  {
    id: '6',
    memberId: '3',
    memberName: 'Ahmad Wijaya',
    date: twoDaysAgo.toISOString().split('T')[0],
    checkIn: '09:30',
    checkOut: '18:15',
    totalHours: 8.75,
    project: 'Mobile App Design',
    notes: 'Membuat wireframe dan mockup',
    status: 'completed'
  },
  {
    id: '7',
    memberId: '1',
    memberName: 'Budi Santoso',
    date: twoDaysAgo.toISOString().split('T')[0],
    checkIn: '08:30',
    checkOut: '17:45',
    totalHours: 9.25,
    project: 'Website Redesign',
    notes: 'Implementasi responsive design',
    status: 'completed'
  },
  {
    id: '8',
    memberId: '5',
    memberName: 'Rudi Hartono',
    date: twoDaysAgo.toISOString().split('T')[0],
    checkIn: '09:00',
    checkOut: '18:00',
    totalHours: 9,
    project: 'Testing',
    notes: 'QA testing fitur login',
    status: 'completed'
  }
];
