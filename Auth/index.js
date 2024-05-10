import dotenv from "dotenv";
import { connectMongoDB } from "./connection.js";
import { router as userRoute } from "./routes/user.route.js";
import { app } from "./app.js";
import { User } from "./models/user.model.js";
import { authenticateToken} from "./middlewares/auth.js"
dotenv.config({
  path: "./env",
});

connectMongoDB()
  .then(() => {
    console.log(`MongoDB Connection Succeed!! `);
    app.listen(process.env.PORT, () =>
      console.log(`Server is listening to Port: ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(`MongoDB Connection Failed!! Error: ${err}`));

app.use("/api/v1/users", userRoute);

app.get("/api/v1/users",authenticateToken, async (req, res) => {
  const users = await User.find();
  return res.status(200).json({ msg: "Success", users });
});
