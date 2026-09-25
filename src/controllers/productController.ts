import { Request, Response, NextFunction } from "express";
import { Product, Category } from "../models";
import { ApiError } from "../utils/ApiError";
import { getPageProduct, createProduct, updateProduct, deleteProduct, getById} from "../services/productService";

const getAll = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const productData = await getPageProduct(page, limit);
        res.send(productData);
    }catch(error){
        next(error)
    }

}

const getOne = async( req:Request, res: Response, next:NextFunction) => {
    try {
        const id = Number(req.params.id);
        if(!id|| Number.isNaN(id)){
            throw new ApiError(400, "El id no es valido");
        }
        const productData = await getById(id);
        res.send(productData);
    } catch (error) {
        next(error);
    }
}

const create = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const productData = await createProduct(req.body);
        res.status(201).send(productData);
        
    } catch (error) {
        next(error)
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);

        if(!id|| Number.isNaN(id)){
            throw new ApiError(400, "El id no es valido");
        }

        const productData = await updateProduct(id, req.body);
        res.status(200).send(productData);
    } catch (error) {
        next(error)
    }
}

const remove = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const id = Number(req.params.id);
        if(!id|| Number.isNaN(id)){
            throw new ApiError(400, "El id no es valido");
        }
        await deleteProduct(id);
        res.status(200).json({message: "producto eliminado"});

    } catch (error) {
        next(error);
    }
}

export {getAll,getOne, create, update, remove}