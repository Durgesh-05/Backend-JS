import path from "path";
import dotenv from "dotenv";
import { connectMongoDB } from "./connection.js";
import userRoute from "./routes/user.route.js";
import app from "./app.js";
dotenv.config({
  path: "./env",
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectMongoDB(`${process.env.MONGO_URI}/blog-website`)
  .then(() => {
    console.log("MongoDB Connection Succeed!! ");
    app.listen(process.env.PORT, () =>
      console.log(`Server is Listening at Port: ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(`MongoDB connection failed! Error: ${err}`));

app.get("/", (req, res) => {
  res.render("homepage");
});

app.use("/api/v1/user", userRoute);