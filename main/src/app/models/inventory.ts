export interface Inventory {
    id: string; 
    photo: string;
    stockCode: string; 
    description: string;
    quantity: string;
    unitPrice: string;
    name: string;
    createdOn?: string;
    createdBy?: string; 
    updatedOn?: string;
    updatedBy?: string;
}