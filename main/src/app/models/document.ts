import { Company } from "./company";
import { Quote } from "./quote";

export interface Document {
    quote: Quote;
    company: Company;
}