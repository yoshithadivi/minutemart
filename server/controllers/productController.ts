import { Request, Response } from 'express';
import { Product } from '../models/Product';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const keyword = req.query.keyword ? {
      name: {
        $regex: req.query.keyword as string,
        $options: 'i'
      }
    } : {};
    const category = req.query.category ? { category: req.query.category } : {};
    
    const products = await Product.find({ ...keyword, ...category });
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
