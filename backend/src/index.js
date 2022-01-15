const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to APIfy");
});

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log("Server started on port " + port);
});
