const express = require("express");
const users = require("./users.json");
const fs = require("fs");
const app = express();

const port = 8000;

//Middleware
app.use(express.urlencoded({ extended: false }));

//Custom middleware
//First of all middleware means a middle man which has access to req and res object and has extra parameter which is next which points to next operation after the end of current middleware

app.use((req, res, next) => {
  //This middleware will append the Logs of request
  fs.appendFile(
    "logs.txt",
    `\n${new Date().toLocaleDateString()} : ${req.method} ${req.path}`,
    (err) => {
      if (!err) next();
    }
  );
});

// If there is multiple methods for single route we can use route method
// app.route("api_routes").methods().methods() we can add methods like get,post,put,patch,delete by adding .get((req, res) => {}) same for other methods too

//Status code give information about response
//5 types of status code is there

app
  .route("/api/users/:id")
  .get((req, res) => {
    //We can set custom headers too in res object
    //Good practice is use X before any custom headers
    res.setHeader("X-Response-Time", `${new Date().getMilliseconds()}`);
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    //If user not found that is 404 
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
  })
  .patch((req, res) => {
    const body = req.body;
    const id = Number(req.params.id);
    console.log("Id ", id);
    users.find((user) => user.id === id).email = body.email;
    fs.writeFile("./users.json", JSON.stringify(users), (e) =>
      res.json({ message: "Success" })
    );
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    users.splice(
      users.findIndex((user) => user.id === id),
      1
    );
    fs.writeFile("./users.json", JSON.stringify(users), (e) =>
      res.json({ message: "User Deleted SuccessFully" })
    );
  });

app.get("/users", (req, res) => {
  const html = `
    <ul>
        ${users
          .map((user) => {
            return `<li>${user.first_name}<li/>`;
          })
          .join("")}
    </ul>
    `;
  return res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  console.log(body);
  if (
    !body.email ||
    !body.first_name ||
    !body.last_name ||
    !body.job_title ||
    !body.gender
  ) {
    //This is client side error so 400 - bad request
    return res.status(400).json({ msg: "All fields Required..." });
  }
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./users.json", JSON.stringify(users), (e) =>
    //This status code means resource created as per request so instead of 200 - ok status code we will send 201
    res.status(201).json({ message: "Success" })
  );
});

// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

app.listen(port, () => {
  console.log(`Server is Listening to Port: ${port}`);
});
