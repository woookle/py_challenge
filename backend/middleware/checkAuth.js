import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default async (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded._id);

      if (!user) {
        return res.status(403).json({
          message: 'Пользователь не найден',
        });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(403).json({
        message: 'Вы не зарегистрированы',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Вы не зарегистрированы',
    });
  }
};