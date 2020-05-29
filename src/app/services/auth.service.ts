import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  config = JSON.parse(sessionStorage.getItem('config'))
  constructor(private router: Router) { 
    
  }
  performLogin() {
    const url = `${this.config.Authentication.AuthorizationEndpoint}?client_id=${encodeURI(this.config.Authentication.ClientId)}&redirect_uri=${encodeURI(this.config.callbackURL)}&scope=${encodeURI(this.config.scope)}&state=${Math.random()}&nonce=${Math.random()}`;
    window.location.href = url;
  }

  performLogout() {
    sessionStorage.removeItem('access_token');
    this.router.navigate( ["/login"] );
  }
}
