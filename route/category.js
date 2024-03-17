const { addCategories, getCategories, deleteCategory } = require("../service/category-service");

const categoryRouter = require("express").Router();

categoryRouter.post("/add-category", async (req, res) => {
    const newUserData = req.body;
    const result = await addCategories(newUserData);
    res.json(result);
  });

  categoryRouter.delete("/del-category", async (req, res) => {
    const newUserData = req.body;
    const result = await deleteCategory(newUserData);
    res.json(result);
  });

  categoryRouter.get("/categories", async (req, res) => {
    const users = await getCategories();
    res.json(users);
  });

  module.exports = categoryRouter;