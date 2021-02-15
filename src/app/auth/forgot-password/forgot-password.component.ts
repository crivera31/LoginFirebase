import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public email = new FormControl('');
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onReset() {
    try {
      const email = this.email.value;
      await this.authService.resetPassword(email);
      window.alert('Correo enviado, revise.');
      /**redirect */
      this.router.navigateByUrl('/login');
    } catch (error) {
      console.log(error);
    }
  }
}
