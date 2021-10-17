const { urlencoded } = require("body-parser");
const { patch } = require("./router");

// import router from "./router/index";
const express = require("express"),
  app = express(),
  cors = require("cors"),
  router = require("./router");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("", router);

const port = 3002;
app.listen(port, () => {
  console.log(`Server running at http://localhost: ${port}`);
});
