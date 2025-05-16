const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate, isManager, isEmployee, isAdmin } = require('../middleware/authMiddleware');

router.get('/getAllOrders', authenticate, isAdmin, orderController.getAllOrders);

router.patch('/updateOrderStatus/:id', authenticate, isManager, orderController.updateOrderStatus); //  manager can update
router.get('/getManagerOrders', authenticate, isManager, orderController.getManagerOrders);

router.post('/placeOrder', authenticate, isEmployee, orderController.placeOrder); 

module.exports = router;