import Paciente from "../models/Paciente";

export const agregarPaciente = async (req, res) => {
  const paciente = new Paciente(req.body);
  paciente.veterinario = req.veterinario._id;

  try {
    const pacienteRegistrado = await paciente.save();

    res.json({
      error: false,
      msg: "Paciente registrado correctamente.",
      data: pacienteRegistrado,
    });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerPacientes = async (req, res) => {
  const pacientes = await Paciente.find({ veterinario: req.veterinario._id });

  res.json({
    error: false,
    msg: "",
    data: pacientes,
  });
};

export const obtenerPaciente = async (req, res) => {
  const { id } = req.params;

  const paciente = await Paciente.findById(id);

  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.status(401).json({
      error: true,
      msg: "No estas autorizado para esta accion.",
    });
  }

  if (paciente) {
    res.json({
      error: false,
      msg: "",
      data: paciente,
    });
  } else {
    return res.status(404).json({
      error: true,
      msg: "Paciente no encontrado.",
    });
  }
};

export const actualizarPaciente = async (req, res) => {};

export const eliminarPaciente = async (req, res) => {};

// export const agregarPaciente = async (req, res) => {}
