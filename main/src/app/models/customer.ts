export interface Customer {
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
  contactPerson: ContactPerson,
  createdOn?: Date;
  createdBy?: string; 
  updatedOn?: Date;
  updatedBy?: string;
}  

export interface ContactPerson {
  title: string;
  gender: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
}