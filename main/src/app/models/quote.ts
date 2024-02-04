import { Company } from "./company";
import { Customer } from "./customer";
import { Inventory } from "./inventory";

export interface Quote {
  _id?: string;
  quoteNo: string;
  quoteDate: Date;
  quoteStartDate: Date;
  quoteDueDate: Date;
  quoteTerm: number;
  customer: Customer;
  company: Company;
  items: Inventory[],
  totalPriceExclusive: number;
  totalVAT: number;
  totalPriceDiscount: number;
  totalPriceInclusive: number;
  createdOn?: Date;
  createdBy?: string; 
  updatedOn?: Date;
  updatedBy?: string;
  } 
  