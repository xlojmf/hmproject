import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Users } from '../models/users';


@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private usersUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.usersUrl);
  }

  getUserById(id: number): Observable<Users> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<Users>(url);
  }

  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.usersUrl, user);
  }

  updateUser(user: Users): Observable<Users> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.put<Users>(url, user);
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete(url);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => users.some(user => user.email === email))
    );
  }

  login(email: string, password: string): Observable<Users | undefined> {
    return this.getUsers().pipe(
      map(users => users.find(user => user.email === email && user.password === password))
    );
  }
  
  
  
}
