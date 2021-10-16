const { patch } = require("./router");

// import router from "./router/index";
const express = require("express"),
  app = express(),
  cors = require("cors"),
  router = require("./router");

app.use(cors());
app.use("/api", router);

const port = 3002;
app.listen(port, () => {
  console.log(`Server running at http://localhost: ${port}`);
});
