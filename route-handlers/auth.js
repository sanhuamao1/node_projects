const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const login = async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email });
   if (!user) {
      throw new UnauthenticatedError('该用户不存在');
   }

   // 对比密码
   const isPwdCorrect = await user.comparePwd(password);
   if (!isPwdCorrect) {
      throw new UnauthenticatedError('密码错误');
   }

   res.status(StatusCodes.OK).json({
      msg: '登录成功',
      token: user.createJWT(),
   });
};

const register = async (req, res) => {
   const user = await User.create(req.body);
   res.status(StatusCodes.CREATED).json({
      msg: '创建成功',
      username: user.username
   });
};

module.exports = {
   login,
   register,
};
