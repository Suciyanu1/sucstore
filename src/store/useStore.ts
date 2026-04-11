import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../data/mockData';

interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1, size, color) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(
          (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color
        );

        if (existingItemIndex !== -1) {
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          set({ items: [...items, { ...product, quantity, selectedSize: size, selectedColor: color }] });
        }
      },
      removeItem: (productId, size, color) => {
        set({
          items: get().items.filter(
            (item) => !(item.id === productId && item.selectedSize === size && item.selectedColor === color)
          ),
        });
      },
      updateQuantity: (productId, quantity, size, color) => {
        const items = get().items.map((item) => {
          if (item.id === productId && item.selectedSize === size && item.selectedColor === color) {
            return { ...item, quantity: Math.max(1, quantity) };
          }
          return item;
        });
        set({ items });
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        if (!get().isInWishlist(product.id)) {
          set({ items: [...get().items, product] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },
      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
