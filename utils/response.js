const response = (
  res,
  s = "error",
  m = "an error occured",
  d = undefined,
  c = 500
) => {
  res.status(c).json({
    status: s,
    message: m,
    data: d,
  });
};

module.exports = response;
