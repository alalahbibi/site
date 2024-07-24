import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/auth';
  private loginTimes: string[] = [];

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  getUserById(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/user/${id}`, { headers });
  }
  getAllUsers() {
    return this.http.get<any[]>('http://localhost:5000/auth/users');
  }
  recordLoginTime(username: string) {
    const now = new Date();
    const loginTimes = this.getLoginTimes();
    loginTimes.push({ username, time: now.toLocaleString(), type: 'login' });
    localStorage.setItem('loginTimes', JSON.stringify(loginTimes));
  }

  recordLogoutTime(username: string) {
    const now = new Date();
    const loginTimes = this.getLoginTimes();
    loginTimes.push({ username, time: now.toLocaleString(), type: 'logout' });
    localStorage.setItem('loginTimes', JSON.stringify(loginTimes));
  }

  getLoginTimes(): { username: string; time: string; type: string }[] {
    const loginTimes = localStorage.getItem('loginTimes');
    return loginTimes ? JSON.parse(loginTimes) : [];
  }
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/${userId}`);
  }

}
