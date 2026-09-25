import { Category } from "./category";
import { Product } from "./product";

Category.hasMany(Product,{
    foreignKey: "categoryId",
    as:"products",
});

Product.belongsTo(Category,{
    foreignKey: "categoryId",
    as: "category"
});

export{Category, Product};