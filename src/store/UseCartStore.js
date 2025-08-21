// src/store/useCartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware"; // Чтобы корзина сохранялась при перезагрузке

const useCartStore = create(
  persist(
    (set, get) => ({
      // Состояние: массив items { id, name, price, image, quantity }
      items: [],

      // Действия (Actions)
      addItem: (newItem) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (item) => item.id === newItem.id
        );

        if (existingItemIndex > -1) {
          // Если товар уже есть, увеличиваем количество
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += 1;
          set({ items: updatedItems });
        } else {
          // Если товара нет, добавляем с количеством 1
          set({ items: [...items, { ...newItem, quantity: 1 }] });
        }
      },

      removeItem: (itemId) => {
        set({ items: get().items.filter((item) => item.id !== itemId) });
      },

      updateItemQuantity: (itemId, newQuantity) => {
        if (newQuantity < 1) {
          get().removeItem(itemId);
          return;
        }
        const updatedItems = get().items.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [] });
      },

      // Геттеры (Getters)
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getItemQuantity: (itemId) => {
        const item = get().items.find((item) => item.id === itemId);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: "geekshop-cart-storage", // Ключ для localStorage
    }
  )
);

export default useCartStore;
