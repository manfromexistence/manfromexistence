import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cnsl-resend-email-dialog',
  templateUrl: './resend-email-dialog.component.html',
  styleUrls: ['./resend-email-dialog.component.scss'],
})
export class ResendEmailDialogComponent {
  public email: string = '';
  constructor(
    public dialogRef: MatDialogRef<ResendEmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data.email) {
      this.email = data.email;
    }
  }

  closeDialog(email: string = ''): void {
    this.dialogRef.close(email);
  }

  closeDialogWithSend(email: string = ''): void {
    this.dialogRef.close({ send: true, email });
  }
}
