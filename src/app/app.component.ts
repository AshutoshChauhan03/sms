import { Component } from '@angular/core';
import { AuthService } from './log-in/auth.service';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  adminActive: boolean = false;
  loggedIn = false;

  constructor(private _global: GlobalService) {
    this._global.loggedIn.subscribe((flag)=> {
      this.loggedIn = flag;
    });
  }

  activeSwitch(key: boolean) {
    this.adminActive=key;
  }


}
