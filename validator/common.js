const Joi = require('joi');

exports.tableQuery = {
   fileds: Joi.optional(),
   sort: Joi.optional(),
   numeric: Joi.optional(),
   page: Joi.optional(),
   pageSize: Joi.optional(),
};
