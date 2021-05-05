const Paginator = async function (req, res, model, param) {
  const page = req.query.page ? parseInt(req.query.page) : undefined;
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};

  if (page !== undefined) {
    param.offset = startIndex;

    if(limit === undefined) {
      return res.status(422).json({
        message: 'limit must be set too.',
        data: {}
      })
    }
  }

  if (limit !== undefined) {
    param.limit = limit;
  }

  try {
    results.results = await model.findAndCountAll(param);

    if (endIndex < results.results.count) {
      results.nextPage = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.prevPage = {
        page: page - 1,
        limit: limit,
      };
    }

    results.firstPage = results.results.count > 0 ? 1 : 0;
    results.lastPage = Math.ceil(results.results.count / limit);

    return res.status(200).json({
      message: 'success',
      data: results
    })
  } catch (error) {
    console.error("\x1b[31m", "Error: ", error)

    return res.status(422).json({
      message: 'something went wrong. try again later.',
      data: {},
    });
  }
}

module.exports = Paginator
