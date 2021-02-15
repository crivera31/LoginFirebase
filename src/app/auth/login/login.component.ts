import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public isLogged: boolean;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private authService: AuthService, private router: Router) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    if(localStorage.getItem('email') !== null) {
      this.router.navigateByUrl('/pages');
    }
  }

  async onLogin() {
    const { email,password } = this.loginForm.value;
    try {
      const user = await this.authService.login(email, password);
      if(user) {
        this.isLogged = true;
        console.log('User logueado: ' ,user);
        //redirec to home
        this.router.navigateByUrl('/pages');
      }
      
    } catch (error) {
      console.log(error)
    }
  }
}
