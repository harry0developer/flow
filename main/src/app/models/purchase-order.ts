import { Company } from "./company";
import { Customer } from "./customer";
import { Invoice } from "./invoice";
import { Quote } from "./quote";
import { SalesOrder } from "./sales-order";

export interface PurchaseOrder {
    _id?: string;
    purchaseOrderNo: string;
    purchaseOrderDate: string;
    customer: Customer;
    company: Company;
    quote?: Quote | string;
    salesOrder?: SalesOrder | string;
    Invoice?: Invoice | String;

    totalPriceExclusive: number;
    totalVAT: number;
    totalPriceDiscount: number;
    totalPriceInclusive: number;

    
    createdOn?: Date;
    createdBy?: string; 
    updatedOn?: Date;
    updatedBy?: string;
}