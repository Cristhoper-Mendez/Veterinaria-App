import express from "express";
import morgan from "morgan";
import cors from "cors";

// Inicializations
const app = express();
require("dotenv").config();
require("./config/db");

// Middlewares
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Server working");
});

// Start server
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
