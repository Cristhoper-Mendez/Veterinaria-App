import jwt from "jsonwebtoken";

const generarJWT = (_id) => {
  const key = process.env.SECRET;

  return jwt.sign(
    {
      _id,
    },
    key,
    {
      expiresIn: "30d",
    }
  );
};

export default generarJWT;
