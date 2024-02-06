import {Component, Inject} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
 

@Component({
  selector: 'app-share-component',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareDialogComponent {
  dialogData: any = {
    title: "",
    subHeader: ""
  }
  constructor(
    public dialogRef: MatDialogRef<ShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      console.log("Params ", this.data);
      this.dialogData = this.data;
    }
 
  shareViaEmail() {
    this.dialogRef.close("share");
  }

  downloadAsPDF() {
    this.dialogRef.close("download");
  }
  cancel() {
    this.dialogRef.close();
  }
}
