const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  const token = req.headers['authorization']
  if (!token)
    return res.status(403).json({
      result : 0,
      status: 'forbidden',
      message:"User not authenticated"
    })

  jwt.verify(token,"nwdi", function (err, decoded) {
    if (err) {
      return res.status(403).json({
        message: err.message
      });
    }

    req.user = decoded;
    return next();
  })
}