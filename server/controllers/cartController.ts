import { Request, Response } from 'express';
import { User } from '../models/User';

export const getCart = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    res.json(user?.cart || []);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCart = async (req: any, res: Response) => {
  try {
    const { cartItems } = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
      user.cart = cartItems;
      await user.save();
      res.json(user.cart);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
