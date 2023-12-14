import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";
import dotenv from "dotenv";
import path from "path";

const envPath = path.join(__dirname, ".env");
dotenv.config({ path: envPath });

const app = express();
const connectionString = process.env.MONGODB_CONNECTION_STRING!;
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(connectionString)
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
