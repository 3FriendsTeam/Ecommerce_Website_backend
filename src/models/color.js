'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Mỗi Color thuộc về một Product
    this.belongsTo(models.Product, { foreignKey: 'ProductID' });
    }
  }
  Color.init({
    ColorName: DataTypes.STRING,
    ProductID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Color',
  });
  return Color;
};