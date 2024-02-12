import { Company } from "./company";
import { Customer } from "./customer";
import { Invoice } from "./invoice";
import { PurchaseOrder } from "./purchase-order";
import { Quote } from "./quote";
import { User } from "./user";

export interface SalesOrder {
    _id?: string;
    salesOrderNo: string;
    salesOrderDate: Date;
    customer: Customer;
    company: Company;
    quote?: Quote | any;
    purchaseOrder?: PurchaseOrder | string;
    hasPurchaseOrder: boolean;
    createdOn?: Date;
    createdBy?: User | any; 
    updatedOn?: Date;
    updatedBy?: User | any;
}