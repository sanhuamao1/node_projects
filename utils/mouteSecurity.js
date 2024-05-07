const xss = require('xss-clean');
const cors = require('cors');
const helmet = require('helmet'); // 设置响应头
const rateLimiter = require('express-rate-limit');

const mouteSecurity = (app) => {
    app.use(
        rateLimiter({
           windowMs: 15 * 60 * 1000,
           max: 100,
        })
     );
     app.use(helmet());
     app.use(cors());
     app.use(xss());
};

module.exports = mouteSecurity;
