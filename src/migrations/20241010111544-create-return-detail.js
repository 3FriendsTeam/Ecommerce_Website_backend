'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReturnDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ReturnProductID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ReturnProducts', // Tham chiếu tới bảng ReturnProducts
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ProductID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products', // Tham chiếu tới bảng Products
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ReturnImage: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Reason: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Status: {
        type: Sequelize.STRING,
        allowNull: true
      },
      RequestID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ReturnRequests', // Tham chiếu tới bảng ReturnRequests
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ReturnDetails');
  }
};
