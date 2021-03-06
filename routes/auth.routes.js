const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('../config/default')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()


// api/auth/register
router.post('/register',
  [
    check('email', 'Email invalid').isEmail(),
    check('password', 'Minimum password length 6 characters').isLength({min: 6})
  ],
  async (req, res) => {
    try {
      console.log('Body: ', req.body)
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid registration data'
        })
      }

      const {email, password} = req.body
      const candidate = await User.findOne({email})

      if (candidate) {
        return res.status(400).json({message: 'User does exists'})
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({email, password: hashedPassword})

      await user.save()

      res.status(201).json({message: 'User created'})

    } catch (e) {
      res.status(500).json({message: 'Server Error'})
    }
  })

// api/auth/login
router.post('/login',
  [
    check('email', 'Enter a valid email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect login data'
        })
      }

      const {email, password} = req.body
      const user = await User.findOne({email})

      if (!user) {
        return res.status(400).json({message: 'User is not found'})
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({message: 'Invalid password'})
      }

      const token = jwt.sign(
        {userId: user.id},
        process.env.jwtSecret || config.jwtSecret,
        {expiresIn: '1h'}
      )

      console.log('token', token)

      res.json({token, userId: user.id})

    } catch (e) {
      console.log('err', e)
      res.status(500).json({message: 'Server Error'})
    }
  })

module.exports = router;