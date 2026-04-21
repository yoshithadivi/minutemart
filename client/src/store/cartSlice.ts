import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../services/apiClient';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, thunkAPI) => {
  try {
    const response = await apiClient.get('/cart');
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const updateCartAPI = createAsyncThunk('cart/updateCartAPI', async (cartItems: any[], thunkAPI) => {
  try {
    const response = await apiClient.post('/cart', { cartItems });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [] as any[],
    isLoading: false,
    error: null as string | null,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.product._id === action.payload.product._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.product._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(updateCartAPI.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
