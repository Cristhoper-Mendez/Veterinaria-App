import { Router } from "express";
const router = Router();

import {
  registrar,
  perfil,
  confirmar,
} from "../controllers/veterinarioController";

router.post("/", registrar);
router.get("/perfil", perfil);
router.get("/confirmar/:token", confirmar);

export default router;
