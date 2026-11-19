import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}

  register(username: string, password: string, employeeId: number) {
  return this.http.post<any>(environment.apiUrl + '/auth/register', {
    username: username, password: password, employeeId: employeeId
  });
}

saveSession(response: any) {
  localStorage.setItem('token', response.token);
  localStorage.setItem('role', response.role);
  if (response.employeeId) {
    localStorage.setItem('employeeId', String(response.employeeId));
  }
}

getRole() {
  return localStorage.getItem('role');
}

isAdmin() {
  return this.getRole() === 'ADMIN';
}

getEmployeeId() {
  const id = localStorage.getItem('employeeId');
  return id ? Number(id) : null;
}

login(username: string, password: string) {
    return this.http.post<any>(environment.apiUrl + '/auth/login', {
      username: username,
      password: password
    });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('employeeId');
  }
}