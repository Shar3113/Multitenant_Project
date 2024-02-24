import verify  from 'jsonwebtoken';
import  secret  from '../config/config.js';

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token.' });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: 'No token provided.' });
  }
};

export default authenticateJWT;
