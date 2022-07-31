import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  head: any;
  icon: any;
  value: any;
}

@Component({
  selector: 'app-dialog',
  template: `
          <mat-card-content fxLayout fxLayoutAlign="space-between">
            <mat-icon>{{ data.icon }}</mat-icon>
            <p>{{ data.head }}</p>
            <p>{{ data.value }}</p>
          </mat-card-content>
          <table style="text-align: center; border-spacing: 30px;">
            <tbody>
              <tr>
                <th>S.No</th>
                <th>List</th>
                <th>Value</th>
                <th>Remark</th>
              </tr>
              <tr>
                <td>1</td>
                <td>Lorem ipsum dolor sit amet consectetur</td>
                <td>65</td>
                <td>Sit amet consectetur</td>
              </tr>
              <tr>
              <td>2</td>                
                <td>Lorem ipsum dolor sit amet consectetur</td>
                <td>65</td>
                <td>Sit amet consectetur</td>
              </tr>
              <tr>
              <td>3</td>
                <td>Lorem ipsum dolor sit amet consectetur</td>
                <td>65</td>
                <td>Sit amet consectetur</td>
              </tr>
              <tr>
              <td>4</td>
                <td>Lorem ipsum dolor sit amet consectetur</td>
                <td>65</td>
                <td>Sit amet consectetur</td>
              </tr>
              <tr>
              <td>5</td>
                <td>Lorem ipsum dolor sit amet consectetur</td>
                <td>65</td>
                <td>Sit amet consectetur</td>
              </tr>
              <tr>
              <td>6</td>
                <td>Lorem ipsum dolor sit amet consectetur</td>
                <td>65</td>
                <td>Sit amet consectetur</td>
              </tr>
            </tbody>
          </table>
  `,
  styles: []
})

export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
