import { Company } from "./company";
import { Customer } from "./customer";
import { Inventory } from "./inventory";
import { SalesOrder } from "./sales-order";

export interface Invoice {
  _id?: string;
  invoiceNo: string;
  invoiceDate: Date;
  invoiceDueDate: Date;
  invoiceTerm: string | number;
  customer: Customer;
  company: Company;
  
  totalPriceExclusive: number;
  totalVAT: number;
  totalPriceDiscount: number;
  totalPriceInclusive: number;

  quote: any;
  hasSalesOrder: boolean;
  salesOrder?: any,
  createdOn?: Date;
  createdBy?: string; 
  updatedOn?: Date;
  updatedBy?: string;
  } 
  