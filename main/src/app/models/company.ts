export interface Company {
    id: string;
    logo: string; 
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
    createdOn?: string;
    createdBy?: string; 
    updatedOn?: string;
    updatedBy?: string;
  } 
   
  export interface BankDetails {
    bankName: string;
    accountNumber: string;
    branchCode: string;
  }
  
  export interface ContactPerson {
    title: string;
    gender: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    nationality?: string;
  }