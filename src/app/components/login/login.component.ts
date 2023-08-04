import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Users } from 'src/app/models/users';
import { UserserviceService } from 'src/app/services/userservice.service';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {
  @Output() onLogin: EventEmitter<any> = new EventEmitter();

  loginForm: FormGroup;
  loginDialogVisible!: boolean ;

  constructor(private userService: UserserviceService, private messageService: MessageService, private fb: FormBuilder, private router: Router,private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all the fields correctly.'
      });
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService.login(email, password);

    this.userService.login(email, password).subscribe({
      next: (loggedInUser: Users | undefined) => {
        if (loggedInUser) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Logged in successfully!'
          });
          // Emit the login event with the logged-in user data
          this.onLogin.emit(loggedInUser);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Incorrect email or password.'
          });
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred during login.'
        });
      }
    });

    }    
    

    closeLoginDialog() {
      this.loginDialogVisible = false;
      this.router.navigate(['/registeruser']);

    }

}

