import Paciente from "../models/Paciente";

export const agregarPaciente = async (req, res) => {
  const paciente = new Paciente(req.body);
  paciente.veterinario = req.veterinario._id;

  try {
    paciente.save();

    res.json({
      error: false,
      msg: "Paciente registrado correctamente.",
      paciente,
    });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerPacientes = async (req, res) => {};

// export const agregarPaciente = async (req, res) => {}
