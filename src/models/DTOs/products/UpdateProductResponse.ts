import { CategoryEnum } from "../../Enum/CategoryEnum";

export interface UpdateProductResponse {
    id:number;
    name: string;
    quantity: number;
    price: number;
    supplier: CategoryEnum; 
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
}