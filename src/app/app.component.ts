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
  expanded=false;
  showExpanded=false;

  constructor(private _global: GlobalService) {
    this._global.loggedIn.subscribe((flag)=> {
      this.loggedIn = flag;
    });
    this._global.screenWidth.subscribe((data)=> {
      if(data < 900)
        this.expanded = false;
      else
        this.expanded = true;
    })
  }

  toggleShowExpanded() {
    this.showExpanded=!this.showExpanded;
    console.log(this.showExpanded);
  }

  activeSwitch(key: boolean) {
    this.adminActive=key;
  }

}
