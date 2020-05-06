import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  apiUrl = environment.apiUrl
  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    //@ts-ignore
    let url = new URL(window.location);
    let query_params = url.search || url.hash;
    let callbackURL = `${url.origin}/auth`;


    let params = new URLSearchParams(query_params.slice(1));
                let auth_code = params.get('code')
                if (auth_code !== null) {
                  this.http.get(`${this.apiUrl}/token?code=${auth_code}&redirect_uri=${callbackURL}&state=${params.get('state')}`
                    ).subscribe((info: any) => {
                            console.log('info', info);
                            let access_token = info.access_token;
                            if (access_token !== null) {
                                sessionStorage.setItem('access_token', access_token);
                                this.router.navigate(['/repositories']);
                            } else {
                              this.router.navigate(['/login']);
                            }
                    });
                }

  }

}
