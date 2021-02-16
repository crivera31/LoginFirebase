import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLogged: boolean;
  public user: any;

  constructor(private authService: AuthService, private router: Router) {
    this.isLogged = false;    
  }

  async ngOnInit() {
    this.user = await this.authService.getCurrentUser();
    if (this.user) {
      this.isLogged = true;
      console.log('Usuairo logueado')
    } else {
      this.isLogged = false;
      console.log('Usuairo no logueado')
    }
  }
  
  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigateByUrl('/login');
    } catch (error) {
      console.log(error)
    }
  }

}
