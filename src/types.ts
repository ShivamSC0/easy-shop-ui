export interface Product {
  id: string;
  brand: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  category: 'men' | 'women' | 'kids' | 'beauty' | 'home';
  isTrend?: boolean;
  discount?: string;
  isNewArrival?: boolean;
  sizes: string[];
  fabric?: string;
  rating?: number;
  reviewsCount?: number;
}

export interface CartItem {
  id: string; // combination of productId and size
  product: Product;
  selectedSize: string;
  quantity: number;
}

export type AppTab = 'home' | 'categories' | 'notifications' | 'profile';

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  type: 'sale' | 'order' | 'wishlist';
}

export interface OrderHistory {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'In Transit' | 'Processing';
  itemsCount: number;
}
