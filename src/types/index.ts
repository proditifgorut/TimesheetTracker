export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  status: 'active' | 'inactive' | 'on-break';
}

export interface TimesheetEntry {
  id: string;
  memberId: string;
  memberName: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  totalHours: number;
  project: string;
  notes: string;
  status: 'completed' | 'ongoing';
}

export interface WeeklySummary {
  memberId: string;
  memberName: string;
  totalHours: number;
  daysWorked: number;
  avgHoursPerDay: number;
}
