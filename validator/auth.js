const validate = require('../utils/validate');
const Joi = require('joi');

const StringRequired = Joi.string().trim().required();

exports.loginSchema = validate({
   body: {
      email: StringRequired.messages({
         'string.empty': `邮箱不能为空`,
      }),
      password: StringRequired.messages({
         'string.empty': `密码不能为空`,
      }),
   },
});
