const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

// @route       GET to api/auth
// @desc        Get current logged in user
// @access      Private
router.get('/', [auth], async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// @route       POST to api/auth
// @desc        Authenticate user and get the token (Login user)
// @access      Private
router.post(
  '/',
  [
    check('email', 'Please include an email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return a response status 400 and send a json with the errors array
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // trying to find a user in the database following the model of User, with the email matching the request body email
      let user = await User.findOne({ email });

      // checking if there is no user found, returning a response status of 400 and a json containing the message 'Invalid Credentials'
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // setting isMatch to a promise that bcrypt will compare the body password and the password found in the database
      // Can't just compare directly since the password in the db is encrypted.
      const isMatch = await bcrypt.compare(password, user.password);

      // If the passwords don't match, return a 400 status and a json with a message saying 'Invalid Credentials'
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // Creates a payload for the signature containing a user object with the id of the user.id found in the db request above.
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
