// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, isAdmin, isManager, isEmployee } = require('../middleware/authMiddleware');

router.post('/createUser', authenticate, isAdmin, userController.createUser);
router.get('/getAllUsers', authenticate, isAdmin, userController.getAllUsers);
router.patch('/updateUser/:id', authenticate, isAdmin, userController.updateUser);
router.delete('/deleteUser/:id', authenticate, isAdmin, userController.deleteUser);

router.get('/getUser', authenticate, isEmployee, userController.getUser);
router.get('/getUserById/:id', authenticate, isEmployee, userController.getUserById);


module.exports = router;