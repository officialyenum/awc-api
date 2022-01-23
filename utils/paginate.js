const paginate = (res, status, message, data, code) => {
  res.status(code).json({
    status: status,
    message: message,
    data: data.docs || [],
    totalDocs: data.totalDocs || 0,
    limit: data.limit || 0,
    page: data.page || 0,
    totalPages: data.totalPages || 0,
    hasNextPage: data.hasNextPage || false,
    nextPage: data.nextPage || null,
    hasPrevPage: data.hasPrevPage || false,
    prevPage: data.prevPage || null,
    pagingCounter: data.pagingCounter || 0,
  });
};

module.exports = paginate;
