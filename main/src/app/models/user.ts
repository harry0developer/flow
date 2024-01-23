export interface User  {
  id: string;
  profilePhoto?: string;
  firstName: string;
  lastName: string;
  gender: string;
  title: string;
  idNo: string;
  email: string;
  phone: string;
  role: string;
  physicalAddress: string;
  createdOn?: string;
  createdBy?: string; 
  updatedOn?: string;
  updatedBy?: string;
}