// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Manager', 'Employee'], default: 'Employee' },
    assignedTeamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // For Manager role
});

module.exports = mongoose.model('User', userSchema);