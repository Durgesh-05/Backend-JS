const userRouter = require("./routes/user.route.js");
const { connectMongoDb } = require("./connection.js");
const { app } = require("./app.js");
const port = 8000;

//MongoDb connection
connectMongoDb("mongodb://127.0.0.1:27017/durgesh-db")
  .then(() => console.log("MongoDB Connection Succeed! "))
  .catch((err) => console.log("MongoDB Connection ERR ", err));

//User Route
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running at Port: ${port}`);
});
