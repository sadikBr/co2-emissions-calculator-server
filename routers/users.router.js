const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const router = express.Router();

const User = require('../models/User');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'sadbrah@gmail.com',
    pass: 'vvmggnrefamevkrc',
  },
});

function sendMail(body, user_email) {
  const mailOptions = {
    from: 'sadbrah@gmail.com',
    to: user_email,
    subject: 'Your CO2 EMISSIONS CALCULATOR Password.',
    text: body,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function generateRandomPassword(length) {
  const lowerCharachters = 'abcdefghijklmnopqrstuvwxyz';
  const upperCharachters = lowerCharachters.toUpperCase();
  const numbers = '0123456789';
  const symbols = '~!@#$%^&*()_{}[]?';

  const combined = lowerCharachters + upperCharachters + numbers + symbols;
  const combinedArray = combined.split('');

  combinedArray.sort(() => 0.5 - Math.random());

  return combinedArray.slice(0, length + 1).join('');
}

function validateEmail(email) {
  const [_, domain] = email.split('@');

  return domain === 'altran.com' || domain === 'capgemini.com';
}

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id }).exec();

  res.json({
    user: {
      userId: user._id,
      isAdmin: user.isAdmin,
      organisation_email: user.organisation_email,
      personal_email: user.personal_email,
    },
  });
});

router.post('/register', async (req, res) => {
  const user = req.body;

  const foundUser = await User.findOne({
    organisation_email: user.organisation_email,
  }).exec();

  if (foundUser == null) {
    // Validate Email
    const validEmail = validateEmail(user.organisation_email);

    if (!validEmail) {
      res.status(400);
      return res.json({
        message: 'The provided organisation email is not a valid email.',
      });
    }
    // Generate a password.
    const password = generateRandomPassword(20);
    // Email the password to the user.
    sendMail(
      'Here is your password to access your account in CO2 EMISSION CALCULATOR WebApp: ' +
        password,
      user.personal_email
    );
    // Hash the password.
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    // Insert the user in the database.
    const insertedUser = new User(user);
    await insertedUser.save();
    // Respond to the user with the userObject.
    return res.json({
      user: {
        userId: insertedUser._id,
        isAdmin: insertedUser.isAdmin,
        organisation_email: insertedUser.organisation_email,
        personal_email: insertedUser.personal_email,
      },
    });
  }

  res.status(409);
  res.json({
    message: 'User already exists.',
  });
});

router.post('/login', async (req, res) => {
  const user = req.body;

  const foundUser = await User.findOne({
    organisation_email: user.organisation_email,
  }).exec();

  if (foundUser != null) {
    // Compare passwords.
    const match = await bcrypt.compare(user.password, foundUser.password);
    if (!match) {
      res.status(401);
      return res.json({
        message: 'Invalid Password!',
      });
    }
    // Respond to the user with the userObject.
    return res.json({
      user: {
        userId: foundUser._id,
        isAdmin: foundUser.isAdmin,
        organisation_email: foundUser.organisation_email,
        personal_email: foundUser.personal_email,
      },
    });
  }

  res.status(404);
  res.json({
    message: 'User does not exists (create an account first!)',
  });
});

router.put('/password', async (req, res) => {
  const { userId, original_password, password, confirm_password } = req.body;

  // Get the user from the database
  const foundUser = await User.findOne({ _id: userId }).exec();
  // Compare the stored password with the original password
  const match = await bcrypt.compare(original_password, foundUser.password);
  // if match
  if (match) {
    // compare the password with confirm_password
    const equalPasswords = password === confirm_password;
    // if match
    if (equalPasswords) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Update the user password
      foundUser.password = hashedPassword;
      // Resave the user to the database with the new password
      foundUser.save();

      return res.json({
        message: 'Password updated successfuly',
      });
    }

    res.status(401);
    return res.json({
      message: "Passwords does't match",
    });
  }

  res.status(400);
  res.json({
    message: 'The original password you entered is incorrect.',
  });
});

module.exports = router;
