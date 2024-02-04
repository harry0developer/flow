export interface Company {
  _id?: string;
    photo?: string; 
    name: string;
    VATNumber: string;
    registrationNumber: string;
    billingAddress: string;
    shippingAddress: string;
    website?: string;
    phoneNumber: string;
    emailAddress: string;
    contactPersonId: string,
    bankDetails: BankDetails,
    createdOn?: Date;
    createdBy?: string; 
    updatedOn?: Date;
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