'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      InvoiceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Invoices',
          key: 'id',
          as: 'InvoiceId'
        }
      },
      CourseName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Instructor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      IncomeSharing: {
        type: Sequelize.DECIMAL(10, 1),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Courses');
  }
};