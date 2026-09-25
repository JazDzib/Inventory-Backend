import { Category, Product } from "../models";
import { PaginatedProduct } from "../models/DTOs/utils/PaginatedProduct";
import { ProductGetResponse } from "../models/DTOs/products/ProductGetResponse";
import { CreateProductRequest } from "../models/DTOs/products/CreateProductRequest";
import { CreateProductResponse } from "../models/DTOs/products/CreateProductResponse";
import { UpdateProductRequest } from "../models/DTOs/products/UpdateProductRequest";
import { UpdateProductResponse } from "../models/DTOs/products/UpdateProductResponse";
import { ApiError } from "../utils/ApiError";


const getPageProduct= async(page: number, limit: number): Promise <PaginatedProduct<ProductGetResponse>> => {
    const offset = (page - 1 ) * limit;
    const {rows, count} = await Product.findAndCountAll({
        include: [{ model: Category, as: "category" }], 
        limit,
        offset,
        order: [["name","ASC"]]
    });

    const data: ProductGetResponse[] = rows.map(product =>({
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        supplier: product.supplier,
        categoryId: product.categoryId,
        category: product.category
        
    }));

    return { 
        totalProducts: count,
        pages: Math.ceil(count / limit),
        currentPage: page,
        data
    };
}

const getById = async(id: number): Promise<ProductGetResponse> => {
    const product = await Product.findByPk(id);

    if(!product){ throw new ApiError(404, `Producto con id ${id} no encontrado`)};

    return{
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        supplier: product.supplier,
        categoryId: product.categoryId,
        category: product.category
    }
}

const createProduct = async (data:CreateProductRequest): Promise<CreateProductResponse | null > => {
    const category = await Category.findByPk(data.categoryId);
    if(!category){
        throw new ApiError(400,  `La categoría con id ${data.categoryId} no existe`)
    }
    const product = await Product.create({
        name: data.name,
        quantity: data.quantity,
        price: data.price,
        supplier: data.supplier,
        categoryId: data.categoryId
    });

    if(!product){return null;}

    return{
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        supplier:product.supplier,
        categoryId: product.categoryId,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
    }
}

const updateProduct = async (id: number, data: UpdateProductRequest): Promise <UpdateProductResponse> =>{
    const product = await Product.findByPk(id);

    if(!product){ throw new ApiError(404,`Producto con id ${id} no encontrado`)};

    if(data.categoryId !== undefined){
        const category = await Category.findByPk(data.categoryId);
        if(!category){ throw new ApiError(400, `La categoría con id ${data.categoryId} no existe`)}
    }

    await product.update(data);

    return{
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        supplier:product.supplier,
        categoryId: product.categoryId,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
    }


}

const deleteProduct = async (id: number) => {
    const product = await Product.findByPk(id);
    if(!product){ throw new ApiError(404, `Producto con id ${id} no encontrado`)}

    await product.destroy();

}

export {getPageProduct,getById, createProduct, updateProduct, deleteProduct}