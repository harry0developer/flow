import { Component, ViewEncapsulation, ViewChild } from '@angular/core'; 

import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
 

export interface Customer {
  id: number;
  imagePath: string;
  customerName: string;
  customerEmail: string;
  customerPhoneNumber: string;
  companyName: string;
  companyVATNumber: string;
  companyPhysicalAddress: string;
  customerType: string; // "Business | Individual";
} 

const ELEMENT_DATA: Customer[] = [
  {
    id: 1,
    imagePath: 'assets/images/customers/customer-1.svg',
    customerName: "Nkanyesi Shobe",
    customerEmail: "nkanyi@beamlight.com",
    customerPhoneNumber: "0112004000",
    companyName: "BeamLight Corp",
    companyVATNumber: "400080000",
    companyPhysicalAddress: "100 Mandela Drive, Brynston, Sandton, 2100",
    customerType: "Business;"
  },
  {
    id: 2,
    imagePath: 'assets/images/customers/customer-2.svg',
    customerName: "Linah Kgomo",
    customerEmail: "linah@ballnet.com",
    customerPhoneNumber: "0215557000",
    companyName: "BallNet",
    companyVATNumber: "555000555",
    companyPhysicalAddress: "222 Peter Mokaba str, Century Ciry, Cape town, 6065",
    customerType: "Business"
  },
  {
    id: 3,
    imagePath: 'assets/images/customers/customer-3.svg',
    customerName: "Donald Cow",
    customerEmail: "donald@Stonecorp.com",
    customerPhoneNumber: "0120005555",
    companyName: "Stone Corp",
    companyVATNumber: "7000011",
    companyPhysicalAddress: "501 Main str, Sunnyside, Pretoria, 8000",
    customerType: "Business"
  },
  {
    id: 4,
    imagePath: 'assets/images/customers/customer-4.svg',
    customerName: "Thiko Stati",
    customerEmail: "thiko@newtech.com",
    customerPhoneNumber: "0119997000",
    companyName: "New Tech",
    companyVATNumber: "88800000",
    companyPhysicalAddress: "900 main str, newtown, Johannesburg, 9000",
    customerType: "Business"
  },
  
];

export interface Item {
  stockCode: string;
  description: string;
  qty: string;
  unitPrice: string;
  vat: string;
  totalPrice: string;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppCustomersComponent {
  displayedColumns: string[] = ['name', 'role', 'email', 'phone'];
  dataSource = ELEMENT_DATA;
 
  total = {
    totalPriceExcl: "120000",
    totalVat: "1200",
    totalPriceDiscount: "0",
    totalPriceInclusive: "121200"
  };

  tableInvoiceData: Item[] = [
    {
      stockCode: "SPT-1099",
      description: "Float plant velve",
      qty: "10",
      unitPrice: "120000",
      vat: "0",
      totalPrice: "1200000",
    },
    {
      stockCode: "DTG-1099",
      description: "Water pump",
      qty: "1",
      unitPrice: "660000",
      vat: "0",
      totalPrice: "660000",
    },
    {
      stockCode: "HDH-1099",
      description: "Saculent hinge for water pump holder",
      qty: "1",
      unitPrice: "4500",
      vat: "0",
      totalPrice: "45000",
    },
    {
      stockCode: "SPT-1099",
      description: "Float plant velve",
      qty: "10",
      unitPrice: "120000",
      vat: "0",
      totalPrice: "1200000",
    }, 
  ];

  constructor() {
    // sales overview chart
  }
  
  convetToPDF() {
    var data = document.getElementById('contentToConvert');
      html2canvas((data as any)).then(canvas => {
      // Few necessary setting options
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save('new-file.pdf'); // Generated PDF
      });
  }

}
