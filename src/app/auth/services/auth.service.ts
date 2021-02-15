import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import firebase from 'firebase/app';
import User from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: any;
  
  constructor(public afAuth: AngularFireAuth) { }

  async resetPassword(email: string): Promise<void>{
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error)
    }
  }
  async sendEmailVerification(): Promise<void> {
    return await(await this.afAuth.currentUser).sendEmailVerification();
  }
  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.user = JSON.stringify(result.user);
      console.log(result.user.email);
      localStorage.setItem('email', result.user.email);
      return result;

    } catch (error) {
      console.log(error);
    }
  }
  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.sendEmailVerification();
      return result;

    } catch (error) {
      console.log(error);
    }
  }
  async logout() {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('email');
    } catch (error) {
      console.log(error);
    }
  }
  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
