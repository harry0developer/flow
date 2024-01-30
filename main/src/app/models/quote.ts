import { Company } from "./company";
import { Customer } from "./customer";
import { Inventory } from "./inventory";

export interface Quote {
  id: string; 
  quoteNo: string;
  quoteDate: string;
  quoteStartDate: string;
  quoteDueDate: string;
  quoteTerm: string;
  customer: Customer;
  company: Company;
  items: Inventory[],
  totalPriceExclusive: string;
  totalVAT: string;
  totalPriceDiscount: string;
  totalPriceInclusive: string;
  
  createdOn?: string;
  createdBy?: string; 
  updatedOn?: string;
  updatedBy?: string;
  } 
  