import { ApiError } from "../utils/ApiError";
import e, { Request,Response,NextFunction } from "express";
import { ValidationError, UniqueConstraintError, ForeignKeyConstraintError} from "sequelize";

const errorHandle = (err: Error, req: Request, res:Response, next: NextFunction) => {

    if(err instanceof ApiError){
        res.status(err.statusCode).json({message: err.message});
        return;
    }

    if( err instanceof ValidationError){
        res.status(400).json({
            message: "Datos no validos",
            error: err.errors.map((e)=> e.message),
        });
        return;
    }

    if(err instanceof UniqueConstraintError){
        res.status(400).json({
            message: "Ya existe un registro con esos datos",
            error: err.errors.map((e)=> e.message),
        });
        return;
    }

    if(err instanceof ForeignKeyConstraintError){
        res.status(400).json({
            message: "El categoryId seleccionado no existe"
        });
        return;
    }

    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
}

export {errorHandle};