const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// Define the Rental schema
const RentalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Invalid email format'
        }
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /^\d{10}$/.test(value), // Simple phone number validation (10 digits)
            message: 'Invalid phone number format'
        }
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        validate: {
            validator: (value) => value.startsWith('http') || value.startsWith('/'), // Check for valid URL or file path
            message: 'Invalid profile picture URL'
        }
    },
    role: {
        type: Number,
        default: 2,
        enum: [1, 2], // Assuming roles are 1 for Admin, 2 for User
        required: true
    },
    status: {
        type: String,
        default: "Inactive",
        enum: ['Inactive', 'Active'], // Assuming these are the only two possible statuses
        required: true
    }
}, { timestamps: true }); // Automatically manages createdAt and updatedAt

// Pre-save hook to hash the password before saving the rental (like in the Customer schema)
RentalSchema.pre('save', async function (next) {
    const rental = this;
    
    // Hash the password only if it's new or modified
    if (rental.isModified('password')) {
        rental.password = await bcrypt.hash(rental.password, 10);
    }

    next();
});

// Method to compare passwords
RentalSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Check if the model is already defined
const Rental = mongoose.models.Rental || mongoose.model('Rental', RentalSchema);

module.exports = Rental;
