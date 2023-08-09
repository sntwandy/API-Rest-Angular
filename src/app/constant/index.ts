import { Product } from "../models/product.model";

// API URL
export const API_URL = 'https://young-sands-07814.herokuapp.com/api/products';

// INITIAL DATA FOR PRODUCT
export const PRODUCT_INITIAL_STATE: Product = {
  id: '',
  price: 0,
  images: [],
  title: '',
  category: {
    id: '',
    name: '',
  },
  description: '',
};
