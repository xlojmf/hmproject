import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from './userservice.service';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userService: UserserviceService, private router: Router) {}

  login(email: string, password: string): void {
    // Call your user service for authentication
    this.userService.login(email, password).subscribe((loggedInUser: Users | undefined) => {
      if (loggedInUser && loggedInUser.role === 'admin') {
        // Store user data in local storage or a secure storage mechanism
        localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
        this.router.navigate(['/admin']); // Navigate to the dashboard or any other authorized page
      } else {
        localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      }
    });
  }

  logout(): void {
    // Remove user data from storage
    localStorage.removeItem('currentUser');
    this.router.navigate(['/home']); // Navigate to the login page
  }

  isAdmin(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser && currentUser.role === 'admin';
  }

  getCurrentUser(): Users | null {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }
}
