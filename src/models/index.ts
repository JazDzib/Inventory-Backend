import { Category } from "./category";
import { Product } from "./product";

Category.hasMany(Product,{
    foreignKey: "categoryId"
});

Product.belongsTo(Category,{
    foreignKey: "categoryId"
});

export{Category, Product};