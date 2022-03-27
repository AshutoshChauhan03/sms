import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/log-in/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  adminStatus: boolean = false;

  constructor(private _auth: AuthService) {
    this._auth.checkAdminStatus().subscribe((flag: any)=> {
      this.adminStatus = flag.msg;
    });
  }

  ngOnInit(): void {
  }

}
