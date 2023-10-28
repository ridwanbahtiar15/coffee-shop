require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;

// pasang parser untuk json dan form url encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// cors
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PATCH", "DELETE"],
  })
);

const mainRouter = require("./src/Routers/main.router");
app.use(mainRouter);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
