require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("db Connected");
  })
  .catch(error => {
    console.log(error);
  });

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hey");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
