const { Category, Manufacturer, Product } = require('../models'); // Sử dụng destructuring từ models/index.js

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
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.query;
    const category = await Category.findByPk(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const getAllManufacturerOfProduct = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'categoryId query parameter is required' });
  }

  // Validate categoryId is a number
  if (isNaN(parseInt(id, 10))) {
    return res.status(400).json({ error: 'categoryId must be a number' });
  }

  try {
    // Fetch distinct manufacturers associated with the given category ID
    const manufacturers = await Manufacturer.findAll({
      attributes: ['id', 'ManufacturerName', 'PathLogo', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Product,
          attributes: [],
          where: {
            CategoryID: id,
          },
          required: true,
        },
      ],
      distinct: true,
    });

    res.json(manufacturers);
  } catch (error) {
    console.error('Error fetching manufacturers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getAllManufacturerOfProduct
};