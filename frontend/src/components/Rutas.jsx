import React from "react";

import { Routes, Route } from "react-router-dom";

// Layouts
import AuthLayout from "../layout/AuthLayout";
import RutaProtegida from "../layout/RutaProtegida";

// Auth
import ConfirmarCuenta from "../pages/Auth/ConfirmarCuenta";
import Login from "../pages/Auth/Login";
import OlvidePassword from "../pages/Auth/OlvidePassword";
import Registrar from "../pages/Auth/Registrar";
import NuevoPassword from "../pages/Auth/NuevoPassword";

// Administration
import AdministrarPacientes from "../pages/Pacientes/AdministrarPacientes";

const Rutas = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="confirmar-cuenta/:id" element={<ConfirmarCuenta />} />
          <Route path="olvide-password" element={<OlvidePassword />} />
          <Route path="olvide-password/:token" element={<NuevoPassword />} />
          <Route path="registrar" element={<Registrar />} />
        </Route>

        <Route path="/admin" element={<RutaProtegida />}>
          <Route index element={<AdministrarPacientes />} />
        </Route>
      </Routes>
    </>
  );
};

export default Rutas;
