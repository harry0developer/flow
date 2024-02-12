import { Company } from "./company";
import { Inventory } from "./inventory";
import { Quote } from "./quote";

export interface Document {
    quote: Quote;
    company: Company;
}

export interface DocumentData {
    title: string; //sales order, invoice
    reference: string; //quoteNo
    customerName: string;
    address: string;
    no: string;
    startDate: Date;
    term: string | null;
    dueDate: Date | null;
    items: Inventory[];
    totalPriceExclusive: number;
    totalVAT: number;
    totalPriceDiscount: number;
    totalPriceInclusive: number;

}