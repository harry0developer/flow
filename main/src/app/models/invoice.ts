import { Company } from "./company";
import { Customer } from "./customer";
import { Inventory } from "./inventory";
import { PurchaseOrder } from "./purchase-order";
import { Quote } from "./quote";
import { SalesOrder } from "./sales-order";

export interface Invoice {
  _id?: string;
  invoiceNo: string;
  invoiceDate: Date;
  customer: Customer;
  company: Company;
  quote: Quote;
  salesOrder: SalesOrder;
  purchaseOrder: PurchaseOrder | string;
  paid: boolean;

  createdOn?: Date;
  createdBy?: string; 
  updatedOn?: Date;
  updatedBy?: string;
  } 
  