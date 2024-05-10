const express = require("express");

const app = express();
const port = 8000;

app.get("/", (req, res) => { 
    res.send("This is HomePage");
})

app.listen(port, () => { 
    console.log(`Server is Listening to Port: ${port}`);
})