import { Category, Product } from "../models";
import { CreateCategoryRequest } from "../models/DTOs/category/CreateCategoryRequest";
import { CreateCategoryResponse } from "../models/DTOs/category/CreateCategoryResponse";
import { GetCategoryResponse } from "../models/DTOs/category/GetCategoryResponse";
import { UpdateCategoryRequest } from "../models/DTOs/category/UpdateCategoryRequest";
import { UpdateCategoryResponse } from "../models/DTOs/category/UpdateCategoryResponse";
import { ApiError } from "../utils/ApiError";

const getCategories = async (): Promise <GetCategoryResponse[]> => {
    const categories = await Category.findAll({ order: [["name", "ASC"]] });

    return categories.map((category)=> ({
        id: category.id,
        name: category.name,
        createAt: category.createdAt
    }));
};

const getById = async (id:number): Promise <GetCategoryResponse>  => {
    const category = await Category.findByPk(id);
    if(!category){
        throw new ApiError(404, 'No se encontro el id')
    }

    return{
        id: category.id,
        name: category.name,
        createAt: category.createdAt
    }
}

const createCategories = async (data: CreateCategoryRequest): Promise<CreateCategoryResponse>  => {
    const category =  await Category.create({
        name: data.name
    });

    return{
        id: category.id,
        name: category.name,
        createdAt: category.createdAt
    }
}

const updateCategories = async (id: number, data:UpdateCategoryRequest): Promise <UpdateCategoryResponse>  => {
    const category = await Category.findByPk(id);
    if(!category){
        throw new ApiError(404, 'no se encontro el id');
    }

    await category.update(data);

    return{
        id: category.id,
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
    }
}

const deleteCategories = async (id: number)  => {
    const category = await Category.findByPk(id);

    if (!category){ throw new ApiError(404, 'no se encontro el id')};

    const products = await countProductByCategory(id);
    if (products > 0){
        throw new ApiError(409, 'No se puede eliminar categorias asociadas con productos');
    }

    await category.destroy();
    
}

const countProductByCategory = async (categoryId: number): Promise<number> => {
    const count = await Product.count({where: {categoryId: categoryId}});
    return count;
}

export {getCategories, getById, createCategories, updateCategories, deleteCategories}