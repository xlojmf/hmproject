import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Users } from 'src/app/models/users';
import { UserserviceService } from 'src/app/services/userservice.service';

@Component({
  selector: 'app-usersdashboard',
  templateUrl: './usersdashboard.component.html',
  styleUrls: ['./usersdashboard.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class UsersdashboardComponent implements OnInit {
  displayDialog: boolean = false;
  newUser: boolean = false;
  selectedUser: Users = {} as Users;
  users: Users[] = [];
  
  constructor(
    private userService: UserserviceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }


  deleteUser(userId: number, event: Event): void {
    event.stopPropagation();

    this.confirmationService.confirm({

      message: 'Are you sure you want to delete this user?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.userService.deleteUser(userId)
          .subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User deleted successfully' });
              this.getUsers();
            },
            error: (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting user' });
              console.error('Error deleting user:', error);
            }
          });
      },
      reject: (type :any) => {
        switch (type) {
            case ConfirmEventType.REJECT:
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                break;
            case ConfirmEventType.CANCEL:
                this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                break;
        }
    }

    });
  }
  
  updateUser(user: Users): void {
    this.userService.updateUser(user).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully' });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating user' });
        console.error('Error updating user:', error);
      }
    });
  }
  

  showDialog() {
    this.newUser = true;
    this.selectedUser = {
      id: 0,
      name: '',
      email: '',
      password: '',
      adress: '',
      postalcode: '',
      country: '',
      active: true,
      role: ''
    };
    this.displayDialog = true;
  }

  saveUser() {
    this.userService.addUser(this.selectedUser).subscribe({
      next: (user) => {
        this.users.push(user);
        this.displayDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User added successfully' });
        this.getUsers(); 
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error creating user' });
        console.error('Error creating user:', error);
      }
    });
  }

}


