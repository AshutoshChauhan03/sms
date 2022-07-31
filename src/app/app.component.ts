import { Component, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  adminActive: boolean = false;
  loggedIn = false;
  sidebarExpanded=true;
  showSidebar=false;
  loading = false;

  constructor(private _global: GlobalService) {
    this._global.loggedIn.subscribe((flag)=> {
      this.loggedIn = flag;
    });
    this._global.screenWidth.subscribe((data)=> {
      if(data < 900)
        this.sidebarExpanded = false;
      else
        this.sidebarExpanded = true;
    })

    this._global.loading.subscribe((flag: any) => {
      this.loading = flag;
    })
  }

  activeSwitch(key: boolean) {
    this.adminActive=key;
  }

}
