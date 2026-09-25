import { Request, Response, NextFunction } from "express";
import { createCategories, deleteCategories, getById, getCategories, updateCategories } from "../services/categoryService";
import { Category } from "../models";
import { ApiError } from "../utils/ApiError";

const getAll = async ( req: Request, res: Response, next: NextFunction) => { 
    try {
        const categoryData = await getCategories();
        res.send(categoryData);
    } catch (error) {
        next(error);
    }
}

const getOne = async ( req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);

        if(!id || Number.isNaN(id)){
            throw new ApiError(400, 'El id no es valido')
        }

        const categoryData = await getById(id);
        res.send(categoryData);
    } catch (error) {
        next(error);
    }
}

const create = async ( req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryData = await createCategories(req.body);
        res.status(201).send(categoryData);
    } catch (error) {
        next(error);
    }
}

const update = async ( req: Request, res: Response, next: NextFunction) => {
    try {
        const  id = Number(req.params.id);
        if(!id || Number.isNaN(id)){
            throw new ApiError(400, 'El id no es valido')
        }

        const categoryData = await updateCategories(id, req.body);
        res.status(200).send(categoryData);
    } catch (error) {
        next(error);
    }
}

const remove = async ( req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        if(!id || Number.isNaN(id)){
            throw new ApiError(400, 'El id no es valido')
        }

        await deleteCategories(id);
        res.status(200).json({message: "categoria eliminada"});
    } catch (error) {
        next(error);
    }
}

export{getAll, getOne, create, update, remove}