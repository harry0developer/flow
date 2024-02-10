import { Company } from "./company";
import { Customer } from "./customer";
import { Inventory } from "./inventory";
import { Invoice } from "./invoice";
import { SalesOrder } from "./sales-order";

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

  hasSalesOrder: boolean;
  salesOrder?: SalesOrder | string,
  createdOn?: Date;
  createdBy?: string; 
  updatedOn?: Date;
  updatedBy?: string;
  } 
  