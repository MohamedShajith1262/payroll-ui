import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LeaveRecord } from './models';

@Injectable({ providedIn: 'root' })
export class LeaveService {

  private url = environment.apiUrl + '/leaves';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<LeaveRecord[]>(this.url);
  }

  apply(leave: LeaveRecord) {
    return this.http.post<LeaveRecord>(this.url, leave);
  }

  updateStatus(id: number, status: string) {
    return this.http.patch<LeaveRecord>(this.url + '/' + id + '/status', { status: status });
  }

  getByEmployee(employeeId: number) {
  return this.http.get<LeaveRecord[]>(this.url + '/employee/' + employeeId);
  }
}