'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReturnRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     // Một ReturnRequest có nhiều ReturnDetail
    this.hasMany(models.ReturnDetail, { foreignKey: 'RequestID' });
  }
  }
  ReturnRequest.init({
    RequestName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ReturnRequest',
  });
  return ReturnRequest;
};