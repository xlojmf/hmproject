import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { UserserviceService } from 'src/app/services/userservice.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: Users;
  oldPassword!: string;
  newPassword!: string;

  constructor(private userService: UserserviceService) { }

  ngOnInit(): void {
    const loggedIn = localStorage.getItem('loggedIn');

    if (loggedIn === 'true') {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    }
  }

  updateProfile(): void {
    this.userService.updateUser(this.user).subscribe(updatedUser => {
      this.user = updatedUser;
      console.log('Profile updated successfully.');
    });
  }

  changePassword(): void {
    // You can add password validation and error handling logic here
    this.userService.updateUser({ ...this.user, password: this.newPassword }).subscribe(updatedUser => {
      this.user = updatedUser;
      console.log('Password changed successfully.');
      this.oldPassword = '';
      this.newPassword = '';
    });
  }
}
