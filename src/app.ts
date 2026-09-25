import  express, {Request, Response} from "express";
import cors from  "cors";
import { initDb } from "./database/sequelize";
import "./models/index"; 
import indexRoutes from "./routes/indexRoutes";
import { errorHandle } from "./middleware/errorHandle";


const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", indexRoutes);
app.use(errorHandle);


const main = async() => {
    try{
        await initDb();
        app.listen(PORT, () =>{
        console.log(` Start API en http://localhost:${PORT}`);
    });
    }catch(error){
        console.log('API error: ', error);
    }
}

main();