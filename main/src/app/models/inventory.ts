export interface Inventory {
    _id?: string;
    name: string; 
    photo: string;
    stockCode: string; 
    description: string;
    quantity: number;
    costPrice: number;
    sellingPrice: number;
    discountPrice?: number;
    discountPercentage?: number;
    VAT?: number;
    createdOn?: Date;
    createdBy?: string; 
    updatedOn?: Date;
    updatedBy?: string;
}

export interface InventoryItem {
    id?: string;
    name: string; 
    photo: string;
    stockCode: string; 
    description: string;
    quantity: number;
    costPrice: number;
    sellingPrice: number;
    discountPrice?: number;
    discountPercentage?: number;
    VAT?: number;
}