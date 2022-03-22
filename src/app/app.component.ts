import { Component } from '@angular/core';
import { AuthService } from './log-in/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sms';

  constructor(private _auth: AuthService) {
    
  }

  adminActive: boolean = false;

  activeSwitch(key: boolean) {
    this.adminActive=key;
  }


}
