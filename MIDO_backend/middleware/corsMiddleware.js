export const setHeaders = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "https://mido.onrender.com");
  next();
};
