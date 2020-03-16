module.exports = function(req, res, next) {
  res.locals.isAuth = req.session.isAuth21;
  res.locals.errMess = req.session.errMess0;
  next();
};
