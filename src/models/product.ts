import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";
import type { Category } from "./category";

export class Product extends Model{
    public id!: number;
    public name!: string;
    public quantity!: number;
    public price!: number;
    public supplier!:Category;
    public categoryId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
        type:DataTypes.INTEGER,
        allowNull:false,
         validate: { 
            min: { args: [0], msg: "La cantidad no puede ser negativa" } 
        },
    },
    price:{
        type:DataTypes.DECIMAL,
        allowNull:false,
        validate: { 
            min: { args: [0.01], msg: "El precio debe ser mayor a 0" } 
        },
    },
    supplier:{
        type: DataTypes.ENUM("Electrónica", "Hogar", "Ferretería", "Ropa", "Alimentos", "Papelería"),
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