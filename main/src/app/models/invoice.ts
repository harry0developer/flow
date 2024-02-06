import { Company } from "./company";
import { Customer } from "./customer";
import { Inventory } from "./inventory";

export interface Invoice {
  _id?: string;
  invoiceNo: string;
  invoiceDate: Date;
  invoiceDueDate: Date;
  invoiceTerm: string | number;
  customer: Customer;
  company: Company;
  items: Inventory[],
  totalPriceExclusive: number;
  totalVAT: number;
  totalPriceDiscount: number;
  totalPriceInclusive: number;
  quote: string | undefined;
  createdOn?: Date;
  createdBy?: string; 
  updatedOn?: Date;
  updatedBy?: string;
  } 
  