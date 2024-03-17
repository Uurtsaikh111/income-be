const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./route/user.js");
const categoryRouter = require("./route/category.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);
app.use(categoryRouter);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
