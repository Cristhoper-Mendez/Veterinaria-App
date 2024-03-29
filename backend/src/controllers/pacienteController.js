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

  if (!paciente) {
    return res.status(404).json({
      error: true,
      msg: "Paciente no encontrado.",
    });
  }

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
  }
};

export const actualizarPaciente = async (req, res) => {
  const { id } = req.params;

  const paciente = await Paciente.findById(id);

  if (!paciente) {
    return res.status(404).json({
      error: true,
      msg: "Paciente no encontrado.",
    });
  }

  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.status(401).json({
      error: true,
      msg: "No estas autorizado para esta accion.",
    });
  }

  paciente.nombre = req.body.nombre || paciente.nombre;
  paciente.propietario = req.body.propietario || paciente.propietario;
  paciente.email = req.body.email || paciente.email;
  paciente.fecha = req.body.fecha || paciente.fecha;
  paciente.sintomas = req.body.sintomas || paciente.sintomas;

  try {
    const pacienteActualizado = await paciente.save();

    res.json({
      error: false,
      msg: "Paciente actualizado correctamente.",
      data: pacienteActualizado,
    });
  } catch (error) {
    console.log(error);
  }
};

export const eliminarPaciente = async (req, res) => {
  const { id } = req.params;

  const paciente = await Paciente.findById(id);

  if (!paciente) {
    return res.status(404).json({
      error: true,
      msg: "Paciente no encontrado.",
    });
  }

  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    return res.status(401).json({
      error: true,
      msg: "No estas autorizado para esta accion.",
    });
  }

  try {
    await paciente.deleteOne();

    res.json({
      error: false,
      msg: "Paciente eliminado correctamente.",
    });
  } catch (error) {
    console.log(error);
  }
};

// export const agregarPaciente = async (req, res) => {}
