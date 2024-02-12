import {Component, Input} from '@angular/core';
import { Company } from 'src/app/models/company';
import { Quote } from 'src/app/models/quote';
import * as moment from 'moment'
import { DocumentData } from 'src/app/models/document';


@Component({
  selector: 'app-document-preview',
  templateUrl: './document-preview.component.html',
  styleUrls: ['./document-preview.component.scss']
})
export class DocumentPreviewDialogComponent {

  @Input() company: Company;
  @Input() data: DocumentData;

  formatAddress(address: string): string[] {
    const addNewLine = address.split('\n');
    const addComma = address.split(',');

    if(addNewLine.length > 0) {
      return addNewLine;
    }
    else if(addComma.length > 0) {
      return addComma;
    } else {
      return [address]; 
    }
  }
  
  formatDate(date?: any) {
    return moment(date).format('DD/MM/YYYY');  
  }
 
 
  // shareViaEmail() {
  //   this.dialogRef.close("share");
  // }

  // downloadAsPDF() {
  //   this.dialogRef.close("download");
  // }
  // cancel() {
  //   this.dialogRef.close();
  // }
}
