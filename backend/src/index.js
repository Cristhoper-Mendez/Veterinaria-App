import express from "express";
import morgan from "morgan";
import cors from "cors";

// Import routes
import veterinarioRoutes from "./routes/veterinarioRoutes";
import pacienteRoutes from "./routes/pacienteRoutes";

// Inicializations
const app = express();
require("dotenv").config();
require("./config/db");

// Cors conf
const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por Cors"));
    }
  },
};

// Middlewares
app.use(morgan("tiny"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

// Start server
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
