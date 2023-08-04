import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/models/users';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class RegisterComponent {

  registerForm: FormGroup; // Declare the registerForm variable

  user: Users = {
    id: 0,
    name: '',
    email: '',
    password: '',
    adress: '',
    postalcode: '',
    country: '',
    active: false,
    role: 'user'
  };

  confirmationDialog = false;

  constructor(
    private router: Router,
    private userService: UserserviceService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]],
      adress: ['', Validators.required],
      postalcode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  registerUser() {
    if (this.registerForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all the fields correctly'
      });
      return;
    }

    this.user = { ...this.user, ...this.registerForm.value };

    this.userService.checkEmailExists(this.user.email).subscribe(emailExists => {
      if (emailExists) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email already exist, please choose another' });
        return;
      }


      this.user.active = false;
      this.userService.addUser(this.user).subscribe(() => {
        this.showConfirmationDialog();
      });
    });
  }

  showConfirmationDialog() {
    this.confirmationDialog = true;
  }

  redirectToHomePage() {
    this.router.navigate(['/home']);
  }

}
