import { Product } from "../models/product.model";
import { environment } from 'src/environments/environment';

// API BASE
export const API_URL_BASE = `${environment.API_URL}/api`;
export const API_URL_BASE_AUTH = `${API_URL_BASE}/auth`;

// API ENDPOINTS
export const API_URL_USERS = `${API_URL_BASE}/users`;
export const API_URL_PRODUCTS = `${API_URL_BASE}/products`;

// API AUTH
export const API_URL_AUTH_LOGIN = `${API_URL_BASE_AUTH}/login`;
export const API_URL_AUTH_PROFILE = `${API_URL_BASE_AUTH}/profile`;

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
