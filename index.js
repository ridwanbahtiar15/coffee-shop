require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

// pasang parser untuk json dan form url encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mainRouter = require("./src/Routers/main.router");
app.use(mainRouter);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
