
import { CategoryEnum } from "../../Enum/CategoryEnum";

export interface CreateProductResponse {
    id: number;
    name: string;
    quantity: number;
    price: number;
    supplier: CategoryEnum; 
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
}