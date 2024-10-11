'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RevenueReports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ReportDate: {
        type: Sequelize.DATE,
        allowNull: false // Không cho phép giá trị null
      },
      TotalRevenue: {
        type: Sequelize.DECIMAL,
        allowNull: false // Không cho phép giá trị null
      },
      ReportedBy: {
        type: Sequelize.STRING,
        allowNull: false // Không cho phép giá trị null
      },
      Notes: {
        type: Sequelize.TEXT,
        allowNull: true // Có thể để giá trị null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW // Tự động gán ngày hiện tại
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW // Tự động gán ngày hiện tại
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RevenueReports');
  }
};
