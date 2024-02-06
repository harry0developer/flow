import { Company } from "./company";
import { Customer } from "./customer";
import { Inventory } from "./inventory";
import { Invoice } from "./invoice";

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
  invoiced: boolean;
  invoice?: Invoice | string,
  createdOn?: Date;
  createdBy?: string; 
  updatedOn?: Date;
  updatedBy?: string;
  } 
  