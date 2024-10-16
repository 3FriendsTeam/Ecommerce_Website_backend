'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Mỗi Review thuộc về một Product
    this.belongsTo(models.Product, { foreignKey: 'ProductID' });
    // Mỗi Review thuộc về một Customer
    this.belongsTo(models.Customer, { foreignKey: 'CustomerID' });

    }
  }
  Review.init({
    ReviewContent: DataTypes.STRING,
    RatingLevel: DataTypes.INTEGER,
    ReviewDate: DataTypes.DATE,
    ProductID: DataTypes.INTEGER,
    CustomerID: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};