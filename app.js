const express = require('express');
const app = express();

// Load external modules
const { v4: uuidv4 } = require('uuid');

// Load internal modules
const authRoutes = require('./routes/authRoutes.js');

// Load middleware
const authMiddleware = require('./middleware/authMiddleware.js');

// Load configuration
const { supabase } = require('./config/supabase');

// Load models
const User = require('./models/user');

// Configure middleware
app.use(express.json());

// Register API routes
app.use('/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
