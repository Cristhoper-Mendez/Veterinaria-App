import Veterinario from "../models/Veterinario";
import generarJWT from "../helpers/generarJWT";
import generarId from "../helpers/generarId";
import registro from "../helpers/email/emailRegistro";
import emailOlvidePassword from "../helpers/email/emailOlvidePassword";

export const registrar = async (req, res) => {
  const { body } = req;
  const { email, nombre } = body;

  // Verificar si el usuario ya esta registrado
  const existeUsuario = await Veterinario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("El usuario ya esta registrado.");
    return res.status(400).json({
      error: true,
      msg: error.message,
    });
  }

  try {
    // Guardar nuevo veterinario
    const veterinario = new Veterinario(body);

    const veterinarioGuardado = await veterinario.save();

    // Enviar email
    registro({
      email,
      nombre,
      token: veterinarioGuardado.token,
    });

    res.status(201).json({
      error: false,
      msg: "Usuario guardado correctamente.",
      data: veterinarioGuardado,
    });
  } catch (error) {
    console.log(error);
  }
};

export const perfil = async (req, res) => {
  try {
    const veterinario = await Veterinario.findById(req.veterinario._id);

    res.status(201).json({
      error: false,
      veterinario,
    });
  } catch (error) {
    console.log(error);
  }
};

export const confirmar = async (req, res) => {
  const { token } = req.params;

  try {
    const usuarioConfirmar = await Veterinario.findOne({ token });

    if (!usuarioConfirmar) {
      const error = new Error("Token no valido");

      return res.status(404).json({
        error: true,
        msg: error.message,
      });
    }

    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;

    usuarioConfirmar.save();

    return res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export const autenticar = async (req, res) => {
  const { password, email } = req.body;

  // Comprobar si el usuario existe
  const usuario = await Veterinario.findOne({ email });

  if (!usuario) {
    const error = new Error("El usuario no fue encontrado.");

    return res.status(403).json({
      error: true,
      msg: error.message,
    });
  }

  // Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no esta confirmada.");

    return res.status(403).json({
      error: true,
      msg: error.message,
    });
  }

  // Revisar el password
  if (await usuario.comprobarPassword(password)) {
    return res.json({
      error: false,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("Usuario o contraseña incorrectos.");

    return res.status(403).json({
      error: true,
      msg: error.message,
    });
  }
};

export const olvidePassword = async (req, res) => {
  const { email } = req.body;

  const existeVeterinario = await Veterinario.findOne({ email });

  if (!existeVeterinario) {
    const error = new Error("El usuario no existe");

    return res.status(404).json({
      msg: error.message,
    });
  }

  try {
    existeVeterinario.token = generarId();

    await existeVeterinario.save();

    // Enviar email con instrucciones
    emailOlvidePassword({
      email,
      nombre: existeVeterinario.nombre,
      token: existeVeterinario.token,
    });

    res.json({
      msg: "Hemos enviado un email con las instrucciones.",
    });
  } catch (error) {}

  console.log(email);
};

export const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await Veterinario.findOne({ token });

  if (tokenValido) {
    res.json({
      msg: "Token valido y el usuario existe.",
    });
  } else {
    const error = new Error("El token no es valido.");

    return res.status(404).json({
      msg: error.message,
    });
  }
};

export const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const veterinario = await Veterinario.findOne({ token });

  if (!veterinario) {
    const error = new Error("Ups! Ocurrio un error.");

    return res.status(404).json({
      msg: error.message,
    });
  }

  try {
    veterinario.token = null;
    veterinario.password = password;

    await veterinario.save();

    return res.json({
      msg: "Password modificado correctamente.",
    });
  } catch (error) {
    console.log(error);
  }
};
