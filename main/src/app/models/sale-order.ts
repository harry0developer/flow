import { Company } from "./company";
import { Customer } from "./customer";
import { Invoice } from "./invoice";
import { Quote } from "./quote";

export interface SalesOrder {
    _id?: string;
    salesOrderNo: string;
    salesOrderDate: Date;
    customer: Customer;
    company: Company;
    quote: Quote;
    invoice: Invoice;
    createdOn?: Date;
    createdBy?: any;
    updatedOn?: Date;
    updatedBy?: string;
}