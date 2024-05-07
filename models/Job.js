const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
   {
      company: {
         type: String,
         required: [true, '公司名称不能为空'],
         maxlength: [50, '公司名称不得超过50个字符'],
      },
      position: {
         type: String,
         required: [true, '职位名称不能为空'],
         maxlength: [50, '职位名称不得超过100个字符'],
      },
      status: {
         type: String,
         enum: ['interview', 'declined', 'pedding'],
         default: 'pedding',
      },
      createdBy: {
         type: mongoose.Types.ObjectId,
         ref: 'User',
         // required: [true, '用户不能为空'],
      },
   },
   {
      timestamps: true,
   }
);

module.exports = mongoose.model('Job', JobSchema);
