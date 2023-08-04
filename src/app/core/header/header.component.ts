import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Users } from 'src/app/models/users';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService]
})
export class HeaderComponent implements OnInit{
  showSubMenu = false;
  showSubMenuMulher = false;
  showSubMenuCrianca = false;
  showSubMenuAcessorios = false;
  loginDialogVisible = false;
  name: string = '';
  loggedin: boolean = false;
  isAdmin: boolean = false;


  constructor(private router: Router,
    private authService: AuthService,
    private messageService: MessageService) { }


  subMenuItems: MenuItem[] = [
    { label: 'Casacos' },
    { label: 'Camisas' },
    { label: 'Calças' },
    { label: 'Sweatshirts' },
    { label: 'Polos' },
    { label: 'Sapatos' },
    { label: 'Todos', routerLink: '/allproducts' }
  ];

  subMenuItemsMulher: MenuItem[] = [
    { label: 'Vestidos' },
    { label: 'Blusões' },
    { label: 'Coletes' },
    { label: 'Jeans' },
    { label: 'Saias' },
    { label: 'Calções' },
    { label: 'Lingerie' },
    { label: 'Sapatos' },
    { label: 'Malas' },
    { label: 'Todos', routerLink: '/allproducts' }
  ];

  subMenuItemsCrianca: MenuItem[] = [
    { label: 'Menina | 6-14 Anos' },
    { label: 'Menino | 6-14 Anos' },
    { label: 'Bebé Menina | 3 Meses - 5 Anos' },
    { label: 'Bebé Menino | 3 Meses - 5 Anos' },
    { label: 'Mini | 0-12 Meses' },
    { label: 'Todos', routerLink: '/allproducts' }
  ];
	
  subMenuItemsAcessorios: MenuItem[] = [
    { label: 'Malas' },
    { label: 'Pulseiras' },
    { label: 'Anéis' },
    { label: 'Todos', routerLink: '/allproducts' }
  ];

  ngOnInit(): void {
    // Check local storage for login status
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
      this.loggedin = true;

      // Retrieve the user data from local storage
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        const user: Users = JSON.parse(userData);
        this.name = user.name;
        this.isAdmin = user.role === 'admin';
      }
    }
  }

  getSubMenuPosition() {
    if (this.showSubMenu) {
      return { 'top': '100%', 'bottom': 'unset' };
    } else {
      return { 'bottom': '100%', 'top': 'unset' };
    }
  }

  toggleSubMenu() :void {
    this.showSubMenu = !this.showSubMenu;
  }

  toggleSubMenuA(submenuType: string): void {
    if (submenuType === 'mulher') {
      this.showSubMenuMulher = !this.showSubMenuMulher;
    } else if (submenuType === 'crianca') {
      this.showSubMenuCrianca = !this.showSubMenuCrianca;
    } else if (submenuType === 'acessorios') {
      this.showSubMenuAcessorios = !this.showSubMenuAcessorios;
    }
  }

  toggleSubMenuMulher() :void {
    this.showSubMenuMulher = !this.showSubMenuMulher;
  }

  showLoginDialog() :void {
    this.loginDialogVisible = true;
  }


  onLogin(user: Users): void {
    this.loggedin = true;
    this.name = user.name;
    this.isAdmin = user.role === 'admin';
    localStorage.setItem('loggedIn', 'true');

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Logged in successfully!'
    });

    this.loginDialogVisible = false;
    this.router.navigate(['/home']); 
  }


  onLogout(): void {
    this.authService.logout();

    this.loggedin = false;
    this.isAdmin = false;
    this.name = '';
    localStorage.removeItem('loggedIn');

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Logged out successfully!'
    });

    this.router.navigate(['/home']);
  }

}
