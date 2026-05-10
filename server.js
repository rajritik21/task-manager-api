const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const todoRoutes = require('./routes/todos');

// Initialize express app
const app = express();
const port = process.env.PORT || 5001;
dotenv.config();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'https://rajritik21.github.io'],
    credentials: true
}));

app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("Server is running");
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager')
    .then(() => console.log('✅ MongoDB Connected Successfully!'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/users', require('./routes/users'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});