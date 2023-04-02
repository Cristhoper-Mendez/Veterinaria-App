import mongoose from "mongoose";

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error(err));
