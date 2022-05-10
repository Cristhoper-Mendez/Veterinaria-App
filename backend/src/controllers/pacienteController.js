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

// export const agregarPaciente = async (req, res) => {}
