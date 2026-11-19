import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { EmployeeList } from './pages/employee-list/employee-list';
import { Attendance } from './pages/attendance/attendance';
import { Leave } from './pages/leave/leave';
import { Payroll } from './pages/payroll/payroll';
import { authGuard, adminGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login, data: { role: 'EMPLOYEE' } },
  { path: 'admin-login', component: Login, data: { role: 'ADMIN' } },
  { path: 'register', component: Register },
  { path: 'employees', component: EmployeeList, canActivate: [authGuard, adminGuard] },
  { path: 'attendance', component: Attendance, canActivate: [authGuard, adminGuard] },
  { path: 'leave', component: Leave, canActivate: [authGuard] },
  { path: 'payroll', component: Payroll, canActivate: [authGuard] },
];