import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import clienteAxios from "../../config/axios";

import Alerta from "../../components/Alerta";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const { token } = useParams();

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);

        setAlerta({
          msg: "Coloca tu nuevo password",
          error: false,
        });
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: "Hubo un error con el enlace",
          error: true,
        });
      }
    };

    comprobarToken();
  }, []);

  const { msg } = alerta;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return setAlerta({
        msg: "El password debe tener al menos 6 caracteres",
        error: true,
      });
    }

    if (password !== confirmarPassword) {
      return setAlerta({
        msg: "Los passwords deben ser iguales",
        error: true,
      });
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;

      const { data } = await clienteAxios.post(url, { password });

      setPasswordModificado(true);

      setAlerta({
        msg: data.msg,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Restablece tu Password y no Pierdas Acceso {""}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}

        {tokenValido && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Nuevo Password
                </label>
                <input
                  type="password"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  placeholder="Tu password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label className="uppercase text-gray-600 block text-xl font-bold">
                  Confirma tu Password
                </label>
                <input
                  type="password"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  placeholder="Tu password"
                  value={confirmarPassword}
                  onChange={(e) => setConfirmarPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Guardar nuevo password"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              />
            </form>
            {passwordModificado && (
              <nav className="mt-10 lg:flex lg:justify-between">
                <Link to="/" className="block text-center my-5 text-gray-500">
                  Iniciar sesion
                </Link>
              </nav>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default NuevoPassword;
