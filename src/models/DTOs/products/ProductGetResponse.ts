
import { Category } from "../../category";
import { CategoryEnum } from "../../Enum/CategoryEnum";

export interface ProductGetResponse {
    id: number;
    name: string;
    quantity: number;
    price: number;
    supplier: CategoryEnum; 
    categoryId: number;
    category?: Category;
}