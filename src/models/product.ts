import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";
import type { Category } from "./category";
import { CategoryEnum } from "./Enum/CategoryEnum";

export class Product extends Model{
    declare id: number;
    declare name: string;
    declare quantity: number;
    declare price: number;
    declare supplier:CategoryEnum;
    declare categoryId: number;
    declare category?: Category;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Product.init({
    id:{
        type:DataTypes.INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull:false,
        validate:{
            notEmpty:{msg:"El nombre no puede estar vacio"},
            len:{ args:[1,100], msg: "El nombre debe tener un maximo de 100 caracteres"}
        }
    },
    quantity:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
         validate: { 
            min: { args: [0], msg: "La cantidad no puede ser negativa" } 
        },
    },
    price:{
        type:DataTypes.DECIMAL(10, 2),
        allowNull:false,
         get() {                                   // ← aquí, UNA vez
            const value = this.getDataValue("price");
            return value === null ? null : Number(value);
        },
        validate: { 
            min: { args: [0.01], msg: "El precio debe ser mayor a 0" } 
        },
    },
    supplier:{
        type: DataTypes.ENUM(...Object.values(CategoryEnum)),
        allowNull:true
    },
    categoryId:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        references:{
            model:"categories",
            key: "id"
        },
        onDelete: "RESTRICT"   
    }
},
{
    sequelize, 
    modelName:"Product",
    tableName:"products",
    underscored: true 
}
);