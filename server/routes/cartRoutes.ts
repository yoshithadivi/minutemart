import express from 'express';
import { getCart, updateCart } from '../controllers/cartController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(protect, getCart).post(protect, updateCart);

export default router;
