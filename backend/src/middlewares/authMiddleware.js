import jwt from "jsonwebtoken";

import Veterinario from "../models/Veterinario";

const checkAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    try {
      const splitedToken = token.split(" ")[1];

      const decoded = jwt.verify(splitedToken, process.env.SECRET);

      req.veterinario = await Veterinario.findById(decoded._id).select(
        "-password -token -confirmado"
      );

      return next();
    } catch (error) {
      const e = new Error("Token invalido");
      res.status(401).json({
        msg: e.message,
      });
    }
  }

  if (!token) {
    const error = new Error("Token invalido o inexistente");
    return res.status(401).json({
      msg: error.message,
    });
  }
};

export default checkAuth;
