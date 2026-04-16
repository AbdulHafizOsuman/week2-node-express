const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: JSON parsing
app.use(express.json());

// Custom logging middleware (BONUS)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Serve static HTML
app.use(express.static(path.join(__dirname, 'public')));

// GET /api
app.get('/api', (req, res) => {
    res.send("My Week 2 API!");
});

// POST /user
app.post('/user', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: "Name and email are required"
        });
    }

    res.json({ message: `Hello, ${name}!` });
});

// GET /user/:id
app.get('/user/:id', (req, res) => {
    res.send(`User ${req.params.id} profile`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
