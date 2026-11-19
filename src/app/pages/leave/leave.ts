import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/employee.service';
import { LeaveService } from '../../core/leave.service';
import { Employee, LeaveRecord } from '../../core/models';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-leave',
  imports: [FormsModule],
  templateUrl: './leave.html',
  styleUrl: './leave.css'
})
export class Leave implements OnInit {

  employees: Employee[] = [];
  leaves: LeaveRecord[] = [];
  errorMessage = '';
  successMessage = '';

  form: LeaveRecord = { employeeId: null, startDate: '', endDate: '', reason: '' };

  constructor(
    private employeeService: EmployeeService,
    private leaveService: LeaveService,
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
    this.form.employeeId = this.authService.getEmployeeId();
  }
  this.loadLeaves();
}

loadLeaves() {
  const request = this.authService.isAdmin()
    ? this.leaveService.getAll()
    : this.leaveService.getByEmployee(this.authService.getEmployeeId()!);

  request.subscribe({
    next: (data) => this.leaves = data,
    error: () => this.errorMessage = 'Could not load leaves'
  });
}

  onApply() {
    this.errorMessage = '';
    this.successMessage = '';

    this.leaveService.apply(this.form).subscribe({
      next: () => {
        this.successMessage = 'Leave applied';
        this.loadLeaves();
      },
      error: (err) => this.errorMessage = this.getErrorText(err)
    });
  }

  onDecision(id: number, status: string) {
    this.errorMessage = '';
    this.leaveService.updateStatus(id, status).subscribe({
      next: () => this.loadLeaves(),
      error: (err) => this.errorMessage = this.getErrorText(err)
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