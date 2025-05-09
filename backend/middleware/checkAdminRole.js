export default (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'mainAdmin')) {
    next();
  } else {
    res.status(403).json({
      message: 'Недостаточно прав!',
    });
  }
};