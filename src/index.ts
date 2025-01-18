import express from "express";
import { Request, Response } from "express";
import { ENV_VARS } from "./configs";
const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response)=>{
    res.status(200).json({
        message: "Hello Kumar",
    });
});


const PORT = ENV_VARS.PORT;
app.listen(PORT, ()=> {
    console.log(`Server is running on: http://localhost:${PORT}`);
    
})