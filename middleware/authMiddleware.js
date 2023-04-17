const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Middleware function to verify JWT token in authorization header
function verifyToken(req, res, next) {
  // Get authorization header value
  const bearerHeader = req.headers.authorization;

  // Check if authorization header is present
  if (typeof bearerHeader !== 'undefined') {
    // Split header value into array to get token
    const bearerToken = bearerHeader.split(' ')[1];

    // Verify token using JWT library and secret key
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // Token is invalid or expired
        res.status(401).json({ message: 'Unauthorized' });
      } else {
        // Token is valid, set decoded user data on request object
        req.user = decoded;
        next();
      }
    });
  } else {
    // Authorization header is missing
    res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = { verifyToken };
