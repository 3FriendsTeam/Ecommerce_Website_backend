    'use strict';
    const {
    Model
    } = require('sequelize');
    module.exports = (sequelize, DataTypes) => {
    class ProductSupplierDetails extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Product, { foreignKey: 'ProductID' });
            // Mỗi productSupplierDetails thuộc về một ProductAttribute
            this.belongsTo(models.Supplier, { foreignKey: 'SupplierID' });
        }
    }
    ProductSupplierDetails.init({
        ProductID: DataTypes.INTEGER,
        SupplierID: DataTypes.INTEGER,
        StartDate: DataTypes.DATE,
        EndDate: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'ProductSupplierDetails',
    });
    return ProductSupplierDetails;
    };