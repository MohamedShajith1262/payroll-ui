import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Employee } from './models';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  private url = environment.apiUrl + '/employees';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Employee[]>(this.url);
  }

  create(employee: Employee) {
    return this.http.post<Employee>(this.url, employee);
  }
}