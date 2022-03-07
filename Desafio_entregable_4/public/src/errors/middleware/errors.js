const errMiddleware = (err, req, res, _next) => {
  console.log(err);
  res.status(500).json({
    message: err.message,
    name: err.name,
  });
};

module.exports = errMiddleware;
