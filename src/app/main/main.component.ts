import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer, private auth: AuthService) { 
      this.matIconRegistry.addSvgIcon(
        `logo`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`/assets/images/aspose-logo.svg`)
      );
    }

    logout() {
      this.auth.performLogout()
    }

  ngOnInit() {
  
  }

}
