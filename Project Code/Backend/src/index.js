const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Rental = require('./Controller/Rental');
const Customer = require('./Controller/Customer');
const Admin = require('./Controller/Admin');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

// Load environment variables
dotenv.config();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());

// MongoDB connection setup
const server = async () => {
    try {
        // Connect to MongoDB without deprecated options
        const db = await mongoose.connect('mongodb://localhost:27017/house', {
            // No longer needed: `useNewUrlParser` and `useUnifiedTopology`
        });

        if (db) {
            console.log('Database connected');
            // Start the server after DB connection
            app.listen(5000, () => {
                console.log('Server is running on port 5000');
            });
        } else {
            console.log('Database not connected');
        }

    } catch (error) {
        console.log('Error in server:', error);
        process.exit(1); // Exit process with failure code
    }
};

// Test route
app.get('/h', (_req, res) => {
    res.send('Hello World');
});

// API routes
app.use('/api/rental', Rental);
app.use('/api/customer', Customer);
app.use('/api/admin', Admin);

// Start the server
server();
