import { Router } from "express";
const router = Router();

import {
  agregarPaciente,
  obtenerPacientes,
} from "../controllers/pacienteController";

router.route("/").post(agregarPaciente).get(obtenerPacientes);

export default router;
