import path from "path";
import dotenv from "dotenv";
import { connectMongoDB } from "./connection.js";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import profileRoute from "./routes/profile.route.js";
import searchRoute from "./routes/search.route.js";
import { Blog } from "./models/blog.model.js";
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

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("homepage", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/search", searchRoute);
