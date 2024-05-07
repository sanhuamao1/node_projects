const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      required: [true, '用户名称不能为空'],
      minlength: [3, '用户名必须为3~50个字符'],
      maxlength: [50, '用户名必须为3~50个字符'],
   },
   email: {
      type: String,
      required: [true, '邮箱不能为空'],
      match: [
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         '请输入有效邮箱',
      ],
      unique: true,
   },
   password: {
      type: String,
      required: [true, '密码不能为空'],
      minlength: [6, '密码不能少于6个字符'],
   },
});

// 加密密码
UserSchema.pre('save', async function (next) {
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
});

// 生成Token
UserSchema.methods.createJWT = function () {
   return jwt.sign(
      { userId: this._id, username: this.username },
      process.env.JWT_SECRET,
      {
         expiresIn: process.env.JWT_LIFTTIME,
      }
   );
};

// 对比密码
UserSchema.methods.comparePwd = async function (pwd) {
   const isMatch = await bcrypt.compare(pwd, this.password);
   return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
