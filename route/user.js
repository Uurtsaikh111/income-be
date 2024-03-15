const {
  getUsers,
  addUsers,
  login,
  updateUser,
  createTable,
  dropTable,
} = require("../service/user-service");

//usertei hamaaraltai
const userRouter = require("express").Router();

userRouter.get("/users", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

userRouter.get("/create-user", async (req, res) => {
  const users = await createTable();
  res.json(users);
});

userRouter.get("/drop-user", async (req, res) => {
  const users = await dropTable();
  res.json(users);
});

userRouter.post("/add-user", async (req, res) => {
  const newUserData = req.body;
  const result = await addUsers(newUserData);
  res.json(result);
});

userRouter.post("/update-user", async (req, res) => {
  const newUserData = req.body;
  const result = await updateUser(newUserData);
  res.json(result);
});

userRouter.post("/login", async (req, res) => {
  const newUserData = req.body;
  const result = await login(newUserData);
  res.json(result);
});

module.exports = userRouter;
