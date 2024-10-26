import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisteruserserviceService {
  private url = "http://localhost:3000/users";
  userData: any;

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(this.url, userData).pipe(
      tap(response => this.userData = response)
    );
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.url}/${userId}`);
  }

  updateUserPhoto(userId: number, photo: string): Observable<any> {
    return this.http.put(`${this.url}/${userId}`, { image: photo });
  }

  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put(`${this.url}/${userId}`, userData);
  }
}