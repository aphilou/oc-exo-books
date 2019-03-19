import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (usr: firebase.User) => {
            if (usr) {
              resolve(true);
            } else {
              this.router.navigate( [ '/auth', 'signin']);
              resolve(false);
            }
          }
        );
      }
    );
  }

}
