import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context
import { AuthProvider } from "./Context/AuthProvider";
import { PacientesProvider } from "./Context/PacientesProvider";

import Rutas from "./components/Rutas";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Rutas />
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
