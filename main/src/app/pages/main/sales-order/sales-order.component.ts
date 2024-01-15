import { Component, ViewEncapsulation, ViewChild } from '@angular/core'; 

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

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppSalesOrderComponent {
  displayedColumns: string[] = ['name', 'role', 'email', 'phone'];
  dataSource = ELEMENT_DATA;
  
  constructor() {
    // sales overview chart
     
  }
}
