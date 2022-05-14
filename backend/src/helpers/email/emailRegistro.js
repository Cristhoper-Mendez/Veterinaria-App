import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
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
    subject: "Comprueba tu cuenta en APV",
    text: "Comprueba tu cuenta en APV",
    html: `
        <p>Hola ${nombre}, comprueba tu cuenta en APV</p>
        <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enalace: 
            <a href="${FRONTEND_URL}/confirmar-cuenta/${token}">Comprobar tu cuenta</a>
        </p>

        <p>Si tu no creaste esta cuenta puedes ignorar este mensaje.</p>
      `,
  });

  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailRegistro;
