import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/admin-v1")
  .then(() => {
    console.log("Connection established");
  })
  .catch(() => {
    console.log("Error occurred");
  });

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
