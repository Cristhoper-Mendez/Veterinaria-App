import { useContext } from "react";
import PacientesProvider from "../Context/PacientesProvider";

const usePacientes = () => {
  return useContext(PacientesProvider);
};

export default usePacientes;
