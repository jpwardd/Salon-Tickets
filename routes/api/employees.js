const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const config = require('config');

const Employee = require('../../models/Employee');
// POST api/employees
router.post('/', [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;

  try {
    let employee = await Employee.findOne({ email });
    if (employee) {
      return res
      .status(400)
      .json({ errors: [{ msg: 'Employee already exists' }]})
    }

    employee = new Employee({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);

    employee.password = await bcrypt.hash(password, salt);
    
    await employee.save();

    const payload = {
      employee: {
        id: employee.id
      }
    }

    jwt.sign(
      payload, 
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if(err) throw err;
        res.json({ token });
      });

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})

module.exports = router;