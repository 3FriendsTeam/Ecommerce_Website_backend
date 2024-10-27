const { ProductType } = require('../models');


const getAllProductType = async (req, res) => {
    try {
        const productType = await ProductType.findAll();
        return res.status(200).json(productType);
    } catch (error) {
        return res.status(500).json(error);
    }
}
const createProductType = async (req, res) => {
    try {
        const { name, idCategory} = req.body;
        const productType = await ProductType.create({ TypeName: name, CategoryID: idCategory });
        return res.status(201).json(productType);
    } catch (error) {
        return res.status(500).json(error);
    }
}
const deleteProductType = async (req,res) =>{
    try{
        const {id} = req.query;
        const productType = await ProductType.destroy({where:{id:id}});
        return res.status(200).json(productType);
    }catch(error)
    {
        return res.status(500).json(error);
    }
}

module.exports = {
    getAllProductType,
    createProductType,
    deleteProductType
}