import { Request, Response } from 'express';
import { Order } from '../models/Order';

export const createOrder = async (req: any, res: Response) => {
  try {
    const { orderItems, totalPrice } = req.body;
    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        totalPrice,
      });
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req: any, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
