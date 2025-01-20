import mongoose from "mongoose";
import { ENV_VARS } from "../configs/configs";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
        console.log("mongodb connected: ", conn.connection.host);
    } catch (error) {
        console.log("Error connecting to mongoDB: ", error);
        process.exit(1);
    }
};