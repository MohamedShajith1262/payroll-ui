export interface Employee {
  id?: number;
  name: string;
  role: string;
  salaryType: string;
  salaryAmount: number;
  createdAt?: string;
}

export interface AttendanceRecord {
  id?: number;
  employeeId: number | null;
  employeeName?: string;
  attendanceDate: string;
  status: string;
  overtimeHours: number;
}

export interface LeaveRecord {
  id?: number;
  employeeId: number | null;
  employeeName?: string;
  startDate: string;
  endDate: string;
  reason: string;
  status?: string;
}

export interface PayrollResult {
  employeeId: number;
  employeeName: string;
  month: string;
  salaryType: string;
  salaryAmount: number;
  ratePerDay: number;
  presentDays: number;
  absentDays: number;
  basePay: number;
  overtimeHours: number;
  overtimePay: number;
  grossSalary: number;
}