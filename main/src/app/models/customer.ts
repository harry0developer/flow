export interface Customer {
  id: string;
  url: string;
  type: string;
  name: string;
  VATNumber: string;
  registrationNumber: string;
  billingAddress: string;
  shippingAddress: string;
  website?: string;
  phoneNumber: string;
  emailAddress: string;
  contactPerson: ContactPerson,
  bankDetails: BankDetails,
  dateCreated?: string;
  createdBy?: string; 
  updatedOn?: string;
  updatedBy?: string;
} 
 
export interface BankDetails {
  accountNumber: string;
  branchCode: string;
  branchName: string;
}

export interface ContactPerson {
  title: string;
  gender: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
}