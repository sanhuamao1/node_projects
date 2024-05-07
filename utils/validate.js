const Joi = require('joi');
const { BadRequestError } = require('../errors');

const expressJoi = function (schemas, options = { strict: false }) {
   // 01 非严格模式
   if (!options.strict) {
      // allowUnknown 允许提交未定义的参数项，默认值false
      // stripUnknown 过滤掉那些未定义的参数项，默认值false
      options = { allowUnknown: true, stripUnknown: true, ...options };
   }

   delete options.strict;
   return function async(req, res, next) {
      ['body', 'query', 'params'].forEach((key) => {
         if (!schemas[key]) return;
         const schema = Joi.object(schemas[key]);
         const { error, value } = schema.validate(req[key], options);
         // console.log(error.details[0].message);
         if (error) {
            next(new BadRequestError(error));
         } else {
            req[key] = value;
         }
      });
      next();
   };
};

module.exports = expressJoi;
