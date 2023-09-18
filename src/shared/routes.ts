import { Router } from "express";
import authRoutes from "../modules/auths/routes/auth.routes";


const router = Router();


router.use("/auth", authRoutes);

export default router;
