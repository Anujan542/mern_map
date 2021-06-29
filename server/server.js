const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const db = require("./config/db");
const path = require("path");

dotenv.config();
db();

const app = express();
app.use(express.json());

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/pin", require("./routes/pinRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is runing on port ${port}`.blue.bgWhite);
});
