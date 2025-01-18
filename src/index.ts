import express from "express";
import bodyParser from "body-parser";
// import { json } from "body-parser"; another way of importing


const app = express();
// const json = bodyParser.json; another way of creating
app.use(bodyParser.json());