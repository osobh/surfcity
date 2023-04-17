const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { supabase } = require('../config/supabase');
const authMiddleware = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    // Generate a new UUID for the user
    const uuid = uuidv4();

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Add the new user to Supabase
    const { user, error } = await supabase.auth.signUp({
      email: req.body.email,
      password: hashedPassword,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Create a new user object in our own database
    const newUser = new User({
      id: uuid,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the new user to our database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Log in a user
router.post('/login', async (req, res) => {
  try {
    // Find the user in our own database by email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare the password provided by the user with the stored hash
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT for the user
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Get the currently logged in user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // Find the user in our own database by ID
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ email: user.email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
