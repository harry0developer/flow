import { Customer } from "./customer";
import { Inventory } from "./inventory";

export interface Quote {
  id: string; 
  quoteNo: string;
  quoteDate: string;
  quoteDueDate: string;
  quoteTerm: string;
  customer: Customer;
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
  