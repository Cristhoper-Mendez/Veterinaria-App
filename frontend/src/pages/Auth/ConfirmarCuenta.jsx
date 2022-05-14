import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";

import Alerta from "../../components/Alerta";
const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [alerta, setAlerta] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `veterinarios/confirmar/${id}`;

        const { data } = await clienteAxios(url);

        setAlerta({
          error: false,
          msg: data.msg,
        });
        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          error: true,
          msg: error.response.data.msg,
        });
      }
      setCargando(false);
    };

    confirmarCuenta();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu Cuenta y Administra{""}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!cargando && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link to="/" className="block text-center my-5 text-gray-500">
            Iniciar sesion!
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
