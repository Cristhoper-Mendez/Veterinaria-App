import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPacientes = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        if (!token) return;

        const { data } = await clienteAxios.get("/pacientes");

        if (data.error) {
          return;
        }

        setPacientes(data.data);
      } catch (error) {
        console.log(error.response.data.msg);
      } finally {
        setLoading(false);
      }
    };

    getPacientes();
  }, []);

  const postPaciente = async (paciente) => {
    try {
      setLoading(true);
      const { data } = await clienteAxios.post("/pacientes", paciente);

      const { createdAt, updatedAt, __v, ...pacienteA } = data;

      setPacientes([pacienteA, ...pacientes]);
    } catch (error) {
      console.log(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        loading,
        postPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;
