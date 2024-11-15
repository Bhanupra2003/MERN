const mongoose = require('mongoose');

// Define the Rental schema first
const RentalSchema = new mongoose.Schema({
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

// Now define the model and check if it's already compiled
const Rental = mongoose.models.Rental || mongoose.model('Rental', RentalSchema);

module.exports = Rental;
