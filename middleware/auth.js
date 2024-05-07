const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');
const User = require('../models/User');

const authenticationMiddleware = async (req, res, next) => {
   const authHeader = req.headers.authorization;

   if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthenticatedError('No token provided');
   }

   const token = authHeader.split(' ')[1];
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      req.user = { userId: user._id, username: user.username, email: user.email };
      next();
   } catch (error) {
      throw new UnauthenticatedError('Not authorized to access this route');
   }
};

module.exports = authenticationMiddleware;
