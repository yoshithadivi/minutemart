import express from 'express';
import { createOrder, getMyOrders } from '../controllers/orderController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(protect, createOrder);
router.route('/my-orders').get(protect, getMyOrders);

export default router;
