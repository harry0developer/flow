export interface User  {
  _id?: string;
  profilePhoto?: string;
  firstName: string;
  lastName: string;
  gender: string;
  title: string;
  idNumber: string;
  email: string;
  phone: string;
  role: string;
  physicalAddress: string;
  username: string;
  password: string;
  createdOn?: string;
  createdBy?: string; 
  updatedOn?: string;
  updatedBy?: string;
}