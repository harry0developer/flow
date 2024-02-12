import { Company } from "./company";
import { Customer } from "./customer";
import { Invoice } from "./invoice";
import { Quote } from "./quote";
import { SalesOrder } from "./sales-order";

export interface PurchaseOrder {
    _id?: string;
    purchaseOrderNo: string;
    purchaseOrderDate: Date;
    customer: Customer;
    company: Company;
    quote: Quote;
    salesOrder: SalesOrder | string;
    hasInvoice: boolean;
    invoice?: Invoice | String; 
    
    createdOn?: Date;
    createdBy?: string; 
    updatedOn?: Date;
    updatedBy?: string;
}