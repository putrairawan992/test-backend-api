'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Invoice, {
        foreignKey: 'InvoiceId',
        as: 'course'
      })
    }
  };
  Course.init({
    InvoiceId: DataTypes.INTEGER,
    CourseName: DataTypes.STRING,
    Instructor: DataTypes.STRING,
    Price: DataTypes.DECIMAL(10, 1),
    IncomeSharing: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};