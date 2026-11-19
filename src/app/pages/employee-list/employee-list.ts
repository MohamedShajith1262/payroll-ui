import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/employee.service';
import { Employee } from '../../core/models';

@Component({
  selector: 'app-employee-list',
  imports: [FormsModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {

  employees: Employee[] = [];
  errorMessage = '';
  successMessage = '';

  newEmployee: Employee = this.emptyEmployee();

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAll().subscribe({
      next: (data) => { this.employees = data; this.cdr.markForCheck(); },
      error: () => { this.errorMessage = 'Could not load employees'; this.cdr.markForCheck(); }
    });
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    this.employeeService.create(this.newEmployee).subscribe({
      next: () => {
        this.successMessage = 'Employee added';
        this.newEmployee = this.emptyEmployee();
        this.loadEmployees();
      },
      error: (err) => {
        this.errorMessage = this.getErrorText(err);
      }
    });
  }

  private emptyEmployee(): Employee {
    return { name: '', role: 'OFFICE', salaryType: 'MONTHLY', salaryAmount: 0 };
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