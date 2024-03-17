const { addCategories } = require("../service/category-service");

const categoryRouter = require("express").Router();

categoryRouter.post("/add-categories", async (req, res) => {
    const newUserData = req.body;
    const result = await addCategories(newUserData);
    res.json(result);
  });

  module.exports = categoryRouter;