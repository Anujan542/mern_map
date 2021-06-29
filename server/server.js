const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const db = require("./config/db");

dotenv.config();
db();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/pin", require("./routes/pinRoutes"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is runing on port ${port}`.blue.bgWhite);
});
