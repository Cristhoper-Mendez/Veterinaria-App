import Veterinario from "../models/Veterinario";
import generarJWT from "../helpers/generarJWT";

export const registrar = async (req, res) => {
  const { body } = req;
  const { email } = body;

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
  res.send("Tu perfil");
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
