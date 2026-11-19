import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PayrollResult } from './models';

@Injectable({ providedIn: 'root' })
export class PayrollService {

  private url = environment.apiUrl + '/payroll';

  constructor(private http: HttpClient) {}

  calculate(employeeId: number, month: string) {
    return this.http.get<PayrollResult>(this.url + '/' + employeeId + '?month=' + month);
  }
}