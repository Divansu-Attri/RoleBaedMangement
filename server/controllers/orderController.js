// server/controllers/orderController.js
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// Employee can place orders
const placeOrder = async (req, res) => {
    try {
        const { customerName, products } = req.body;

        // Verify product existence and calculate total (optional)
        const productDetails = await Promise.all(
            products.map(async (item) => {
                const product = await Product.findById(item.product);
                if (!product) {
                    throw new Error(`Product with ID ${item.product} not found`);
                }
                return { product: product._id, quantity: item.quantity };
            })
        );

        const newOrder = new Order({
            customerName,
            products: productDetails,
            placedBy: req.user.userId // Log who placed the order
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(400).json({ message: 'Failed to place order', error: error.message });
    }
};

// Manager can view orders placed by their team members
const getManagerOrders = async (req, res) => {
    try {
        // Find team members assigned to the manager
        const manager = await User.findById(req.user.userId).populate('assignedTeamMembers');
        const teamMemberIds = manager.assignedTeamMembers.map(member => member._id);
        teamMemberIds.push(req.user.userId); // Include the manager's own orders? Decide on the requirement.

        const orders = await Order.find({ placedBy: { $in: teamMemberIds } });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching manager orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
};

// Get all orders (Admin only)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        console.log(orders)
        res.json(orders);
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
};

// Update order status (Admin and potentially Manager - based on requirements)
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        console.log(order)
        res.json(order);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(400).json({ message: 'Failed to update order status', error: error.message });
    }
};

module.exports = {
    placeOrder,
    getManagerOrders,
    getAllOrders,
    updateOrderStatus
};