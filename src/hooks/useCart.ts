import { useEffect, useState } from "react";
import { cartStore, CartItem } from "../store/cartStore";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(cartStore.getItems());

  useEffect(() => {
    const unsub = cartStore.subscribe(() => {
      setItems([...cartStore.getItems()]);
    });
    return unsub;
  }, []);

  return {
    items,
    addToCart: cartStore.addToCart,
    removeFromCart: cartStore.removeFromCart,
    updateQty: cartStore.updateQty,
    clearCart: cartStore.clearCart,
    totalItems: cartStore.totalItems(),
    totalPrice: cartStore.totalPrice(),
  };
}
