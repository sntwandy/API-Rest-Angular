import { Product } from "../models/product.model";
import { environment } from 'src/environments/environment';

// API URL
export const API_URL = `${environment.API_URL}/api/products`;

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
