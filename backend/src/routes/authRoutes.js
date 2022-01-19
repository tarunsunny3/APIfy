const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middlewares/auth');

const router = express.Router();

const User = require('../models/User');

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  '/signup',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        error: true,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email,
      });
      if (user) {
        return res.json({
          success: false,
          message: 'User Already Exists',
        });
      }

      user = new User({
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,

        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            success: true,
            token,
          });
        },
      );
      return 0;
    } catch (err) {
      console.log(err.message);
      res.json({ success: false, message: 'Error in Saving' });
    }
  },
);

router.post(
  '/login',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({
        error: true,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        email,
      });
      if (!user) {
        return res.json({
          success: false,
          message: "User doesn't Exist",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({
          success: false,
          message: 'Incorrect Password !',
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            success: true,
            token,
          });
        },
      );
    } catch (e) {
      console.error(e);
      res.json({
        message: 'Server Error',
      });
    }
  },
);

/**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /api/auth/me
 */
router.get('/me', auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: 'Error in Fetching user' });
  }
});
module.exports = router;
