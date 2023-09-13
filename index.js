const express = require("express");
const app = express();

// pasang parser untuk json dan form url encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mainRouter = require("./src/Routers/main.router");
app.use(mainRouter);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
