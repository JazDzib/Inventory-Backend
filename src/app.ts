import  express, {Request, Response} from "express";
import cors from  "cors";
import { initDb } from "./database/sequelize";
import "./models/index"; 

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


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