import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'book-lib';
  constructor() {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyDL5L7t0judWxy0hiFsDxBHFduiFbhENT4",
      authDomain: "http-client-demo-e2a22.firebaseapp.com",
      databaseURL: "https://http-client-demo-e2a22.firebaseio.com",
      projectId: "http-client-demo-e2a22",
      storageBucket: "http-client-demo-e2a22.appspot.com",
      messagingSenderId: "939950589595"
    };
    firebase.initializeApp(config);
  }
}
