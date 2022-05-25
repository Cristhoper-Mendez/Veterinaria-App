import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
  const {
    MAILER_HOST,
    MAILER_PORT,
    MAILER_USER,
    MAILER_PASSWORD,
    FRONTEND_URL,
  } = process.env;

  const transporter = nodemailer.createTransport({
    host: MAILER_HOST,
    port: MAILER_PORT,
    auth: {
      user: MAILER_USER,
      pass: MAILER_PASSWORD,
    },
  });

  const { email, nombre, token } = datos;

  const info = await transporter.sendMail({
    from: "APV - Administrador de Pacientes de Veterianaria",
    to: email,
    subject: "Restablece tu Password",
    text: "Restablece tu Password",
    html: `
        <p>Hola ${nombre}, has solicitado restablecer tu password</p>
        <p>Sigue el siguiente enlace para generar un nuevo password: 
            <a href="${FRONTEND_URL}/confirmar-cuenta/${token}">Restablece tu password</a>
        </p>

        <p>Si tu no creaste esta cuenta puedes ignorar este mensaje.</p>
      `,
  });

  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailOlvidePassword;
