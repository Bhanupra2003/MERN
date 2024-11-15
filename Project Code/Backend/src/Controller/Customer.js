const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

// Customer schema definition
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
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
            validator: (value) => /^\d{10}$/.test(value), // Adjust phone number validation as needed
            message: 'Invalid phone number'
        }
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.startsWith('http') || value.startsWith('/'), // Check for valid URL or file path
            message: 'Invalid profile picture URL'
        }
    }
}, { timestamps: true });

// Pre-save hook to hash the password before saving the customer
customerSchema.pre('save', async function (next) {
    const customer = this;
    
    // Hash the password only if it's new or modified
    if (customer.isModified('password')) {
        customer.password = await bcrypt.hash(customer.password, 10);
    }
    
    next();
});

// Method to compare passwords
customerSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Create the model based on the schema
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
