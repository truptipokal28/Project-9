const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if(!token){
    return res.json({ message: 'Token is Blank' });
  }
    const finalToken = token.slice(7);

    jwt.verify(finalToken, 'rnw4', (err, decoded) => {
        if (err) {
            return res.json({ message: 'Token is not valid' });
        }
        req.user = decoded; // Store user data in the request object
        next();
    });
};

const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.payload.role === role) {
          next(); // User has the required role
        } else {
          res.json({ message: 'Access denied' });
        }
      };
}

module.exports = {
    verifyToken,
    checkRole
}