import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/employee.service';
import { AttendanceService } from '../../core/attendance.service';
import { Employee, AttendanceRecord } from '../../core/models';

@Component({
  selector: 'app-attendance',
  imports: [FormsModule],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css'
})
export class Attendance implements OnInit {

  employees: Employee[] = [];
  history: AttendanceRecord[] = [];
  errorMessage = '';
  successMessage = '';

  form: AttendanceRecord = {
    employeeId: null,
    attendanceDate: '',
    status: 'PRESENT',
    overtimeHours: 0
  };

  constructor(
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.employeeService.getAll().subscribe({
      next: (data) => { this.employees = data; this.cdr.markForCheck(); },
      error: () => { this.errorMessage = 'Could not load employees'; this.cdr.markForCheck(); }
    });
  }

  onEmployeeChange(id: number) {
    this.form.employeeId = id;
    this.loadHistory();
  }

  loadHistory() {
    if (this.form.employeeId === null) {
      return;
    }
    this.attendanceService.getByEmployee(this.form.employeeId).subscribe({
      next: (data) => this.history = data,
      error: () => this.errorMessage = 'Could not load attendance'
    });
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    this.attendanceService.mark(this.form).subscribe({
      next: () => {
        this.successMessage = 'Attendance marked';
        this.loadHistory();
      },
      error: (err) => {
        this.errorMessage = this.getErrorText(err);
      }
    });
  }

  private getErrorText(err: any): string {
    if (err.error && err.error.fieldErrors) {
      return Object.values(err.error.fieldErrors).join(', ');
    }
    if (err.error && err.error.message) {
      return err.error.message;
    }
    return 'Something went wrong';
  }
}