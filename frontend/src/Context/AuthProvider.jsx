import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

import clienteAxios from "../config/axios";

const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios(`/veterinarios/perfil`, config);

        setAuth(data.profile);
      } catch (error) {
        console.log(error.response.data.msg);
      }

      setCargando(false);
    };

    autenticarUsuario();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        cargando,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
