const Joi = require("joi");
const validate = require("../validator");

const schema = Joi.object({
  course_name: Joi.string().min(3).required().label('Course Name'),
  instructor: Joi.string().min(2).required().label('Instructor'),
  price: Joi.number().min(0).required().label('Price'),
  income_sharing: Joi.number().min(0.2).required().label('Income Sharing'),
  email: Joi.string().email().required().label('Email'),
  payment_method: Joi.string().valid('CREDIT_CARD', 'TRANSFER').required().label('Payment Method'),
}).allow()

const InvoiceValidation = validate(schema)

module.exports = InvoiceValidation