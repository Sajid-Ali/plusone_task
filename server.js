const express = require("express");
const routes = require("./routes/main.route");

const app = express();

app.use(express.json());

app.use("/api/v1", routes); 

const listener = app.listen(process.env.PO_PORT || 3002, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
