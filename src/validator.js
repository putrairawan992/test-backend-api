const validate = schema => {
  return async (req, res, next) => {
    try {

      await schema.validateAsync(req.body, {
        errors: {
          wrap: {
            label: '',
          },
        },
        escapeHtml: true,
        abortEarly: false
      });

      next()
    } catch (error) {
      return res.status(422).json({
        message: error.message.split('. '),
        data: {}
      })
    }
  }
}


module.exports = validate
