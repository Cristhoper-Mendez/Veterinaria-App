import mongoose from "mongoose";

const pacienteSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    propietario: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fechaAlta: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    veterianario: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Veterinario",
    },
  },
  {
    timestamps: true,
  }
);

const Paciente = mongoose.model("Paciente", pacienteSchema);

export default Paciente;
