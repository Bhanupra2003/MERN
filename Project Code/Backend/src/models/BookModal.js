const mongoose = require('mongoose');

// Define the Book schema
const BookSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    apartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment', required: true },
    rental: { type: mongoose.Schema.Types.ObjectId, ref: 'Rental', required: true },
    createdAt: { type: Date, default: Date.now },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    cardholder: { type: String, required: true },
    cardnumber: { type: String, required: true },
    expiry: { type: String, required: true },
    cvv: { type: String, required: true },
});

// Create the Book model based on the schema
const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
