const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

// @route       POST api/users
// @desc        Register user
// @access      Public
router.post(
  '/',
  [
    check('username', 'Username is required')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, username = name } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Creating a new user object with the information taken out from the body name, email and password
      const newUser = new User({
        username,
        password
      });

      // Promise to generate a salt using bcrypt with 10 rounds
      const salt = await bcrypt.genSalt(10);

      // Using the salt and the bcrypt hash function to create a hash password
      newUser.password = await bcrypt.hash(password, salt);

      // Saving the user object created above to the database
      await newUser.save();

      const payload = {
        user: {
          id: newUser.id
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
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// @route       GET api/users/:id
// @desc        Get username
// @access      Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.json({ username: user.username });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
