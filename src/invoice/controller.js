const { sequelize } = require("../../models")
const Models = require('../../models')
const Paginator = require("../paginator")

const index = async (req, res) => {
  let param = {
    
    include: [
      {
        model: Models.Course,
        as: 'course',
        attributes: [
          'CourseName',
          'Instructor',
          'Price',
          'IncomeSharing',
          [ sequelize.literal('COALESCE (Price, 0) * COALESCE (IncomeSharing, 0)'), 'TotalRevenue']
        ],
      }
    ],
    where: {},
  }

  return Paginator(req, res, Models.Invoice, param)
}

const store = async (req, res) => {
  const t = await sequelize.transaction()

  try {

    const invoice = await Models.Invoice.create({
      UserEmail: req.body.email,
      PaymentMethod: req.body.payment_method,
      course: {
        CourseName: req.body.course_name,
        Instructor: req.body.instructor,
        Price: parseInt(req.body.price),
        IncomeSharing: parseFloat(req.body.income_sharing),
      }
    }, {
      include: [{
        model: Models.Course,
      as: 'course'}
    ],
      transaction: t
    })

    // const course = await Models.Course.create({
    //   CourseName: req.body.course_name,
    //   Instructor: req.body.instructor,
    //   Price: parseInt(req.body.price),
    //   IncomeSharing: parseFloat(req.body.income_sharing),
    // }, {
    //   transaction: t
    // })

    await t.commit()

    return res.status(200).json({
      message: 'success',
      data: {
        invoice: invoice,
      }
    })
  } catch (error) {

    await t.rollback()

    return res.status(422).json({
      message: error.message,
      data: {}
    })
  }
}

const update = async (req, res) => {
  const t = await sequelize.transaction()

  try {

    const invoice = await Models.Invoice.findByPk(req.params.id)
    const course = await Models.Course.findByPk(req.params.id)

    await invoice.update({
      UserEmail: req.body.email,
      PaymentMethod: req.body.payment_method
    }, {
      transaction: t
    })

    await course.update({
      CourseName: req.body.course_name,
      Instructor: req.body.instructor,
      Price: parseInt(req.body.price),
      IncomeSharing: parseFloat(req.body.income_sharing),
    }, {
      transaction: t
    })

    await t.commit()

    return res.status(200).json({
      message: 'updated',
      data: {
        invoice: invoice,
        course: course
      }
    })
  } catch (error) {

    await t.rollback()

    return res.status(422).json({
      message: error.message,
      data: {}
    })
  }
}

const destroy = async (req, res) => {

  const t = await sequelize.transaction()

  try {

    const invoice = await Models.Invoice.destroy({
      where: { id: req.params.id }
    })
    const course = await Models.Course.destroy({
      where: { id: req.params.id }
    })

    await t.commit()

    return res.status(200).json({
      message: 'deleted',
      data: {}
    })
  } catch (error) {

    await t.rollback()

    return res.status(422).json({
      message: error.message,
      data: {}
    })
  }
}

module.exports = {
  index,
  store,
  update,
  destroy
}