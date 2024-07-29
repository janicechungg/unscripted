require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const connection = require('./db');

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON payloads

// Connect to the database
connection();

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth')); // Authentication routes (login, register, etc.)
app.use('/api/users', require('./routes/users')); // User-related routes
app.use('/api/posts', require('./routes/posts')); // Post-related routes

// Test route to check server status
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Error handling middleware (optional, but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
