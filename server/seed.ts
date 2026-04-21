import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from './models/Product';

dotenv.config();

const mockProducts = [
  {
    name: 'Fresh Red Apple - Washington',
    price: 180,
    originalPrice: 220,
    weight: '4 pcs (Approx 500g)',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6faa6?auto=format&fit=crop&q=80&w=300&h=300',
    time: '8 MINS',
    category: 'Fruits'
  },
  {
    name: 'Amul Taaza Toned Fresh Milk',
    price: 27,
    originalPrice: 28,
    weight: '500 ml',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=300&h=300',
    time: '12 MINS',
    category: 'Dairy'
  },
  {
    name: "Lay's India's Magic Masala Potato Chips",
    price: 20,
    weight: '50 g',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=300&h=300',
    time: '10 MINS',
    category: 'Snacks'
  },
  {
    name: 'Coca-Cola Original Taste Soft Drink',
    price: 40,
    originalPrice: 40,
    weight: '750 ml',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=300&h=300',
    time: '9 MINS',
    category: 'Beverages'
  },
  {
    name: 'Colgate MaxFresh Red Gel Toothpaste',
    price: 110,
    originalPrice: 125,
    weight: '150 g',
    image: 'https://images.unsplash.com/photo-1559404289-eddc09476059?auto=format&fit=crop&q=80&w=300&h=300',
    time: '14 MINS',
    category: 'Personal Care'
  },
  {
    name: 'Farm Fresh Tomatoes',
    price: 45,
    originalPrice: 60,
    weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=300&h=300',
    time: '8 MINS',
    category: 'Vegetables'
  },
  {
    name: 'Surf Excel Easy Wash Detergent Powder',
    price: 130,
    originalPrice: 140,
    weight: '1 kg',
    image: 'https://images.unsplash.com/photo-1584820927498-cafe2c15928f?auto=format&fit=crop&q=80&w=300&h=300',
    time: '15 MINS',
    category: 'Household'
  }
];

const importData = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log('No MONGO_URI, skipping seed.');
      process.exit();
    }
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(mockProducts);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
