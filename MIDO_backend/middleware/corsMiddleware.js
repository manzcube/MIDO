export const setHeaders = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
};
