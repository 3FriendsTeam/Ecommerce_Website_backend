const { Category } = require('../models'); // Sử dụng destructuring từ models/index.js

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createCategory = async (req, res) => {
  try {
    const{ CategoryName , pathImg} = req.body;
    console.log(CategoryName, pathImg);
    const category = await Category.create({CategoryName:CategoryName,pathImg:pathImg});
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { id } = req.query;
    const { CategoryName, pathImg } = req.body;
    const category = await Category.update({ CategoryName: CategoryName, pathImg: pathImg }, { where: { id:id } });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.query;
    const category = await Category.destroy({ where: { id:id } });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
};