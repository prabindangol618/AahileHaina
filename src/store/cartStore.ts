import { Product } from "../data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

type Listener = () => void;

let cartItems: CartItem[] = [];
const listeners: Listener[] = [];

function notify() {
  listeners.forEach((l) => l());
}

export const cartStore = {
  getItems: () => cartItems,

  addToCart: (product: Product, qty = 1) => {
    const existing = cartItems.find((i) => i.product.id === product.id);
    if (existing) {
      cartItems = cartItems.map((i) =>
        i.product.id === product.id
          ? { ...i, quantity: i.quantity + qty }
          : i
      );
    } else {
      cartItems = [...cartItems, { product, quantity: qty }];
    }
    notify();
  },

  removeFromCart: (productId: string) => {
    cartItems = cartItems.filter((i) => i.product.id !== productId);
    notify();
  },

  updateQty: (productId: string, qty: number) => {
    if (qty <= 0) {
      cartStore.removeFromCart(productId);
      return;
    }
    cartItems = cartItems.map((i) =>
      i.product.id === productId ? { ...i, quantity: qty } : i
    );
    notify();
  },

  clearCart: () => {
    cartItems = [];
    notify();
  },

  totalItems: () => cartItems.reduce((acc, i) => acc + i.quantity, 0),

  totalPrice: () =>
    cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0),

  subscribe: (listener: Listener) => {
    listeners.push(listener);
    return () => {
      const idx = listeners.indexOf(listener);
      if (idx > -1) listeners.splice(idx, 1);
    };
  },
};
