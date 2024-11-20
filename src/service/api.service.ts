import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://localhost:3000/employees'

  constructor(
    private http: HttpClient
  ) { }

  getData(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  postData(data: Employee[]): Observable<Employee[]> {
    return this.http.post<Employee[]>(this.url, data);
  }

  deleteData(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  updateData(id: string, data: Employee[]): Observable<Employee[]> {
    return this.http.put<Employee[]>(`${this.url}/${id}`, data);
  }

  getPagination(page: number, limit: number) {
    return this.http.get<{ employees: Employee[], total: number }>(
      `${this.url}/employees?page=${page}&limit=${limit}`
    );
  }

}
