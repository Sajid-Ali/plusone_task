const cors = require("cors");
const path = require("path");
const express = require("express");
const routes = require("./routes/main.route");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use("/api/v1", routes);
app.get("/", (req, res) => {
  res.send({ greeting: "Hello world!" });
});

const listener = app.listen(process.env.PORT || 3002, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
