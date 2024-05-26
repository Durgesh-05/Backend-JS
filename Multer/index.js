const express = require("express");
const path = require("path");
const upload = require("./utils.js");
const { log } = require("console");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post("/upload", upload.single("clientFile"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.redirect("/");
});

app.listen((port = 8000), () =>
  console.log(`Server Listening at Port: ${port}`)
);
