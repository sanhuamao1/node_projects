const pageHandler = (query) => {
   const _page = Number(query.page) || 1;
   const _limit = Number(query.pageSize) || 10;
   const skip = (_page - 1) * _limit;
   return [skip, _limit];
};

module.exports = pageHandler;
