const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

const users = [];

app.use(express.json());

// Register route
app.post('/register', (req, res) => {
  // Extract user data from request body
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = users.some(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create new user object
  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  // Add new user to users array
  users.push(newUser);

  // Return success response
  res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// Start server
app.listen(3000, () => console.log('Server started on port 3000'));
