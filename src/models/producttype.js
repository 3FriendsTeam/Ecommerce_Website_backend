'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, { foreignKey: 'CategoryID' });
    // Một ProductType có nhiều Product
    this.hasMany(models.Product, { foreignKey: 'ProductTypeID' });
    }
  }
  ProductType.init({
    TypeName: DataTypes.STRING,
    CategoryID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductType',
  });
  return ProductType;
};