export interface PaginatedProduct <T>{
    totalProducts: number;
    pages: number;
    currentPage: number;
    data: T[];
}