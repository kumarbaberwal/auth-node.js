import { Request, Response, Router } from "express";
import { register } from "../controllers/authControllers";

const router = Router();

router.post('/register', register);


export default router;