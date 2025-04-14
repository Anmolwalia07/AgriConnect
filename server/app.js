import express from 'express';
import cors from "cors"
import mongoose from './database/db.js';
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import BuyerRoutes from "./routes/buyerRoutes.js"
import FarmerRoutes from "./routes/farmerRoutes.js"
import { authMiddlewareBuyer, authMiddlewareFarmer } from './middleWares/auth.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())




app.use(cookieParser())

app.get('/buyer/verify',authMiddlewareBuyer ,(req, res) => {
    res.status(200).json({message:"Valid "})
    }
);
app.get('/farmer/verify',authMiddlewareFarmer ,(req, res) => {
    res.status(200).json({message:"Valid "});
    }
);


app.use("/api/buyer",BuyerRoutes);
app.use("/api/farmer",FarmerRoutes);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});