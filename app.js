require('express-async-errors');
const express = require('express');
const app = express();
const PORT = 8080;
const connectDB = require('./utils/connectDB');
const notFoundMD = require('./middleware/not-found');
const errCaptureMiddleware = require('./middleware/err-capture');
require('dotenv').config();

// 格式化请求体
app.use(express.json());

// 安全策略
const mouteSecurity = require('./utils/mouteSecurity');
mouteSecurity(app);

// 注册路由
const mountRoutes = require('./utils/mouteRouter');
mountRoutes(app);

app.use(notFoundMD); // 匹配其他未定义
app.use(errCaptureMiddleware); // 全局错误捕获

const start = async () => {
   try {
      await connectDB(process.env.MONGO_URI);
      app.listen(PORT, console.log(`Server is running on port ${PORT}`));
   } catch (error) {
      console.log(error);
   }
};

start();
