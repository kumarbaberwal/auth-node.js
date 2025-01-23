import dotenv from "dotenv";
dotenv.config();

export const ENV_VARS = {
    PORT: process.env.PORT || 6000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/auth",
    JWT_SECRET: process.env.JWT_SECRET || "myapp",
};