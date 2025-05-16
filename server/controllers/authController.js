// server/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id, role: newUser.role, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
        console.log(token)

        res.status(201).json({ user: { _id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }, token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
        console.log(token)
        console.log(user.role)
        console.log(user._id)
        
        res.json({ user: { _id: user._id, name: user.name, email: user.email, role: user.role }, token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

module.exports = { register, login };