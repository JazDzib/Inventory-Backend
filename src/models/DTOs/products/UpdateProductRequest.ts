import { CategoryEnum } from "../../Enum/CategoryEnum";

export interface UpdateProductRequest {
    id: number;
    name: string;
    quantity: number;
    price: number;
    supplier: CategoryEnum; 
    categoryId: number;
}