import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AttendanceRecord } from './models';

@Injectable({ providedIn: 'root' })
export class AttendanceService {

  private url = environment.apiUrl + '/attendance';

  constructor(private http: HttpClient) {}

  mark(record: AttendanceRecord) {
    return this.http.post<AttendanceRecord>(this.url, record);
  }

  getByEmployee(employeeId: number) {
    return this.http.get<AttendanceRecord[]>(this.url + '/employee/' + employeeId);
  }
}