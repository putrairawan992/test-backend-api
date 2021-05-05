'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Course, {
        foreignKey: 'InvoiceId',
        as: 'course'
      })
    }
  };
  Invoice.init({
    Date: DataTypes.DATE,
    UserEmail: DataTypes.STRING,
    PaymentMethod: DataTypes.ENUM('CREDIT_CARD', 'TRANSFER')
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};