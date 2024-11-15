const mongoose = require('mongoose');

// Define the Customer schema first
const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String },
    role: { type: Number, default: 2 },
    status: { type: String, default: "Inactive" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Check if the model is already defined
const Customer = mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
