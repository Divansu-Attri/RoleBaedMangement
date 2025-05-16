const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { userId: '...', role: '...' }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const authorize = (roles = []) => {
    return (req, res, next) => {
        if (typeof roles === 'string') {
            roles = [roles];
        }

        if (roles.length > 0 && !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        next();
    };
};

const isAdmin = authorize('Admin');
const isManager = authorize(['Manager', 'Admin']);
const isEmployee = authorize(['Employee', 'Manager', 'Admin']);

module.exports = { authenticate, authorize, isAdmin, isManager, isEmployee };