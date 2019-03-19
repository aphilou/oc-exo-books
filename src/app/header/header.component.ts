import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  userId: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user: firebase.User) => {
        if (user) {
          this.isAuth = true;
          this.userId = user.email;
        } else {
          this.isAuth = false;
        }
      }
    )
  }

  onSignOut() {
    this.authService.signOutUser();
  }
}
