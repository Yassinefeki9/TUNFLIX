import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import routes from "./src/routes/index.js";
const app = express();
console.log(process.env.TMDB_BASE_URL);
console.log(process.env.TMDB_KEY);
console.log("connectibng to " + process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL).then(async () => {

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

const port = process.env.PORT || 5000;

const server = http.createServer(app);


  // list all collections and insert a randeom document
  const collections = await mongoose.connection.db.collections();
  console.log(collections);

  console.log("connecting to " + process.env.MONGODB_URL);
  console.log("Mongodb connected");
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}).catch((err) => {
  console.log("Mongodb connection error");
  console.log({ err });
  process.exit(1);
});

//test