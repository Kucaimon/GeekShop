export const mockProducts = [
  {
    id: 1,
    name: 'Футболка "React"',
    price: 1999,
    image: "https://placehold.co/300x400/2563eb/white?text=React+Shirt",
    description:
      "Мягкая хлопковая футболка с логотипом React. Идеально для повседневной носки и написания кода.",
    category: "clothing",
    inStock: true,
    popularity: 95,
  },
  {
    id: 2,
    name: 'Худи "TypeScript"',
    price: 4499,
    image: "https://placehold.co/300x400/3178c6/white?text=TS+Hoodie",
    description: "Теплый и уютный худи с капюшоном. Стильно и комфортно.",
    category: "clothing",
    inStock: true,
    popularity: 87,
  },
  {
    id: 3,
    name: 'Кружка "Git Commit"',
    price: 999,
    image: "https://placehold.co/300x400/f0f0f0/black?text=Git+Mug",
    description:
      "Большая керамическая кружка. Вмещает достаточно кофе для долгой сессии кодинга.",
    category: "accessories",
    inStock: true,
    popularity: 92,
  },
  {
    id: 4,
    name: 'Наклейка "Hello World"',
    price: 299,
    image: "https://placehold.co/300x400/22c55e/white?text=Hello+World",
    description:
      "Набор виниловых наклеек для ноутбука, гитары или холодильника.",
    category: "accessories",
    inStock: false,
    popularity: 75,
  },
];

export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 500);
  });
};

export const fetchProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = mockProducts.find((p) => p.id === parseInt(id));
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Product not found"));
      }
    }, 300);
  });
};
