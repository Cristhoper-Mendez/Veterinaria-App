import { Router } from "express";
const router = Router();

import {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from "../controllers/pacienteController";

import checkAuth from "../middlewares/authMiddleware";

router
  .route("/")
  .post(checkAuth, agregarPaciente)
  .get(checkAuth, obtenerPacientes);

router
  .route("/:id")
  .get(checkAuth, obtenerPaciente)
  .put(checkAuth, actualizarPaciente)
  .delete(checkAuth, eliminarPaciente);

export default router;
