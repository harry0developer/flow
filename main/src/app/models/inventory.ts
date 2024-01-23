export interface Inventory {
    id: string; 
    name: string; 
    photo: string;
    stockCode: string; 
    description: string;
    quantity: string;
    unitPrice: string;
    VAT?: string;
    createdOn?: string;
    createdBy?: string; 
    updatedOn?: string;
    updatedBy?: string;
}