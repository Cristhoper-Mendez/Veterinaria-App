import { Router } from "express";
const router = Router();

import {
  registrar,
  perfil,
  confirmar,
  autenticar,
} from "../controllers/veterinarioController";

router.post("/", registrar);
router.get("/perfil", perfil);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);

export default router;
