import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context
import { AuthProvider } from "./Context/AuthProvider";

import Rutas from "./components/Rutas";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Rutas />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
