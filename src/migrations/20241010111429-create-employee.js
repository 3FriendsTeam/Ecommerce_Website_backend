'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProfileImage: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      FullName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      DateOfBirth: {
        type: Sequelize.DATE,
        allowNull: true
      },
      Gender: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      IDNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isEmail: true // Xác thực định dạng email nếu cần thiết
        }
      },
      PhoneNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      CreatedDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      LastUpdated: {
        type: Sequelize.DATE,
        allowNull: true
      },
      DeletedDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      CreatedBy: {
        type: Sequelize.STRING,
        allowNull: true
      },
      DeletedBy: {
        type: Sequelize.STRING,
        allowNull: true
      },
      UpdatedBy: {
        type: Sequelize.STRING,
        allowNull: true
      },
      IsDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.dropTable('Employees');
  }
};
