import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../services/data.service';

export interface DialogData {
  error: string;
  error_description: string;
  error_result: string;
  requestId: string;
}
@Component({
  selector: 'app-error-handle-dialog',
  templateUrl: './error-handle-dialog.component.html'
})
export class ErrorHandleDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ErrorHandleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private api: DataService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  download() {
    this.api.downloadFile({downloadlink: this.data.error_result}).then(response => { 
      return response.blob()
    })
      .then(blob => {
        let fileUrl = window.URL.createObjectURL(blob)
        let a = document.createElement(`a`)
        a.href = fileUrl
        a.download = `${this.data.requestId}.json`
        document.body.appendChild(a)
        a.click()
        setTimeout(() => {
          a.remove()
        }, 200)
      })
      .catch(err => console.error(err))
  }
}
