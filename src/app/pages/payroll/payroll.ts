import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/employee.service';
import { PayrollService } from '../../core/payroll.service';
import { Employee, PayrollResult } from '../../core/models';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-payroll',
  imports: [FormsModule],
  templateUrl: './payroll.html',
  styleUrl: './payroll.css'
})
export class Payroll implements OnInit {

  employees: Employee[] = [];
  selectedEmployeeId: number | null = null;
  month = '';
  result: PayrollResult | null = null;
  errorMessage = '';

  constructor(
    private employeeService: EmployeeService,
    private payrollService: PayrollService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
  if (this.authService.isAdmin()) {
    this.employeeService.getAll().subscribe({
      next: (data) => { this.employees = data; this.cdr.markForCheck(); },
      error: () => { this.errorMessage = 'Could not load employees'; this.cdr.markForCheck(); }
    });
  } else {
    this.selectedEmployeeId = this.authService.getEmployeeId();
  }
}

onCalculate() {
  this.errorMessage = '';
  this.result = null;

  if (this.selectedEmployeeId === null || this.month === '') {
    this.errorMessage = 'Please select an employee and a month';
    return;
  }

  this.payrollService.calculate(this.selectedEmployeeId, this.month).subscribe({
    next: (data) => { this.result = data; this.cdr.markForCheck(); },
    error: (err) => {
      this.errorMessage = err.error && err.error.message ? err.error.message : 'Something went wrong';
      this.cdr.markForCheck();
    }
  });
}

}