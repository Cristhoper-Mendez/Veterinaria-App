import React from "react";

import Formulario from "../../components/Pacientes/Formulario";
import ListaPacientes from "../../components/Pacientes/ListaPacientes";

const AdministrarPacientes = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 lg:-2/5">
          <Formulario />
        </div>
        <div className="md:w-1/2 lg:-2/5">
          <ListaPacientes />
        </div>
      </div>
    </>
  );
};

export default AdministrarPacientes;
