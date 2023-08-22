require("dotenv").config();
const express = require("express");
const cors = require("cors");
const SPORT = process.env.SERVERPORT;
const newLocal = "./routes/Router.js";
const Routes = require(newLocal);
const app = express();
app.use(cors());
app.use(express.json());

app.use("/images", express.static("images"));

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use(Routes);

module.exports = {
  server: app,
  start: () => {
    app.listen(SPORT, () => {
      console.log(`Starting server on port ${SPORT}`);
    });
  },
};
