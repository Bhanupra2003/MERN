const { Router } = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Rental = require("../models/Rentals");  // Ensure path to Rentals model is correct
const Customer = require("../models/Customer");  // Ensure path to Customer model is correct
const Apartment = require("../models/Apartment");  // Ensure path to Apartment model is correct

dotenv.config();

const router = Router();

// login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === 'admin@gmail.com' && password === 'admin') {
            const token = jwt.sign({ email: email }, process.env.JWT_SECRET || "VDFJBIBGK2132345KJFWF432R4", { expiresIn: '1h' });
            res.cookie('admintoken', token, { httpOnly: true });
            return res.status(200).json({ success: true, message: 'Login success', token });
        } else {
            return res.status(400).json({ success: false, errors: ['Invalid credentials'] });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, errors: ['Internal server error'] });
    }
});

// Token verification middleware
const verifyToken = (req, res, next) => {
    const token = req.cookies.admintoken;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, errors: ['Token expired or invalid'] });
            }
            req.body.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};

// get the rentals
router.get('/rentals', verifyToken, async (req, res) => {
    try {
        const { name } = req.query;
        let rental;
        if (name) {
            rental = await Rental.find({ name: name });
        } else {
            rental = await Rental.find();
        }

        if (rental.length > 0) {
            return res.status(200).json({ success: true, data: rental });
        } else {
            return res.status(400).json({ success: false, message: 'No rental found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, errors: ['Internal server error'] });
    }
});

// update rental status
router.put('/rental/:id', verifyToken, async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: 'Status is required' });
        }

        const rental = await Rental.findByIdAndUpdate(req.params.id, { status: status }, { new: true });
        if (rental) {
            return res.status(200).json({ success: true, message: 'Rental status updated', data: rental });
        } else {
            return res.status(400).json({ success: false, message: 'Rental not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// get customers
router.get('/customers', verifyToken, async (_req, res) => {
    try {
        const customers = await Customer.find();
        if (customers.length > 0) {
            return res.status(200).json({ success: true, data: customers });
        } else {
            return res.status(400).json({ success: false, message: 'No customer found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, errors: ['Internal server error'] });
    }
});

// dashboard data (counts and aggregates)
router.get('/dashboard', async (_req, res) => {
    try {
        const customerCount = await Customer.countDocuments();
        const rentalCount = await Rental.countDocuments();
        const apartmentCount = await Apartment.countDocuments();

        const rentalMonthwise = await Rental.aggregate([
            {
                '$group': {
                    '_id': { '$month': '$createdAt' },
                    'count': { '$sum': 1 }
                }
            }
        ]);

        const apartmentMonthwise = await Apartment.aggregate([
            {
                '$group': {
                    '_id': { '$month': '$createdAt' },
                    'count': { '$sum': 1 }
                }
            }
        ]);

        const customerMonthwise = await Customer.aggregate([
            {
                '$group': {
                    '_id': { '$month': '$createdAt' },
                    'count': { '$sum': 1 }
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            customerCount,
            rentalCount,
            apartmentCount,
            rentalMonthwise,
            apartmentMonthwise,
            customerMonthwise
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, errors: ['Internal server error'] });
    }
});

// get the pending apartments
router.get('/apartments', verifyToken, async (_req, res) => {
    try {
        const apartments = await Apartment.find({ adminstatus: 'Pending' });
        if (apartments.length > 0) {
            return res.status(200).json({ success: true, data: apartments });
        } else {
            return res.status(400).json({ success: false, message: 'No apartment found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, errors: ['Internal server error'] });
    }
});

// update apartment status
router.put('/apartment/:id', verifyToken, async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: 'Status is required' });
        }

        const apartment = await Apartment.findByIdAndUpdate(req.params.id, { adminstatus: status }, { new: true });
        if (apartment) {
            return res.status(200).json({ success: true, message: 'Apartment status updated', data: apartment });
        } else {
            return res.status(400).json({ success: false, message: 'Apartment not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// logout
router.post('/logout', verifyToken, async (_req, res) => {
    try {
        res.clearCookie('admintoken');
        return res.status(200).json({ success: true, message: 'Logout success' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, errors: ['Internal server error'] });
    }
});

module.exports = router;
