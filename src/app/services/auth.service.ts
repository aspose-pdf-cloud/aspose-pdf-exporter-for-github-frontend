import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  config = JSON.parse(sessionStorage.getItem('config'))
  constructor() { 
    
  }
  performLogin() {
    const url = `${this.config.Authentication.AuthorizationEndpoint}?client_id=${encodeURI(this.config.Authentication.ClientId)}&redirect_uri=${encodeURI(this.config.callbackURL)}&scope=${encodeURI(this.config.scope)}&state=${Math.random()}&nonce=${Math.random()}`;
    window.location.href = url;
  }
}
