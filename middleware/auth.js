const jwt = require('jsonwebtoken');
const config = require('config');

//allows you to import this class to use as a middleware.
//This will allow you to import auth to make sure the token is verified, and if it is, will return the user within the token.
module.exports = function(req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token');

  //Check if there is no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied.' });
  }

  try {
    //uses the secret to verify whether the token is valid by using the algorithm given in the secret to decode. Puts the payload into decoded.
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    //want to take the user out of the payload and set it to the request user.
    req.user = decoded.user;
    next(); // Moves onto the endpoint in the REST request it is called in.
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
