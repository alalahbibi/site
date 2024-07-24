import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  private apiUrl = 'http://localhost:5000/api/admin';

  constructor(private http: HttpClient) { }

  addPersonnel(personnel: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addPersonnel`, personnel);
  }

  getPersonnels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/personnels`);
  }
}
