import { DataTypes, Model} from "sequelize";
import { sequelize } from "../database/sequelize";

export class Category extends Model{
    declare id: number;
    declare name:string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Category.init({
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull:false,
        unique:true
    },
},
{
    sequelize,
    modelName:"Category",
    tableName:"categories",
    underscored: true 
}
);

