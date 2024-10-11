'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employee_Positions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      EmployeeID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Employees',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' // Đảm bảo tính nhất quán khi Employee bị cập nhật
      },
      PositionID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Positions',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' // Đảm bảo tính nhất quán khi Position bị cập nhật
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
    await queryInterface.dropTable('Employee_Positions');
  }
};
