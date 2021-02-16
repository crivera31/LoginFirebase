import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onRegister() {
    const { email, password, username } = this.registerForm.value;
    try {
      const user = await this.authService.register(email, password, username);
      if(user) {
        // this.router.navigateByUrl('/pages');
        this.router.navigateByUrl('/send-email');
      }
    } catch (error) {
      console.log(error)
    }
  }

}
