'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ShippingAddresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      RecipientName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      PhoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      City: {
        type: Sequelize.STRING,
        allowNull: false
      },
      District: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Ward: {
        type: Sequelize.STRING,
        allowNull: false
      },
      SpecificAddress: {
        type: Sequelize.STRING,
        allowNull: true
      },
      CustomerID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Customers',
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
    await queryInterface.dropTable('ShippingAddresses');
  }
};
