import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layout/AuthLayout";
import ConfirmarCuenta from "./pages/Auth/ConfirmarCuenta";
import Login from "./pages/Auth/Login";
import OlvidePassword from "./pages/Auth/OlvidePassword";
import Registrar from "./pages/Auth/Registrar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="confirmar-cuenta/:id" element={<ConfirmarCuenta />} />
          <Route path="olvide-password" element={<OlvidePassword />} />
          <Route path="registrar" element={<Registrar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
