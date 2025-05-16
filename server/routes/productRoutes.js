const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate, isManager, isAdmin, isEmployee } = require('../middleware/authMiddleware');

router.post('/createProduct', authenticate, isManager, productController.createProduct);
router.patch('/updateProduct/:id', authenticate, isManager, productController.updateProduct);

router.get('/getAllProducts', authenticate, isEmployee, productController.getAllProducts);
router.get('/getProductById/:id', authenticate, isEmployee, productController.getProductById);

module.exports = router;