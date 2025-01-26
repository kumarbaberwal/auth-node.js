import { Request, Response, Router } from "express";
import { fetchUser, login, register } from "../controllers/authControllers";
import { veryfyToken } from "../middlewares/authMiddleware";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/fetch-user', veryfyToken, fetchUser);


export default router;