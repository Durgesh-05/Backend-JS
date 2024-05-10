import express from "express";
import path from "path";
import { connectMongoDb } from "./connection.js";
import { router as urlRoute } from "./routes/url.route.js";
import { router as staticRoute } from "./routes/static.route.js";
import { router as redirectRoute } from "./routes/redirecturl.route.js";

const app = express();
const port = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectMongoDb("mongodb://127.0.0.1:27017/url-shortner")
  .then(() => console.log("MongoDb Connection Succeed!! "))
  .catch((err) => console.log("MongoDb Connection Failed ERROR: ", err));

app.use("/", staticRoute);
app.use("/url", urlRoute);
app.use("/", redirectRoute);

app.listen(port, () => console.log(`Server is Listening at Port: ${port}`));
