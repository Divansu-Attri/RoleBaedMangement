// server/controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Admin can add new team members and assign roles
const createUser = async (req, res) => {
    try {
        const { name, email, password, role, assignedTeamMembers } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword, role, assignedTeamMembers });
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
};

// Admin can get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('assignedTeamMembers', 'name email role');
        console.log(users)
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
};

// Get a specific user by ID (Admin can access all, others can access their own)
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        // .populate('assignzedTeamMembers', 'name email role');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Non-admin users can only access their own info
        if (req.user.role !== 'Admin' && req.user.userId !== user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized to view this user' });
        }
        console.log(user)
        res.json(user);
      console.log(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }
};


const getUser = async (req, res) => {
    try {
        // const user = await User.findById(req.params.id)
        // // .populate('assignzedTeamMembers', 'name email role');
        // if (!user) {
        //     return res.status(404).json({ message: 'User not found' });
        // }
        // // Non-admin users can only access their own info
        // if (req.user.role !== 'Admin' && req.user.userId !== user._id.toString()) {
        //     return res.status(403).json({ message: 'Unauthorized to view this user' });
        // }
        // console.log(user)
        // res.json(user);
         // const userData = await User.find({});
      const userData = req.user;
              res.json(userData);

      console.log(userData);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }
};

// Admin can update any user's information, including role and assigned team members
const updateUser = async (req, res) => {
    try {
        const { name, email, password, role, assignedTeamMembers } = req.body;
        const updateFields = { name, email, role, assignedTeamMembers };

        if (password) {
            updateFields.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateFields, { new: true }).populate('assignedTeamMembers', 'name email role');
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(400).json({ message: 'Failed to update user', error: error.message });
    }
};

// Admin can delete a user
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    getUserById
};