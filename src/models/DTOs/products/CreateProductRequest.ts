import { Category } from "../../category";
import { CategoryEnum } from "../../Enum/CategoryEnum";

export interface CreateProductRequest {
    name: string;
    quantity: number;
    price: number;
    supplier: CategoryEnum; 
    categoryId: number;
}