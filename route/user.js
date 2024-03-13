const { getUsers } = require("../service/user-service");

//usertei hamaaraltai
const userRouter = require("express").Router();

userRouter.get("/users", async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

userRouter.post("/signup", async (req, res) => {
    const newUserData = req.body;
    const result = await addUser(newUserData);
    res.json(result);
  });

module.exports = userRouter;
