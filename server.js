const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./route/user.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);

// const { addUser } = require("./route/add-user");
// const { login } = require("./route/login");
// const { getPgVersion } = require("./route/create-table");
// const { change } = require("./route/change");

// const { deleteUser } = require("./route/delete");
// const { currencySelect } = require("./route/update-user");
// const router = express.Router();

// router.post("/add-user", addUser);
// router.post("/login", login);
// router.get("/",getPgVersion);
// router.get("/change",change);

// router.delete("/delete",deleteUser);
// router.post("/updateUser",currencySelect);

// app.use(router);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
