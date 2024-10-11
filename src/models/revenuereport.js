'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RevenueReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RevenueReport.init({
    ReportDate: DataTypes.DATE,
    TotalRevenue: DataTypes.DECIMAL,
    ReportedBy: DataTypes.STRING,
    Notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'RevenueReport',
  });
  return RevenueReport;
};