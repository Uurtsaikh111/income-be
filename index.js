const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { addUser } = require("./route/add-user");
const { login } = require("./route/login");
const { getPgVersion } = require("./route/create-table");
const { change } = require("./route/change");
const { getUser } = require("./route/get-user");
const router = express.Router();
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

router.post("/add-user", addUser);
router.post("/login", login);
router.get("/",getPgVersion);
router.get("/change",change);
router.get("/get-user",getUser);

app.use(router);



// app.delete("/delete-user", async (req, res) => {
//   const deleteUser = req.body;
//   const client = await pool.connect();
//   const Q = `DELETE FROM users WHERE email='${deleteUser.email}'`;

//   try {
//     client.query(Q);
//   } catch (e) {
//     console.log(e);
//   } finally {
//     client.release();
//   }
//   res.status(200).send({ message: "User Delete is successfully" });
// });

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
