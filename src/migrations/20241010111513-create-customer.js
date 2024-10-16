'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      CustomerName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Gender: {
        type: Sequelize.STRING,
        allowNull: true
      },
      JoinDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      Address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      PhoneNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      BirthDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      Password: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('Customers');
  }
};
