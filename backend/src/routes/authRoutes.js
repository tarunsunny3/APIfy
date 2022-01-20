const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { requireAuth } = require('../middlewares/auth');

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


/**
 * @method - POST
 * @param - /api/auth/signup
 * @description - User SignUp
 */
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
          res.cookie('token', token, {
            maxAge: 10 * 24 * 60 * 60 * 60,
            httpOnly: false,
            sameSite: 'none',
            secure: true,
          });
          res.status(200).json({
            success: true,
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
 * @param - /api/auth/logout
 * @description -Logout
 */
router.get('/logout', requireAuth, (req, res)=>{
  try{
  res.cookie("token", "", { maxAge: -1})
    res.sendStatus(200);
  }catch(e){
    res.sendStatus(400).json({success: false});
  }
});

/**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /api/auth/decodedUser
 */
router.get('/decodedUser', requireAuth, async (req, res) => {
  const user = req.decoded;
  if (user.id === null) {
    res.json({ user: req.decoded });
  } else {
    try {
      const userDetails = await User.findOne({ id: user.id });
      res.json({ user: {id: userDetails.id, ...userDetails}, success: true });
    } catch (error) {
      res.json({ success: false });
    }
  }
});
module.exports = router;
