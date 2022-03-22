import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  template: `
    <div class="defaultHeight">Forgot password works !</div>
  `,
  styles: [
    `
      body {
        min-height: calc(100vh - 110px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }    
    `
  ]
})
export class ForgotPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
