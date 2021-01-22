function paginate(model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req, query.limit);
    const startIndex = (page - 1) * limit;

    const result = {};
    if (endIndex < model.length) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    result.results = model.slice(startIndex, endIndex);
    res.paginatedResult = result;
    next();
  };
}
